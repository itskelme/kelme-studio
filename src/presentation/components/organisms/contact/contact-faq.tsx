"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQItem } from "../ui/faq-schema";
import { getFAQItems } from "@/lib/utils/faq-utils";

/**
 * Dados de FAQ obtidos a partir do utilitário central
 */
const faqItems = getFAQItems(5);

/**
 * Componente FAQ (Perguntas frequentes)
 */
export function ContactFAQ() {
  const t = useTranslations("contact");
  const [openIndex, setOpenIndex] = useState(0);
  
  // Função para alternar FAQ aberto/fechado
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  
  return (
    <section className="mt-24 mb-12">
      <header className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 font-satoshi">{t("faqTitle")}</h2>
        <p className="text-xl opacity-80 max-w-2xl mx-auto">
          {t("faqDescription")}
        </p>
      </header>
      
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqItems.map((faq, index) => (
            <FAQItem 
              key={index}
              question={t(faq.questionKey)}
              answer={t(faq.answerKey)}
              isOpen={openIndex === index}
              toggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Componente de item FAQ individual
 */
type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  toggle: () => void;
};

function FAQItem({ question, answer, isOpen, toggle }: FAQItemProps) {
  return (
    <div className={cn(
      "bg-card rounded-xl border overflow-hidden transition-all duration-300",
      isOpen ? "border-[#27D182]/40" : "border-[#27D182]/20"
    )}>
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-6 text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium font-satoshi">{question}</h3>
        <div className={cn(
          "p-2 rounded-lg transition-colors",
          isOpen ? "bg-[#27D182]/30" : "bg-[#27D182]/20"
        )}>
          {isOpen ? (
            <Minus className="h-4 w-4 text-[#27D182]" />
          ) : (
            <Plus className="h-4 w-4 text-[#27D182]" />
          )}
        </div>
      </button>
      
      <div 
        className={cn(
          "grid transition-all duration-300",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6">
            <p className="text-foreground/80">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
