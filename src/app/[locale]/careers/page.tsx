import { setRequestLocale } from "next-intl/server";
import { AppLocale, routing } from "@/i18n/routing";
import { CareersHero } from "@/components/careers/careers-hero";
import { CareersPositions } from "@/components/careers/careers-positions";
import { CareersForm } from "@/components/careers/careers-form";
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
    namespace: 'metadata.careers',
    titleKey: 'title',
    descriptionKey: 'description',
    params,
    path: 'careers'
  });
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return (
    <section className="min-h-screen bg-black relative overflow-hidden pt-32 pb-20">
      {/* Background Ambience */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <CareersHero />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <CareersPositions />
          <CareersForm />
        </div>
      </div>
    </section>
  );
}
