"use client"

import React from "react"
import { RiLayoutMasonryLine, RiCodeSSlashLine, RiPenNibLine, RiRocket2Line } from "@remixicon/react"
import { useMessages, useTranslations } from 'next-intl'
import { motion } from "framer-motion"

const iconMap: Record<string, React.ReactElement> = {
  "UI/UX Design": <RiLayoutMasonryLine className="w-6 h-6" />,
  Development: <RiCodeSSlashLine className="w-6 h-6" />,
  Desenvolvimento: <RiCodeSSlashLine className="w-6 h-6" />,
  Branding: <RiPenNibLine className="w-6 h-6" />,
  Growth: <RiRocket2Line className="w-6 h-6" />,
  Crescimento: <RiRocket2Line className="w-6 h-6" />,
}

export function Services() {
  const messages: any = useMessages()
  const t = useTranslations()
  const services: { number: string; category: string; description: string; items: string[] }[] = messages.services.list

  return (
    <section id="services" className="py-32 border-b border-white/10 bg-black relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-4">
            {t("services.label", { default: "What We Do" })}
          </h2>
          <h3 className="font-oswald text-5xl md:text-7xl font-bold uppercase leading-none">
            {messages.services.sectionTitle}<span className="text-secondary">.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 border border-white/10">
          {services.map((service, index) => (
            <motion.div
              key={service.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-black p-12 group hover:bg-surface transition-colors duration-500"
            >
              <div className="mb-6 text-white/50 group-hover:text-white transition-colors">
                {iconMap[service.category] || <RiCodeSSlashLine className="w-6 h-6" />}
              </div>
              <h4 className="text-2xl font-oswald uppercase font-bold mb-4">{service.category}</h4>
              <p className="text-secondary mb-8 text-sm leading-relaxed max-w-sm">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.items.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs border border-white/10 px-2 py-1 uppercase tracking-wider text-secondary rounded-none">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
