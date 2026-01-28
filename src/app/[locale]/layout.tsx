import type { ReactNode } from 'react';
import '@/app/globals.css';
import { Manrope, Oswald } from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { AppLocale, locales } from '@/i18n/routing';
import { generatePageMetadata } from '@/lib/metadata';
import { CustomCursor } from '@/presentation/components/atoms/custom-cursor';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400','500','600','700','800']
});

const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald',
  weight: ['400', '700']
});

/**
 * Gera os metadados para a página raiz, usando o utilitário unificado
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

/**
 * Root Layout - Base HTML structure only
 * Navbar/Footer are handled by route group layouts:
 * - (main) - includes Navbar + Footer
 * - (immersive) - no Navbar/Footer (e.g., work project details)
 */
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
    <html lang={locale} className={`${manrope.variable} ${oswald.variable} antialiased scroll-smooth`}>
      <body className="font-sans bg-black text-gray-100 overflow-x-hidden">
        <CustomCursor />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
