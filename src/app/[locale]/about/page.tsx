import { setRequestLocale } from "next-intl/server";
import { AppLocale, routing } from "@/i18n/routing";
import { AboutHero } from "@/presentation/components/organisms/about/about-hero";
import { AboutPhilosophy } from "@/presentation/components/organisms/about/about-philosophy";
import { AboutCopywriting } from "@/presentation/components/organisms/about/about-copywriting";
import { AboutOrigin } from "@/presentation/components/organisms/about/about-origin";
import { AboutCTA } from "@/presentation/components/organisms/about/about-cta";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { MainLayout } from "@/presentation/components/templates";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  return generatePageMetadata({
    namespace: 'metadata.about',
    titleKey: 'title',
    descriptionKey: 'description',
    params,
    path: 'about'
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return (
    <MainLayout>
      <AboutHero />
      <AboutPhilosophy />
      <AboutCopywriting />
      <AboutOrigin />
      <AboutCTA />
    </MainLayout>
  );
}
