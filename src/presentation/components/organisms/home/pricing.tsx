"use client"

import { motion } from "framer-motion"
import { RiCheckLine, RiArrowRightLine } from "@remixicon/react"
import { useMessages, useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export function Pricing() {
  const messages: any = useMessages()
  const t = useTranslations()
  
  if (!messages?.pricing) {
    return null
  }
  
  const pricing = messages.pricing

  const plans = [
    {
      name: pricing.design.name,
      price: pricing.design.price,
      period: pricing.design.period,
      description: pricing.design.description,
      features: pricing.design.features,
      isPopular: false
    },
    {
      name: pricing.designDev.name,
      price: pricing.designDev.price,
      period: pricing.designDev.period,
      description: pricing.designDev.description,
      features: pricing.designDev.features,
      isPopular: true,
      badge: pricing.designDev.badge
    }
  ]

  return (
    <section id="pricing" className="py-32 border-b border-white/10 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-4">
            {pricing.sectionLabel}
          </h2>
          <h3 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none mb-6">
            {pricing.title}
          </h3>
          <p className="text-secondary text-lg">
            {pricing.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative p-8 md:p-12 border ${
                plan.isPopular ? "border-white bg-surface" : "border-white/10 bg-black"
              } flex flex-col`}
            >
              {plan.isPopular && plan.badge && (
                <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold uppercase px-3 py-1 tracking-widest rounded-none">
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-8">
                <h4 className="text-2xl font-display uppercase font-bold mb-2">{plan.name}</h4>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl md:text-5xl font-bold">{plan.price}</span>
                  <span className="text-secondary">{plan.period}</span>
                </div>
                <p className="text-secondary text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="grow mb-10">
                <ul className="space-y-4">
                  {plan.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <span className="shrink-0 w-5 h-5 bg-white text-black flex items-center justify-center rounded-none">
                        <RiCheckLine className="w-3 h-3" />
                      </span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className={`w-full py-4 text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all rounded-none ${
                  plan.isPopular 
                    ? "bg-white text-black hover:bg-gray-200" 
                    : "border border-white/20 hover:bg-white hover:text-black"
                }`}
              >
                {pricing.getStarted} <RiArrowRightLine className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-secondary text-sm">
            {pricing.customScope}{" "}
            <a href="mailto:hello@kelme.studio" className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all">
              {pricing.bookCall}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
