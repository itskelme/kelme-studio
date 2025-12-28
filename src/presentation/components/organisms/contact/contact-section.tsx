"use client";

import { ContactForm } from "./contact-form";
import { ContactInfo } from "./contact-info";
import { ContactOffices } from "./contact-offices";
import { ContactTestimonials } from "./contact-testimonials";
import { ContactFAQ } from "./contact-faq";
import { Container } from "@/presentation/components/atoms/ui/container";
import { useTranslations } from "next-intl";

/**
 * Componente principal da seção de contato
 * Organiza os subcomponentes em uma estrutura coesa
 */
export function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section className="relative bg-black text-[#F7F7F7] py-16 md:py-24 overflow-hidden min-h-screen">
      {/* Gradient background effect */}
   
      
      {/* Accent circles */}
      <div className="absolute top-32 left-10 w-64 h-64 rounded-full bg-[#27D182]/5 blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-[#017DDD]/5 blur-3xl"></div>
      
      <Container className="relative z-10">
        <header className="mb-16 text-center">
          <div className="inline-block mb-4">
            <span className="inline-block px-4 py-1 rounded-full bg-[#27D182]/10 text-[#27D182] font-medium text-sm">
              {t("getInTouch")}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter font-satoshi">
            <span className="text-gradient-primary">
              {t("formTitle")}
            </span>
          </h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            {t("formSubtitle")}
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <ContactForm />
          <ContactInfo />
        </div>

        <ContactOffices />
        <ContactTestimonials />
        <ContactFAQ />
      </Container>
    </section>
  );
}
