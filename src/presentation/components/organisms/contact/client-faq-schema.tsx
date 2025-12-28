// Este arquivo está obsoleto e foi substituído por @/components/schema/schema-provider.tsx
// Mantido apenas para compatibilidade, será removido em uma futura refatoração

"use client";

import { FAQItem } from "@/components/ui/faq-schema";
import { SchemaProvider } from "@/components/schema/schema-provider";

/**
 * Componente cliente para renderizar o schema JSON-LD de FAQs
 * @deprecated Use SchemaProvider de @/components/schema/schema-provider
 */
export default function ClientFAQSchema({ items }: { items: FAQItem[] }) {
  return <SchemaProvider type="FAQPage" faqData={{ items }} />;
}
