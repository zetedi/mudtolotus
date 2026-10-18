// Normalises the originals in assets/img so the repository stays small: long edge at most
// 2048px (the largest rendered variant is 1280px), JPEG for photos, PNG only for artwork
// with transparency. Lossless re-compression is applied only when it saves space; JPEGs that
// already fit are left untouched. Safe to re-run; prints any file it renamed.
import { readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const DIR = 'assets/img'
const MAX = 2048
let before = 0
let after = 0
const renamed = []

for (const name of (await readdir(DIR)).sort()) {
  const ext = path.extname(name).toLowerCase()
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue
  const file = path.join(DIR, name)
  const size = (await stat(file)).size
  before += size
  const image = sharp(file).rotate()
  const { width, height, hasAlpha, format } = await image.metadata()
  const tooBig = Math.max(width, height) > MAX
  const resized = image.resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })

  if (format === 'png' && hasAlpha) {
    const buffer = await resized.png({ compressionLevel: 9, effort: 8 }).toBuffer()
    if (tooBig || buffer.length < size) await writeFile(file, buffer)
  } else if (format === 'png') {
    // A photo stored as PNG: convert to JPEG.
    const target = file.replace(/\.png$/i, '.jpg')
    await writeFile(target, await resized.jpeg({ quality: 88, mozjpeg: true, progressive: true }).toBuffer())
    await rm(file)
    renamed.push([name, path.basename(target)])
  } else if (tooBig) {
    await writeFile(file, await resized.jpeg({ quality: 88, mozjpeg: true, progressive: true }).toBuffer())
  }
}

for (const name of await readdir(DIR)) after += (await stat(path.join(DIR, name))).size
const mb = (n) => (n / 1024 / 1024).toFixed(1) + ' MB'
console.log(`assets: ${mb(before)} -> ${mb(after)}`)
for (const [from, to] of renamed) console.log(`renamed ${from} -> ${to} (update references)`)
