// Este arquivo está obsoleto e foi substituído por @/presentation/components/molecules/seo/schema
// Mantido apenas para compatibilidade, será removido em uma futura refatoração

import { FAQItem } from "@/presentation/components/atoms/ui/faq-schema";
import { FAQSchema } from "@/presentation/components/molecules/seo/schema";

/**
 * Wrapper para o componente FAQSchema que pode ser usado em um Server Component
 * @deprecated Use FAQSchema de @/components/schema
 */
export function FAQSchemaWrapper({ items }: { items: FAQItem[] }) {
  return <FAQSchema items={items} />;
}
