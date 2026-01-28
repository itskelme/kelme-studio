import { setRequestLocale } from "next-intl/server";
import { AppLocale, routing } from "@/i18n/routing";
import { ContactV2 } from "@/presentation/components/organisms/contact/contact-v2";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { MainLayout } from "@/presentation/components/templates";

// Permite SSG para cada locale
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Gera os metadados para a página de contato usando o utilitário unificado
 */
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseMetadata = await generatePageMetadata({
    namespace: 'metadata.contact',
    titleKey: 'title',
    descriptionKey: 'description',
    params,
    path: 'contact'
  });
  
  // Adicionar Open Graph metadata
  return {
    ...baseMetadata,
    openGraph: {
      title: baseMetadata.title as string,
      description: baseMetadata.description as string,
      images: [
        {
          url: '/images/opengraph/zarp-contact-og-banner.png',
          width: 1200,
          height: 630,
          alt: 'Zarp Studio - Contato',
        }
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: baseMetadata.title as string,
      description: baseMetadata.description as string,
      images: ['/images/opengraph/zarp-contact-og-banner.png'],
      creator: '@zarpstudio'
    }
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return (
    <MainLayout>
      <ContactV2 />
    </MainLayout>
  );
}
