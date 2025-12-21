import { getTranslations } from "next-intl/server";
import { AppLocale, locales } from "@/i18n/routing";
import { Metadata } from "next";

export type MetadataProps = {
  namespace: string;
  titleKey: string;
  descriptionKey: string;
  params: Promise<{ locale: AppLocale }>;
  path?: string; // Caminho da página após o locale, ex: "contact" para "/pt/contact"
};

/**
 * Gera os metadados para uma página com suporte a internacionalização
 * Função unificada para evitar duplicação de código entre as páginas
 */
export async function generatePageMetadata({
  namespace,
  titleKey,
  descriptionKey,
  params,
  path = "",
}: MetadataProps): Promise<Metadata> {
  // Await params before accessing properties (Next.js 15 requirement)
  const { locale } = await params;
  
  // Obtém as traduções para o locale atual
  // O namespace deve ser uma string separada por pontos como "metadata.home"
  // Extraímos as partes para navegar corretamente na estrutura JSON
  const parts = namespace.split('.');
  const t = await getTranslations({ locale, namespace: parts[0] });
  
  // Prepara URLs alternativas para cada idioma suportado
  const alternativeLanguages: Record<string, string> = {};
  
  // Constrói o caminho base sem locale
  const pathSuffix = path ? `/${path}` : "";
  
  // Cria URLs para todos os locales suportados
  locales.forEach(loc => {
    const localePrefix = loc === 'en' ? '' : loc;
    alternativeLanguages[loc] = `/${localePrefix}${pathSuffix}`;
  });
  
  // Constrói URL canônica
  const localePrefix = locale === 'en' ? '' : locale;
  const canonical = `/${localePrefix}${pathSuffix}`;
  
  return {
    title: t(`${parts[1]}.${titleKey}`),
    description: t(`${parts[1]}.${descriptionKey}`),
    alternates: {
      canonical,
      languages: alternativeLanguages,
    }
  };
}
