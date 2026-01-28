import { setRequestLocale } from "next-intl/server";
import { AppLocale, routing } from "@/i18n/routing";
import { BlogV2 } from "@/presentation/components/organisms/blog/blog-page";
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
    namespace: 'metadata.blog',
    titleKey: 'title',
    descriptionKey: 'description',
    params,
    path: 'blog'
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return (
    <MainLayout>
      <BlogV2 />
    </MainLayout>
  );
}
