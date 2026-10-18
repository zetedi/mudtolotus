import { copy, languages } from '@/data/retreat'
import { img } from '@/data/images'
import { langPath } from '@/data/site'

// Served by Firebase as 404.html for any unknown path, so it cannot know the visitor's language
// and speaks all three. It ships without JavaScript (see __root.tsx), hence plain anchors.
export function NotFound() {
  return (
    <main className="mud-bg flex min-h-svh flex-col items-center justify-center px-5 py-20 text-center">
      <img src={img('lotus-emblem.png', 500)} alt="" width={500} height={455} className="mb-12 w-36 sm:w-40" />
      <div className="grid w-full max-w-5xl gap-12 md:grid-cols-3 md:gap-8">
        {languages.map((lang) => {
          const t = copy[lang].notFound
          const Heading = lang === 'en' ? 'h1' : 'h2'
          return (
            <section key={lang} lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} className="flex flex-col items-center">
              <Heading className="font-display text-3xl italic leading-tight text-terra">{t.title}</Heading>
              <p className="mt-3 max-w-xs text-sm leading-loose text-ink">{t.text}</p>
              <a
                href={langPath[lang]}
                className="mt-6 rounded-full bg-terra px-6 py-3 font-label text-base uppercase italic tracking-[0.15em] text-cream transition hover:bg-ink"
              >
                {t.home}
              </a>
            </section>
          )
        })}
      </div>
    </main>
  )
}
