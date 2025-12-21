import { Navbar } from '@/components/navbar/index';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { Work } from '@/components/work';
import { Founder } from '@/components/founder';
import { SocialProof } from '@/components/social-proof';
import { CtaCard } from '@/components/cta-card';
import { Footer } from '@/components/footer';
import { AppLocale, routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { OrganizationSchema } from '@/components/schema';
import { generatePageMetadata } from '@/lib/metadata';

// Permite SSG para cada locale
export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

/**
 * Gera os metadados para a página inicial
 */
export async function generateMetadata({
  params
}: {
  params: { locale: AppLocale };
}): Promise<Metadata> {
  return generatePageMetadata({
    namespace: 'metadata.home',
    titleKey: 'title',
    descriptionKey: 'description',
    params
  });
}

export default async function HomeLocalePage({ params }:{ params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return (
    <>
      <OrganizationSchema />
      
      <main className="min-h-screen bg-[#0F0E0D]">
        <Navbar />
        <Hero />
        <Services />
        <Work />
        <Founder />
        <SocialProof />
        <CtaCard />
        <Footer />
      </main>
    </>
  );
}
