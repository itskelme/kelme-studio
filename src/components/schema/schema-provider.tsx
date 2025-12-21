"use client";

import { FAQItem } from "@/components/ui/faq-schema";
import { useTranslations } from "next-intl";
import Script from "next/script";

type SchemaType = "Organization" | "FAQPage" | "WebSite" | "BreadcrumbList";

/**
 * Props para Organization Schema
 */
type OrganizationSchemaProps = {
  name?: string;
  url?: string;
  logoUrl?: string;
  sameAs?: string[];
};

/**
 * Props para FAQ Schema
 */
type FAQSchemaProps = {
  items: FAQItem[];
};

/**
 * Props para o SchemaProvider unificado
 */
type SchemaProviderProps = {
  type: SchemaType;
  id?: string;
  organizationData?: OrganizationSchemaProps;
  faqData?: FAQSchemaProps;
  customData?: Record<string, any>;
};

/**
 * Componente unificado para renderizar qualquer tipo de schema JSON-LD
 * Facilita a manutenção e evita duplicação de código
 */
export function SchemaProvider({
  type,
  id = `${type.toLowerCase()}-schema`,
  organizationData,
  faqData,
  customData,
}: SchemaProviderProps) {
  // Para schemas que precisam de traduções (como FAQ)
  const t = useTranslations("contact");
  
  // Determina o schema baseado no tipo
  let schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": type,
  };
  
  // Adiciona dados específicos do tipo de schema
  if (type === "Organization" && organizationData) {
    schema = {
      ...schema,
      "name": organizationData.name || "Kelme Studio",
      "url": organizationData.url || "https://kelme.studio/",
      "logo": organizationData.logoUrl || "https://kelme.studio/kelme-logo.svg",
      "sameAs": organizationData.sameAs || [
        "https://www.linkedin.com/company/kelme-studio/",
        "https://www.instagram.com/kelmestudio/"
      ]
    };
  } else if (type === "FAQPage" && faqData) {
    // Mapeia os itens de FAQ para o formato esperado pelo Schema.org
    const faqItems = faqData.items.map((item) => ({
      "@type": "Question",
      "name": t(item.questionKey),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t(item.answerKey)
      }
    }));
    
    schema = {
      ...schema,
      "mainEntity": faqItems
    };
  }
  
  // Adiciona dados customizados, se fornecidos
  if (customData) {
    schema = { ...schema, ...customData };
  }
  
  return (
    <Script id={id} type="application/ld+json">
      {JSON.stringify(schema)}
    </Script>
  );
}
