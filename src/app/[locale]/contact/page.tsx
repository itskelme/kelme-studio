import { setRequestLocale } from "next-intl/server";
import { AppLocale, routing } from "@/i18n/routing";
import { ContactSection } from "@/components/contact/contact-section";
import { MainLayout } from "@/components/layouts/main-layout";
import { Metadata } from "next";
import { FAQSchema } from "@/components/schema";
import { generatePageMetadata } from "@/lib/metadata";
import { getFAQItems } from "@/lib/faq-utils";

// Obter itens de FAQ a partir do utilitário
const faqItems = getFAQItems(5);

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
  params: { locale: AppLocale };
}): Promise<Metadata> {
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
          url: '/opengraph/kelme-contact-og-banner.png',
          width: 1200,
          height: 630,
          alt: 'Kelme Studio - Contato',
        }
      ],
      locale: params.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: baseMetadata.title as string,
      description: baseMetadata.description as string,
      images: ['/opengraph/kelme-contact-og-banner.png'],
      creator: '@kelmestudio'
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
    <>
      <FAQSchema items={faqItems} />
      <MainLayout>
        <ContactSection />
      </MainLayout>
    </>
  );
}
