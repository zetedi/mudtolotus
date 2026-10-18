import { createFileRoute } from '@tanstack/react-router'
import { NotFound } from '@/components/NotFound'

// Prerendered to 404.html, which Firebase Hosting serves for unknown paths.
export const Route = createFileRoute('/404')({
  head: () => ({
    meta: [{ title: 'Page not found · From Mud to Lotus' }, { name: 'robots', content: 'noindex' }],
  }),
  component: NotFound,
})
