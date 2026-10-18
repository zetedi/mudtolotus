# AGENTS.md

One-page marketing site for the "From Mud to Lotus" eco building & art residency (Aswan, Egypt, 8–16 March 2027). TanStack Start + React 19 + Tailwind v4, prerendered to static HTML and deployed on Firebase Hosting (project `perauset-org`, hosting site `mudtolotus`, https://mudtolotus.web.app).

## Structure

- `src/routes/index.tsx`, `fr.tsx`, `ar.tsx` — one prerendered page per language (`/`, `/fr`, `/ar`); each just sets `head` via `pageHead(lang)` and renders `RetreatPage`. `404.tsx` becomes `404.html`, a trilingual page served without scripts (the root shell omits `<Scripts />` for it).
- `src/routes/__root.tsx` — document shell. Sets `<html lang dir>` from the pathname, language-independent meta (OG image, icons, fonts) and the not-found component.
- `src/components/RetreatPage.tsx` — the whole page, split into section components (Header, Hero, Facts, Story, Journey, Included, Guides, Pricing, Join, footer).
- `src/components/RegistrationForm.tsx` — form with pending/success/error states; submits through `src/lib/registrations.ts` (Firestore REST `commit`, no SDK). Unit tests in `src/lib/registrations.test.ts`.
- `src/data/retreat.ts` — **single source of truth for copy** in `en`, `fr` and `ar`. All three must keep the same shape (`Copy` type).
- `src/data/site.ts` — site URL, language paths, public Firebase config, event facts for schema.org.
- `src/data/seo.ts` — per-language title/description/OG/canonical/hreflang + Event JSON-LD.
- `src/data/images.ts` — image variant manifest and the `img()` helper. `assets/img/` holds originals (normalised by `scripts/shrink-assets.mjs`, `pnpm assets`); `public/img/` is generated (gitignored) by `scripts/images.mjs`.
- `scripts/og.mjs` + `scripts/og.html` — renders the share card with headless Chrome into `assets/img/share-preview.jpg`.
- `firebase.json`, `.firebaserc`, `firestore.rules` — hosting (clean URLs, cache/security headers, `/pricing` → `/#prices` redirect) and Firestore rules (create-only, validated registrations).
- `src/styles.css` — theme tokens (`terra`, `lotus`, `sand`, `cream`, `ink`; `font-display`, `font-body`, `font-label`), mud-wall background with CSS scroll-driven parallax (`.mud-bg::before`, `.parallax-float`; static fallback without `animation-timeline` support or with reduced motion), animations, focus ring, Arabic font overrides.

## Conventions / decisions

- Language lives in the URL, not in client state: English at `/`, French at `/fr`, Arabic at `/ar`. The index route redirects legacy `?lang=fr|ar` links.
- Always reference images through `img(file, w, h?, position?)` and declare every variant in `src/data/images.ts`; the helper throws (and the prerender fails) for undeclared variants.
- `terra` (#93472f) and `lotus` (#7062e0) are slightly deeper than the brochure inks so text meets WCAG AA on sand/cream. Hover states use `ink`, not `lotus`, for the same reason.
- Heading order is semantic: one `h1` (title lettering with sr-only text), `h2` per section, `h3` for phases, guides and stay subsections.
- Prices, early-bird deadline and dates for structured data are in `src/data/site.ts`; the displayed strings are in `retreat.ts`.
- The Arabic font (Noto Naskh Arabic) is only loaded on `/ar` (added in `pageHead`).
