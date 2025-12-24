import { setRequestLocale } from "next-intl/server";
import { AppLocale, routing } from "@/i18n/routing";
import { AboutHero } from "@/components/about/about-hero";
import { AboutPhilosophy } from "@/components/about/about-philosophy";
import { AboutVentures } from "@/components/about/about-ventures";
import { AboutOrigin } from "@/components/about/about-origin";
import { AboutCTA } from "@/components/about/about-cta";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

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
    <>
      <AboutHero />
      <AboutPhilosophy />
      <AboutVentures />
      <AboutOrigin />
      <AboutCTA />
    </>
  );
}
