import React from "react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { AppLocale, routing } from '@/i18n/routing';
import { WorkPageView } from "@/presentation/pages/work";
import type { WorkProject } from "@/presentation/pages/work";
import { MainLayout } from "@/presentation/components/templates";

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  return generatePageMetadata({
    namespace: 'metadata.work',
    titleKey: 'title',
    descriptionKey: 'description',
    params,
    path: 'work'
  });
}

export default async function WorkPage({
  params
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'work' });
  
  const projects: WorkProject[] = (t.raw('items') as any[]).map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    client: item.clientName || item.title,
    category: item.category,
    year: item.year,
    image: item.image,
    description: item.description,
    tags: item.tags || []
  }));

  const messages = {
    sectionTitle: t('sectionTitle'),
    sectionSubtitle: t('sectionSubtitle'),
    sectionLabel: t('sectionLabel')
  };
  
  return (
    <MainLayout>
      <WorkPageView projects={projects} messages={messages} />
    </MainLayout>
  );
}
