import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { siteUrl } from './src/data/site.ts'

// The site is prerendered to static HTML (one file per language) and served by Firebase Hosting.
export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: false, autoSubfolderIndex: false, failOnError: true },
      pages: [
        { path: '/' },
        { path: '/fr' },
        { path: '/ar' },
        // Firebase serves 404.html for unknown paths.
        { path: '/404', sitemap: { exclude: true } },
      ],
      sitemap: { host: siteUrl },
    }),
    viteReact(),
  ],
})
