"use client"

import React from "react"
import { Code, Megaphone, Palette, Video, ArrowUpRight, ChevronRight } from "lucide-react"
import { useMessages, useTranslations } from 'next-intl'

// Mapeia ícones por possíveis categorias (EN/PT)
const iconMap: Record<string, React.ReactElement> = {
  Development: <Code className="w-7 h-7" />,
  Marketing: <Megaphone className="w-7 h-7" />,
  Strategy: <Palette className="w-7 h-7" />,
  "Video Editing": <Video className="w-7 h-7" />,
  Desenvolvimento: <Code className="w-7 h-7" />,
  "Edição de Vídeo": <Video className="w-7 h-7" />,
  Estratégia: <Palette className="w-7 h-7" />,
}

export function Services() {
  const messages: any = useMessages()
  const t = useTranslations()
  const services: { number: string; category: string; description: string; items: string[] }[] = messages.services.list

  return (
    <section className="py-28 px-6 lg:px-12 bg-[#0F0E0D]" id="services">
      <div className="max-w-7xl mx-auto">
        {/* Seção de Introdução */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <div>
            <h2 className="section-title text-[#F7F7F7] mb-5">
              {messages.services.sectionTitle} & abordagem
            </h2>
            <p className="text-lg text-[#F7F7F7]/70 font-satoshi leading-relaxed">
              {messages.services.sectionSubtitle}
            </p>
          </div>
          <div className="relative h-full flex items-center justify-center">
            <div className="absolute w-72 h-72 bg-[#CB8D0F]/10 rounded-full opacity-30 filter blur-xl"></div>
            <div className="relative">
              <div className="p-6 backdrop-blur-sm bg-[#0F0E0D]/30 border border-[#CB8D0F]/20 rounded-xl">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center p-3 bg-[#0F0E0D]/70 rounded-lg border border-[#CB8D0F]/10">
                      <div className="w-2 h-2 rounded-full bg-[#CB8D0F] mr-2"></div>
                      <p className="text-[#F7F7F7]/80 text-sm font-medium">
                        {t(`services.highlights.${i}`)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-[#F7F7F7]/60 text-sm text-center">
                  {t('services.approachHighlight')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categoria Principal */}
        {services.map((service, serviceIndex) => (
          <div key={service.category} className="mb-24 last:mb-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-16 w-16 relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#CB8D0F]/20 opacity-60"></div>
                <div className="relative text-[#CB8D0F]">
                  {iconMap[service.category] || <Code className="w-7 h-7" />}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#F7F7F7]">
                  {service.category}
                </h3>
                <p className="text-[#F7F7F7]/70 mt-1">
                  {service.description}
                </p>
              </div>
            </div>
            
            {/* Lista de itens em formato de grade */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 pl-4 md:pl-20">
              {service.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#CB8D0F]"></div>
                  <span className="text-[#F7F7F7]/90">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <a 
            href="#contact" 
            className="bg-[#CB8D0F] text-[#0F0E0D] font-medium py-3 px-8 rounded-full transition-all duration-300 hover:bg-[#CB8D0F]/90 hover:shadow-lg flex items-center gap-2"
          >
            {messages.navbar.letsTalk}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
