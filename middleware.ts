import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';

// Middleware aprimorado com detecção automática de idioma
export default createMiddleware({
  // Usar a configuração central de roteamento
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: routing.localePrefix,
  
  // Habilitar detecção automática de idioma
  localeDetection: true
});

export const config = {
  // Não aplicar middleware aos arquivos estáticos e APIs
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};
