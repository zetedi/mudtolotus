import { Link } from '@tanstack/react-router'
import { copy } from '@/data/retreat'
import { img } from '@/data/images'

// Served by Firebase as 404.html for unknown paths, and by the router for client-side misses.
export function NotFound() {
  const t = copy.en.notFound
  return (
    <main className="mud-bg flex min-h-svh flex-col items-center justify-center px-5 py-20 text-center">
      <img src={img('lotus-emblem.png', 500)} alt="" width={500} height={455} className="mb-8 w-40" />
      <h1 className="font-display text-4xl italic text-terra sm:text-6xl">{t.title}</h1>
      <p className="mt-4 max-w-md leading-loose text-ink">{t.text}</p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-terra px-8 py-4 font-label text-lg uppercase italic tracking-[0.2em] text-cream transition hover:bg-ink"
      >
        {t.home}
      </Link>
    </main>
  )
}
