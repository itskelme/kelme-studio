"use client"

import { motion } from "framer-motion"
import { RiCalendarLine, RiGiftLine, RiCheckLine, RiArrowRightLine, RiSparklingLine } from "@remixicon/react"
import { useMessages } from "next-intl"
import { Link } from "@/i18n/navigation"

export function SalesCTA() {
  const messages: any = useMessages()
  
  if (!messages?.salesCta) {
    return null
  }
  
  const salesCta = messages.salesCta

  return (
    <section className="relative py-24 bg-black border-t border-b border-white/10 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-accent opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 relative">
          
          {/* Primary CTA - Schedule Sales Call */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[65%] bg-white/5 border-2 border-accent/30 hover:border-accent p-8 md:p-12 relative overflow-hidden group transition-all duration-300"
          >
            <div className="absolute top-4 right-4 flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest">
              <RiSparklingLine className="w-4 h-4" />
              <span>{salesCta.badge}</span>
            </div>

            <div className="relative z-10">
              <h3 className="text-accent font-bold tracking-widest uppercase mb-4 text-sm">
                {salesCta.label}
              </h3>
              <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.9] text-white mb-6">
                {salesCta.title.split(" ").slice(0, 3).join(" ")} <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">
                  {salesCta.title.split(" ").slice(3).join(" ")}
                </span>
              </h2>
              <p className="text-secondary text-lg mb-8 max-w-2xl leading-relaxed">
                {salesCta.description}
              </p>
              
              {/* Benefits list */}
              <div className="space-y-3 mb-8">
                {salesCta.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 text-white/80">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <RiCheckLine className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-accent hover:bg-accent/80 text-black px-8 py-4 text-sm uppercase tracking-widest font-bold transition-all group/btn"
              >
                <RiCalendarLine className="w-5 h-5" />
                <span>{salesCta.primaryCta}</span>
                <RiArrowRightLine className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>

          {/* Secondary CTA - Referral Program */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[33%] bg-linear-to-br from-[#017DDD]/10 to-[#017DDD]/5 border-2 border-[#017DDD]/30 hover:border-[#017DDD] p-8 relative overflow-hidden group transition-all duration-300 flex flex-col justify-between"
          >
            {/* Icon decoration */}
            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <RiGiftLine className="w-24 h-24 text-[#017DDD]" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#017DDD]/20 px-4 py-2 mb-6">
                <RiGiftLine className="w-5 h-5 text-[#017DDD]" />
                <span className="text-[#017DDD] font-bold text-xs uppercase tracking-widest">20% Commission</span>
              </div>

              <h3 className="font-oswald text-3xl md:text-4xl font-bold uppercase leading-tight text-white mb-4">
                {salesCta.secondaryCta.split(" ")[0]} <br />
                <span className="text-[#017DDD]">{salesCta.secondaryCta.split(" ").slice(1).join(" ")}</span>
              </h3>
              
              <p className="text-secondary text-base mb-8 leading-relaxed">
                {salesCta.secondaryCtaDescription}
              </p>
            </div>

            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 border-2 border-[#017DDD] hover:bg-[#017DDD] text-[#017DDD] hover:text-white px-6 py-4 text-sm uppercase tracking-widest font-bold transition-all group/btn"
            >
              <span>Learn More</span>
              <RiArrowRightLine className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>

            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-tl from-[#017DDD]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
