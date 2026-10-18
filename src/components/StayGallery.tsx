import type { Copy } from '@/data/retreat'
import { img } from '@/data/images'

function Photo({ file, alt, width, height, className = '' }: {
  file: string; alt: string; width: number; height: number; className?: string
}) {
  const half = `${img(file, Math.round(width / 2), Math.round(height / 2))} ${Math.round(width / 2)}w`
  return (
    <img
      src={img(file, width, height)}
      srcSet={`${half}, ${img(file, width, height)} ${width}w`}
      sizes="(max-width: 639px) 100vw, (max-width: 1100px) 50vw, 600px"
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={`w-full rounded-[1.5rem] object-cover ${className}`}
    />
  )
}

export function StayDetails({ t }: { t: Copy }) {
  return (
    <div className="mt-14 space-y-14">
      <section aria-labelledby="stay-heading">
        <h3 id="stay-heading" className="font-display text-3xl italic text-terra sm:text-4xl">{t.pricing.accommodation}</h3>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm leading-loose">
          {t.pricing.beds.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="mt-6 grid items-center gap-6 sm:grid-cols-[0.8fr_1.2fr] sm:gap-8">
          <figure>
            <Photo file="stay-twin-room.jpg" alt={t.gallery.twin} width={720} height={1080} className="max-h-[32rem]" />
            <figcaption className="mt-3 text-xs leading-relaxed text-ink/80">{t.gallery.twin}</figcaption>
          </figure>
          <figure>
            <Photo file="stay-single-room.jpg" alt={t.gallery.room} width={960} height={1280} />
            <figcaption className="mt-3 text-xs leading-relaxed text-ink/80">{t.gallery.room}</figcaption>
          </figure>
        </div>
      </section>
      <section aria-labelledby="meals-heading" className="grid items-center gap-8 border-y border-terra/15 py-10 sm:grid-cols-[1.2fr_0.8fr]">
        <Photo file="shared-meal.jpg" alt={t.gallery.meal} width={1040} height={720} />
        <div>
          <h3 id="meals-heading" className="font-display text-3xl italic text-terra sm:text-4xl">{t.pricing.mealsTitle}</h3>
          <ul className="mt-5 space-y-4 text-sm leading-loose">
            {t.pricing.meals.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>
    </div>
  )
}

export function PlaceGallery({ t }: { t: Copy }) {
  return (
    <section aria-labelledby="island-heading" className="py-14 sm:py-20">
      <div className="mb-10 max-w-2xl">
        <h3 id="island-heading" className="font-display text-3xl italic text-terra sm:text-4xl">{t.gallery.title}</h3>
        <p className="mt-4 text-sm leading-loose">{t.gallery.intro}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-[1.6fr_1fr] sm:items-center sm:gap-6">
        <Photo file="aswan-river.jpg" alt={t.gallery.river} width={1040} height={700} />
        <Photo file="aswan-temple.jpg" alt={t.gallery.temple} width={600} height={900} className="max-h-[28rem]" />
      </div>
      <div className="mt-4 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6">
        <Photo file="island-residency.jpg" alt={t.gallery.residency} width={800} height={533} />
        <Photo file="island-rocks.jpg" alt={t.gallery.rocks} width={800} height={533} />
      </div>
    </section>
  )
}
