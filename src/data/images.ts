// Image pipeline contract, shared by the app and scripts/images.mjs.
//
// Originals live in assets/img/. `pnpm images` (also run before dev/build) renders every
// variant declared below into public/img/ as WebP, plus the share image and icons.
// `img()` only builds paths, so a variant has to be declared here before a component can
// use it; an undeclared one throws during prerender, which fails the build loudly instead
// of shipping a broken image.

export type ImagePosition = 'center' | 'top' | 'bottom'
/** `quality` overrides the WebP quality (default 76 for photos, 78 for transparent artwork). */
export type ImageVariant = { file: string; w: number; h?: number; position?: ImagePosition; quality?: number }

const cover = (file: string, w: number, h: number, position?: ImagePosition): ImageVariant => ({ file, w, h, position })
/** A photo rendered at full size and at half size, for a two-entry srcset. */
const photo = (file: string, w: number, h: number): ImageVariant[] => [
  cover(file, w, h),
  cover(file, Math.round(w / 2), Math.round(h / 2)),
]

export const imageVariants: ImageVariant[] = [
  // Hero lettering and ornaments (transparent PNGs)
  { file: 'title.png', w: 800, quality: 82 },
  { file: 'title.png', w: 1400, quality: 82 },
  { file: 'lotus-emblem.png', w: 120 },
  { file: 'lotus-emblem.png', w: 240 },
  { file: 'lotus-emblem.png', w: 500, quality: 74 },
  { file: 'lotus-emblem.png', w: 900, quality: 74 },
  { file: 'lotus-frame.png', w: 1000, quality: 62 },
  { file: 'lotus-border.png', w: 900, quality: 66 },
  { file: 'mud-wall.jpg', w: 1400, quality: 66 }, // background of .mud-bg in src/styles.css
  // Journey steps
  ...['mud-brick-making.png', 'clay.jpg', 'sculpture-wall.jpg', 'pigments.jpg', 'mural.jpg', 'lotus-dye-bath.jpg'].map(
    (file) => cover(file, 640, 800),
  ),
  { file: 'scarab.jpg', w: 970 },
  // Guides
  cover('zein-gaia.jpg', 480, 480),
  cover('jasmeen-centered.png', 480, 480, 'center'),
  cover('la-zipolita.jpg', 480, 480, 'bottom'),
  // Stay and island photos
  ...photo('stay-twin-room.jpg', 720, 1080),
  ...photo('stay-single-room.jpg', 960, 1280),
  ...photo('shared-meal.jpg', 1040, 720),
  ...photo('aswan-river.jpg', 1040, 700),
  ...photo('aswan-temple.jpg', 600, 900),
  ...photo('island-residency.jpg', 800, 533),
  ...photo('island-rocks.jpg', 800, 533),
]

/** Outputs that are not WebP variants: the Open Graph card and the icons derived from the lotus emblem. */
export const shareImage = { source: 'share-preview.jpg', path: '/img/share-preview.jpg', width: 1200, height: 630 } as const
export const icons = {
  favicon: { path: '/img/favicon-32.png', size: 32 },
  icon192: { path: '/img/icon-192.png', size: 192 },
  icon512: { path: '/img/icon-512.png', size: 512 },
  apple: { path: '/img/apple-touch-icon.png', size: 180 },
} as const

export const variantName = (file: string, w: number, h?: number, position?: ImagePosition) =>
  `${file.replace(/\.[^.]+$/, '')}-${w}${h ? `x${h}` : ''}${position ? `-${position}` : ''}`

const declared = new Set(imageVariants.map((v) => variantName(v.file, v.w, v.h, v.position)))

/** Path of a rendered variant. `h` crops to cover w×h; `position` picks which part of the photo to keep. */
export function img(file: string, w: number, h?: number, position?: ImagePosition): string {
  const name = variantName(file, w, h, position)
  if (!declared.has(name)) throw new Error(`Image variant "${name}" is not declared in src/data/images.ts`)
  return `/img/${name}.webp`
}
