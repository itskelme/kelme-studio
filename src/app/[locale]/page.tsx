import { Hero } from '@/presentation/components/organisms/home/hero';
import { Marquee } from '@/presentation/components/molecules/marquee';
import { Services } from '@/presentation/components/organisms/home/services';
import { Work } from '@/presentation/components/organisms/home/work';
import { Founder } from '@/presentation/components/organisms/home/founder';
import { Testimonials } from '@/presentation/components/organisms/home/testimonials';
import { FAQ } from '@/presentation/components/organisms/home/faq';
import { CommunityLeadMagnet } from '@/presentation/components/organisms/home/community-lead-magnet';
import { Roadmap } from '@/presentation/components/organisms/home/roadmap';
import { AppLocale, routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { OrganizationSchema } from '@/presentation/components/molecules/seo/schema';
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
    <>
      <OrganizationSchema />
      <Hero />
      <Marquee />
      <Services />
      <Roadmap />
      <Work />
      <Founder />
      <Testimonials />
      <FAQ />
      <CommunityLeadMagnet />
    </>
  );
}
