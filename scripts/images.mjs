// Renders every image variant declared in src/data/images.ts from assets/img into public/img,
// plus the Open Graph card and the icons. Runs before `dev` and `build`; pass --force to redo everything.
import { mkdir, readdir, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { icons, imageVariants, shareImage, variantName } from '../src/data/images.ts'

const SRC = 'assets/img'
const OUT = 'public/img'
const force = process.argv.includes('--force')
const sand = { r: 0xec, g: 0xd3, b: 0xb1, alpha: 1 }
const transparent = { r: 0, g: 0, b: 0, alpha: 0 }

await mkdir(OUT, { recursive: true })

const jobs = []
const job = (src, out, render) => jobs.push({ src, out, render })

for (const v of imageVariants) {
  const src = path.join(SRC, v.file)
  job(src, path.join(OUT, `${variantName(v.file, v.w, v.h, v.position)}.webp`), async (out) => {
    const image = sharp(src).rotate() // honour EXIF orientation of phone photos
    const { width, height, hasAlpha } = await image.metadata()
    let { w, h } = v
    if (h && (width < w || height < h)) {
      // Never upscale, but keep the requested aspect ratio so layout attributes stay truthful.
      const scale = Math.min(width / w, height / h)
      w = Math.round(w * scale)
      h = Math.round(h * scale)
    }
    await image
      .resize({ width: w, height: h, fit: h ? 'cover' : 'inside', position: v.position ?? 'centre', withoutEnlargement: true })
      .webp({ quality: v.quality ?? (hasAlpha ? 78 : 76), alphaQuality: 85, effort: 5 })
      .toFile(out)
  })
}

job(path.join(SRC, shareImage.source), path.join('public', shareImage.path), (out) =>
  sharp(path.join(SRC, shareImage.source))
    .rotate()
    .resize(shareImage.width, shareImage.height, { fit: 'cover' })
    .jpeg({ quality: 84, mozjpeg: true, progressive: true })
    .toFile(out),
)

const emblemSource = path.join(SRC, 'lotus-emblem.png')
const icon =
  ({ size }, { pad = 0, background = transparent } = {}) =>
  async (out) => {
    const inner = Math.round(size * (1 - pad * 2))
    const glyph = await sharp(emblemSource).resize(inner, inner, { fit: 'contain', background: transparent }).png().toBuffer()
    await sharp({ create: { width: size, height: size, channels: 4, background } })
      .composite([{ input: glyph, gravity: 'centre' }])
      .png()
      .toFile(out)
  }
job(emblemSource, path.join('public', icons.favicon.path), icon(icons.favicon))
job(emblemSource, path.join('public', icons.icon192.path), icon(icons.icon192, { pad: 0.1, background: sand }))
job(emblemSource, path.join('public', icons.icon512.path), icon(icons.icon512, { pad: 0.1, background: sand }))
job(emblemSource, path.join('public', icons.apple.path), icon(icons.apple, { pad: 0.12, background: sand }))

async function isFresh(src, out) {
  if (force) return false
  try {
    const [a, b] = await Promise.all([stat(src), stat(out)])
    return b.mtimeMs >= a.mtimeMs
  } catch {
    return false
  }
}

let rendered = 0
await Promise.all(
  jobs.map(async ({ src, out, render }) => {
    if (await isFresh(src, out)) return
    await render(out)
    rendered++
  }),
)

// public/img is fully owned by this script: drop anything a previous manifest produced.
const expected = new Set(jobs.map((j) => path.basename(j.out)))
for (const name of await readdir(OUT)) if (!expected.has(name)) await rm(path.join(OUT, name))

let bytes = 0
for (const name of await readdir(OUT)) bytes += (await stat(path.join(OUT, name))).size
console.log(`images: ${rendered} rendered, ${jobs.length - rendered} up to date, ${jobs.length} files, ${(bytes / 1024 / 1024).toFixed(1)} MB in ${OUT}`)
