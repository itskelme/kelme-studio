import { FAQItem } from "@/components/ui/faq-schema";

/**
 * Número máximo de FAQs suportadas no sistema de tradução
 */
const MAX_FAQ_ITEMS = 10;

/**
 * Extrai os itens de FAQ a partir do número máximo desejado
 * Evita duplicação de definições de FAQs em vários arquivos
 * @param count Número de itens FAQ a extrair (default: 5)
 * @returns Array de FAQItems com as chaves de tradução adequadas
 */
export function getFAQItems(count: number = 5): FAQItem[] {
  const items: FAQItem[] = [];
  
  // Limita o número de itens ao máximo suportado
  const itemCount = Math.min(count, MAX_FAQ_ITEMS);
  
  for (let i = 1; i <= itemCount; i++) {
    items.push({
      questionKey: `faq${i}Question`,
      answerKey: `faq${i}Answer`
    });
  }
  
  return items;
}
