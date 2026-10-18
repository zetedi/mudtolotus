import { useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { RetreatPage } from '@/components/RetreatPage'
import { pageHead } from '@/data/seo'
import { parseLang } from '@/data/retreat'
import { langPath } from '@/data/site'

export const Route = createFileRoute('/')({
  head: () => pageHead('en'),
  component: EnglishPage,
})

function EnglishPage() {
  const navigate = useNavigate()
  // Links from the previous version of the site used `?lang=fr` / `?lang=ar`.
  useEffect(() => {
    const legacy = parseLang(new URLSearchParams(window.location.search).get('lang'))
    if (legacy !== 'en') void navigate({ to: langPath[legacy], replace: true })
  }, [navigate])
  return <RetreatPage lang="en" />
}
