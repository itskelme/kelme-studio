import {defineRouting} from 'next-intl/routing';

// Configuração central de rotas e locales
export const routing = defineRouting({
  locales: ['en', 'pt'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

// Reexportar para facilitar consumo em outros módulos (ex.: next-intl.config, request.ts)
export const {locales, defaultLocale, localePrefix} = routing;
export type AppLocale = (typeof locales)[number];
