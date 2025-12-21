import React from "react";
import { Container } from "@/components/ui/container";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { AppLocale, routing } from '@/i18n/routing';

// Permite SSG para cada locale
export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

// Gera metadados da página com base no locale
export async function generateMetadata({
  params
}: {
  params: { locale: AppLocale };
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
  params: { locale }
}: {
  params: { locale: AppLocale };
}) {
  const t = await getTranslations({ locale, namespace: 'work' });
  
  return (
    <main>
      <Container className="py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {t("sectionTitle")}
          </h1>
          <p className="text-xl text-gray-200 mb-12">
            {t("sectionSubtitle")}
          </p>
        </div>

        {/* Conteúdo do portfolio irá aqui */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Aqui será implementado o grid de projetos do portfolio */}
          <div className="h-64 bg-gradient-to-br from-blue-600 to-green-400 rounded-lg"></div>
          <div className="h-64 bg-gradient-to-br from-blue-600 to-green-400 rounded-lg"></div>
          <div className="h-64 bg-gradient-to-br from-blue-600 to-green-400 rounded-lg"></div>
        </div>
      </Container>
    </main>
  );
}
