# From Mud to Lotus — retreat site

A one-page, three-language (English / French / Arabic) website for **From Mud to Lotus**, an eco building & art residency in Aswan, Egypt, from 8 to 16 March 2027. The page tells the story of the blue lotus myth, presents the two phases of the residency, what's included, prices and the stay, the three guides, and lets visitors request a place.

Live site: https://mudtolotus.web.app (Firebase Hosting, project `perauset-org`, site `mudtolotus`).

## How it is built

- [TanStack Start](https://tanstack.com/start) (React 19) + Vite + Tailwind CSS v4.
- **Static output.** `pnpm build` prerenders `/`, `/fr`, `/ar` and `404.html` into `dist/client`; there is no server at runtime.
- **Images** are rendered at build time by `scripts/images.mjs` (sharp) from the originals in `assets/img/` into `public/img/` as WebP, using the variant list in `src/data/images.ts`. Components reference images through `img(file, w, h?, position?)`; an undeclared variant fails the build.
- **Registration form** writes directly to Firestore (collection `registrations`) through the REST API — see `src/lib/registrations.ts` and `firestore.rules`. Submissions are read in the Firebase console: Firestore → `registrations`.
- **Source photos** are normalised by `pnpm assets` (`scripts/shrink-assets.mjs`): at most 2048px, JPEG for photos, PNG only for transparent artwork. Run it after adding files to `assets/img/`.
- **Open Graph card** (`assets/img/share-preview.jpg`) is rendered from `scripts/og.html` with `pnpm og` (needs Google Chrome).

## Commands

```bash
pnpm install
pnpm dev          # local dev server on :3000 (renders images first)
pnpm build        # images + prerendered site in dist/client
pnpm assets       # normalise new originals in assets/img (run before committing photos)
pnpm preview      # serve dist/client with the Firebase Hosting emulator on :5055
pnpm typecheck
pnpm test         # unit tests for the Firestore payload
pnpm deploy       # build + firebase deploy --only hosting
```

Firestore rules are deployed separately: `firebase deploy --only firestore:rules`.

## Editing content

All text (three languages), guide details and photo captions live in `src/data/retreat.ts`. Site URL, dates and prices used for structured data, and the public Firebase config live in `src/data/site.ts`. Add new photos to `assets/img/`, run `pnpm assets`, and declare the sizes you need in `src/data/images.ts`.
