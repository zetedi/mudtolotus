// Renders the Open Graph share card (assets/img/share-preview.jpg) from scripts/og.html
// using headless Chrome, so it uses the site's real fonts and artwork. Run with `pnpm og`,
// then `pnpm images` picks it up. Set CHROME to point at another Chromium binary if needed.
import { execFile } from 'node:child_process'
import { mkdtemp, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import sharp from 'sharp'

const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const target = 'assets/img/share-preview.jpg'
const profile = await mkdtemp(path.join(os.tmpdir(), 'og-chrome-'))
const png = path.join(profile, 'og.png')

try {
  await promisify(execFile)(chrome, [
    '--headless=new',
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    '--virtual-time-budget=10000',
    `--screenshot=${png}`,
    new URL('./og.html', import.meta.url).href,
  ])
  await sharp(png).jpeg({ quality: 90, mozjpeg: true }).toFile(target)
  console.log(`og: wrote ${target}`)
} finally {
  await rm(profile, { recursive: true, force: true })
}
