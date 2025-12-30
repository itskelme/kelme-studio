"use client"

import { motion } from "framer-motion"
import { RiDoubleQuotesL, RiStarFill } from "@remixicon/react"
import { useMessages } from "next-intl"
import { Link } from "@/i18n/navigation"

export function Testimonials() {
  const messages: any = useMessages()
  
  if (!messages?.testimonials) {
    return null
  }
  
  const testimonials = messages.testimonials

  return (
    <section className="py-32 border-b border-white/10 overflow-hidden relative">
  

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C0392B] mb-4">
              {testimonials.sectionLabel}
            </h2>
            <h3 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none text-white">
              {testimonials.title}
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block max-w-xs text-right"
          >
            <p className="text-secondary text-sm leading-relaxed">
              {testimonials.subtitle}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.items.map((item: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Metric Badge */}
              <div className="absolute top-0 right-0 bg-[#C0392B] text-white text-[10px] font-bold uppercase px-3 py-1 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.metric}
              </div>

              <div>
                <div className="flex gap-1 mb-6 text-[#C0392B]">
                  {[...Array(5)].map((_, i) => (
                    <RiStarFill key={i} className="w-4 h-4" />
                  ))}
                </div>
                
                <RiDoubleQuotesL className="text-white/20 w-8 h-8 mb-4" />
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {item.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold uppercase text-white tracking-wide">
                    {item.author}
                  </h4>
                  <p className="text-xs text-secondary uppercase tracking-wider">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors"
          >
           {messages.hero.buttons?.talkToDiego || "Start Project"}
           <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
           </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
