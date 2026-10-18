import { createFileRoute } from '@tanstack/react-router'
import { RetreatPage } from '@/components/RetreatPage'
import { pageHead } from '@/data/seo'

export const Route = createFileRoute('/ar')({
  head: () => pageHead('ar'),
  component: () => <RetreatPage lang="ar" />,
})
