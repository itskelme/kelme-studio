// Este arquivo está obsoleto e foi substituído por @/presentation/components/molecules/seo/schema/schema-provider.tsx
// Mantido apenas para compatibilidade, será removido em uma futura refatoração

"use client";

import { FAQItem } from "@/presentation/components/atoms/ui/faq-schema";
import { SchemaProvider } from "@/presentation/components/molecules/seo/schema/schema-provider";

/**
 * Componente cliente para renderizar o schema JSON-LD de FAQs
 * @deprecated Use SchemaProvider de @/presentation/components/molecules/seo/schema/schema-provider
 */
export default function ClientFAQSchema({ items }: { items: FAQItem[] }) {
  return <SchemaProvider type="FAQPage" faqData={{ items }} />;
}
