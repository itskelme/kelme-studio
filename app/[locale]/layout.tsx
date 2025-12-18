import type { ReactNode } from 'react';
import '@/app/globals.css';
import { Inter, Rubik } from 'next/font/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { AppLocale, locales } from '@/i18n/routing';
import { generatePageMetadata } from '@/lib/metadata';

const satoshi = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-satoshi',
  weight: ['400','500','600','700','800','900']
});

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
  weight: ['400', '500', '600', '700']
});

/**
 * Gera os metadados para a página raiz, usando o utilitário unificado
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

export default async function RootLayout({ 
  children,
  params 
}: { 
  children: ReactNode;
  params: { locale: AppLocale }
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  
  return (
    <html lang={locale} className={`${manrope.variable} ${spaceMono.variable} antialiased scroll-smooth`}>
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="beforeInteractive" />
      </head>
      <body className="font-sans bg-harpia-black text-gray-100 overflow-x-hidden cursor-none">
        <NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
