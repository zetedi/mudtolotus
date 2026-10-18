// Deployment-level constants: everything that depends on where the site is hosted lives here.
import type { Lang } from './retreat.ts'

export const siteUrl = 'https://mudtolotus.web.app'

/** Each language is a prerendered page: English at the root, the others under a short prefix. */
export const langPath = { en: '/', fr: '/fr', ar: '/ar' } as const satisfies Record<Lang, string>

export const langFromPath = (pathname: string): Lang =>
  pathname === '/fr' || pathname.startsWith('/fr/') ? 'fr' : pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en'

export const absoluteUrl = (path: string) => new URL(path, siteUrl).href

/**
 * Public Firebase web-app config. These values are meant to ship to browsers;
 * what visitors can do with them is governed by firestore.rules.
 */
export const firebase = {
  projectId: 'perauset-org',
  apiKey: 'AIzaSyBAU30j8aRlrDLuxfFdb6udpflWdqmBncw',
  registrationsCollection: 'registrations',
} as const

/** Machine-readable facts about the residency, used for structured data (schema.org Event). */
export const event = {
  startDate: '2027-03-08',
  endDate: '2027-03-16',
  city: 'Aswan',
  countryCode: 'EG',
  currency: 'EUR',
  earlyBirdPrice: 1300,
  earlyBirdUntil: '2026-12-31',
  regularPrice: 1500,
} as const
