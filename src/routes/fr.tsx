import { createFileRoute } from '@tanstack/react-router'
import { RetreatPage } from '@/components/RetreatPage'
import { pageHead } from '@/data/seo'

export const Route = createFileRoute('/fr')({
  head: () => pageHead('fr'),
  component: () => <RetreatPage lang="fr" />,
})
