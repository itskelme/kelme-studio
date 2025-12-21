"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Componente de depoimentos de clientes
 */
export function ContactTestimonials() {
  const t = useTranslations("contact");
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Função para ir para o próximo depoimento
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  // Função para ir para o depoimento anterior
  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="mt-24">
      <header className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 font-satoshi">{t("clientTestimonials")}</h2>
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-[#27D182] fill-[#27D182]" />
              ))}
            </div>
            <span className="text-xl font-bold">4.9</span>
          </div>
        </div>
      </header>
      
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <button 
            onClick={goToPrevious}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 bg-[#191817] p-2 rounded-full border border-[#27D182]/20 hover:bg-[#27D182]/10 transition-colors z-10"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="h-5 w-5 text-[#27D182]" />
          </button>
          
          <div className="bg-[#191817] p-8 rounded-xl border border-[#27D182]/20 relative overflow-hidden">
            <div 
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              <div className="flex" style={{ width: `${testimonials.length * 100}%` }}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} style={{ width: `${100 / testimonials.length}%` }}>
                    <div className="px-4">
                      <p className="text-xl italic mb-8">
                        "{t(testimonial.textKey)}"
                      </p>
                      
                      <div className="flex items-center">
                        <img 
                          src={testimonial.avatar} 
                          alt={t(testimonial.authorKey)} 
                          className="h-14 w-14 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <h3 className="font-bold font-satoshi">{t(testimonial.authorKey)}</h3>
                          <p className="text-sm opacity-70">{t(testimonial.positionKey)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <button 
            onClick={goToNext}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 bg-[#191817] p-2 rounded-full border border-[#27D182]/20 hover:bg-[#27D182]/10 transition-colors z-10"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="h-5 w-5 text-[#27D182]" />
          </button>
        </div>
        
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-3 w-3 rounded-full transition-colors ${
                index === activeIndex ? "bg-[#27D182]" : "bg-[#27D182]/30"
              }`}
              aria-label={`Ver depoimento ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Dados dos depoimentos (usando chaves de tradução)
 */
const testimonials = [
  {
    textKey: "testimonial1Text",
    authorKey: "testimonial1Author",
    positionKey: "testimonial1Position",
    avatar: "/placeholder-user.jpg"
  },
  {
    textKey: "testimonial2Text",
    authorKey: "testimonial2Author",
    positionKey: "testimonial2Position",
    avatar: "/placeholder-user.jpg"
  },
  {
    textKey: "testimonial3Text",
    authorKey: "testimonial3Author",
    positionKey: "testimonial3Position",
    avatar: "/placeholder-user.jpg"
  }
];
