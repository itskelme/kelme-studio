"use client"

import React from "react"
import { RiTargetLine, RiLayoutLine, RiSearchLine, RiFlashlightLine, RiRocket2Line } from "@remixicon/react"
import { useMessages, useTranslations } from 'next-intl'
import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  target: RiTargetLine,
  layout: RiLayoutLine,
  search: RiSearchLine,
  zap: RiFlashlightLine,
}

interface Service {
  category: string
  description: string
  items: string[]
  icon: string
}

export function Services() {
  const messages: any = useMessages()
  const t = useTranslations()
  const services: Service[] = messages.services.list

  return (
    <section id="services" className="py-32 border-b border-white/10 bg-black relative">
      {/* Background Grid */}

      
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
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || RiTargetLine
            
            return (
              <motion.div
                key={service.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black p-12 group hover:bg-white/5 transition-all duration-500 relative overflow-hidden cursor-pointer"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-linear-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <motion.div 
                    className="mb-6 text-white/40 group-hover:text-white transition-all duration-500"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <IconComponent className="w-8 h-8" />
                  </motion.div>
                  
                  <h4 className="text-2xl font-oswald uppercase font-bold mb-4 group-hover:text-white transition-colors duration-300">
                    {service.category}
                  </h4>
                  
                  <p className="text-secondary mb-8 text-sm leading-relaxed max-w-sm group-hover:text-white/80 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {service.items.slice(0, 3).map((tag, tagIndex) => (
                      <motion.span 
                        key={tag}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                        className="text-xs border border-white/10 px-3 py-1.5 uppercase tracking-wider text-secondary rounded-none group-hover:border-white/30 group-hover:text-white/90 transition-all duration-300"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
        <div className="mt-16 text-center">
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors"
          >
           {t("hero.buttons.talkToDiego")}
           <RiRocket2Line className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
