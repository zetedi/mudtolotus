import { HeadContent, Scripts, createRootRoute, useRouterState } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { NotFound } from '@/components/NotFound'
import { icons, shareImage } from '@/data/images'
import { absoluteUrl, langFromPath } from '@/data/site'

import '../styles.css'

const latinFonts =
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@1,400;1,500&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400;1,6..96,500&family=Cutive&display=swap'

// Language-specific tags (title, description, og:title, canonical, hreflang…) live in src/data/seo.ts.
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'From Mud to Lotus' },
      { name: 'theme-color', content: '#ecd3b1' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'From Mud to Lotus' },
      { property: 'og:image', content: absoluteUrl(shareImage.path) },
      { property: 'og:image:width', content: String(shareImage.width) },
      { property: 'og:image:height', content: String(shareImage.height) },
      { property: 'og:image:type', content: 'image/jpeg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: absoluteUrl(shareImage.path) },
    ],
    links: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: icons.favicon.path },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: icons.icon192.path },
      { rel: 'apple-touch-icon', sizes: '180x180', href: icons.apple.path },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: latinFonts },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const lang = langFromPath(pathname)
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {/* The 404 page is plain HTML: nothing to hydrate, so no scripts. */}
        {pathname !== '/404' && <Scripts />}
      </body>
    </html>
  )
}
