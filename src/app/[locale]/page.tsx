import { Hero } from '@/presentation/components/organisms/home/hero';
import { Marquee } from '@/presentation/components/molecules/home/marquee';
import { Services } from '@/presentation/components/organisms/home/services';
import { Work } from '@/presentation/components/organisms/home/work';
import { Founder } from '@/presentation/components/organisms/home/founder';
import { Testimonials } from '@/presentation/components/organisms/home/testimonials';
import { FAQ } from '@/presentation/components/organisms/home/faq';
import { SalesCTA } from '@/presentation/components/organisms/home/sales-cta';
import { Roadmap } from '@/presentation/components/organisms/home/roadmap';
import { SeoResults } from '@/presentation/components/organisms/home/seo-results';
import { AppLocale, routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { OrganizationSchema } from '@/presentation/components/molecules/seo/schema';
import { generatePageMetadata } from '@/lib/metadata';
import { MainLayout } from '@/presentation/components/templates';

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
  params: Promise<{ locale: AppLocale }>;
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
    <MainLayout>
      <OrganizationSchema />
      <Hero />
      <Marquee />
      <Services />
      <Roadmap />
      <SeoResults />
      <Work />
      <Founder />
      <Testimonials />
      <FAQ />
      <SalesCTA />
    </MainLayout>
  );
}
