import { setRequestLocale } from "next-intl/server";
import { AppLocale, routing } from "@/i18n/routing";
import { BlogV2 } from "@/components/blog/blog-page";
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
  
  return <BlogV2 />;
}
