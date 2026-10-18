// Per-language <head> content: title, description, Open Graph, canonical/hreflang links and schema.org Event data.
import { copy, languages, type Lang } from './retreat.ts'
import { absoluteUrl, event, langPath, siteUrl } from './site.ts'
import { shareImage } from './images.ts'

const ogLocale: Record<Lang, string> = { en: 'en_US', fr: 'fr_FR', ar: 'ar_EG' }

const arabicFont =
  'https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600&display=swap'

export function pageHead(lang: Lang) {
  const t = copy[lang]
  const url = absoluteUrl(langPath[lang])
  return {
    meta: [
      { title: t.seo.title },
      { name: 'description', content: t.seo.description },
      { property: 'og:title', content: t.seo.title },
      { property: 'og:description', content: t.seo.description },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: ogLocale[lang] },
      { property: 'og:image:alt', content: t.seo.imageAlt },
      { name: 'twitter:image:alt', content: t.seo.imageAlt },
    ],
    links: [
      { rel: 'canonical', href: url },
      ...languages.map((l) => ({ rel: 'alternate', hrefLang: l, href: absoluteUrl(langPath[l]) })),
      { rel: 'alternate', hrefLang: 'x-default', href: absoluteUrl('/') },
      ...(lang === 'ar' ? [{ rel: 'stylesheet', href: arabicFont }] : []),
    ],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(eventJsonLd(lang)) }],
  }
}

function eventJsonLd(lang: Lang) {
  const t = copy[lang]
  const url = absoluteUrl(langPath[lang])
  const offer = (name: string, price: number, validThrough?: string) => ({
    '@type': 'Offer',
    name,
    price,
    priceCurrency: event.currency,
    availability: 'https://schema.org/InStock',
    url: `${url}#prices`,
    ...(validThrough ? { validThrough } : {}),
  })
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: t.seo.title,
    description: t.seo.description,
    inLanguage: lang,
    url,
    image: [absoluteUrl(shareImage.path)],
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: t.hero.place,
      address: { '@type': 'PostalAddress', addressLocality: event.city, addressCountry: event.countryCode },
    },
    organizer: { '@type': 'Organization', name: 'From Mud to Lotus', url: siteUrl },
    performer: t.guides.map((g) => ({ '@type': 'Person', name: g.name, jobTitle: g.role })),
    offers: [
      offer(t.pricing.earlyBird, event.earlyBirdPrice, event.earlyBirdUntil),
      offer(t.pricing.regular, event.regularPrice),
    ],
  }
}
