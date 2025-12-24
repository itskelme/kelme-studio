import { Hero } from '@/components/hero';
import { Marquee } from '@/components/marquee';
import { Services } from '@/components/services';
import { Work } from '@/components/work';
import { Founder } from '@/components/founder';
import { SocialProof } from '@/components/social-proof';
import { Testimonials } from '@/components/testimonials';
import { Pricing } from '@/components/pricing';
import { FAQ } from '@/components/faq';
import { CommunityLeadMagnet } from '@/components/community-lead-magnet';
import { CtaCard } from '@/components/cta-card';
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
      <Work />
      <Founder />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CommunityLeadMagnet />
      <CtaCard />
    </>
  );
}
