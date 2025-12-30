import { notFound } from "next/navigation"
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { WorkDetails } from "@/presentation/components/templates/work-details"
import { works as enWorks } from "@/i18n/works/en"
import { works as ptWorks } from "@/i18n/works/pt"
import { Metadata } from 'next'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const works = locale === 'pt' ? ptWorks : enWorks
  const work = works.find(w => w.slug === slug)

  if (!work) {
    return {}
  }

  return {
    title: `${work.title} | Kelme Studio`,
    description: work.description,
  }
}

export function generateStaticParams() {
  // Generate params for both locales
  const paths = []
  
  // English paths
  for (const work of enWorks) {
    paths.push({ locale: 'en', slug: work.slug })
  }
  
  // Portuguese paths
  for (const work of ptWorks) {
    paths.push({ locale: 'pt', slug: work.slug })
  }

  return paths
}

export default async function WorkPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const works = locale === 'pt' ? ptWorks : enWorks
  const work = works.find(w => w.slug === slug)

  if (!work) {
    notFound()
  }

  return <WorkDetails work={work} />
}
