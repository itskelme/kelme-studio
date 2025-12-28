"use client"

import Image from "next/image"
import { useMessages } from 'next-intl'
import { motion } from "framer-motion"
import { Link } from "@/i18n/navigation"

export function Founder() {
  const messages: any = useMessages()
  const f = messages.founder
  
  return (
    <section className="relative py-32 bg-black overflow-hidden border-b border-white/10">
      {/* Background Typography */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-20 select-none pointer-events-none z-0">
        <motion.span 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-oswald font-bold text-[25vw] leading-none text-white/[0.02] uppercase whitespace-nowrap"
        >
          Tech Lead
        </motion.span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          
          {/* Left Column: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-5/12 relative group"
          >
            <div className="relative aspect-3/4 overflow-hidden bg-white/5">
              <Image 
                src="/images/about/diego-kelme-portrait.jpg"
                alt="Diego Kelme" 
                fill
                className="object-cover contrast-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60" />
            </div>

            {/* Corner Brackets */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-white/20 transition-all duration-500 group-hover:border-white/40 group-hover:-top-4 group-hover:-left-4" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-white/20 transition-all duration-500 group-hover:border-white/40 group-hover:-bottom-4 group-hover:-right-4" />
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-7/12 relative"
          >
            <div className="absolute -top-12 right-0 w-20 h-20 border-t-4 border-r-4 border-[#C0392B] opacity-80 hidden md:block" />

            <h2 className="font-oswald text-5xl md:text-7xl font-bold uppercase leading-[0.9] mb-8">
              {f.greeting} <span className="text-[#C0392B]">{f.name}</span>
            </h2>

            <div className="space-y-6 text-secondary text-lg md:text-xl font-light leading-relaxed">
              {f.paragraphs && f.paragraphs.map((paragraph: string, index: number) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}

              {f.quote && (
                <div className="py-6 my-6 border-l-2 border-[#C0392B] pl-8 bg-white/5">
                  <p className="text-white italic text-xl font-serif">
                    "{f.quote}"
                  </p>
                </div>
              )}

              <div className="pt-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-3">{f.ctaLabel || "Here is the answer:"}</p>
                <Link 
                  href="/#work" 
                  className="inline-block bg-[#C0392B] text-white px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-red-700 transition-colors rounded-none"
                >
                  {f.cta || "See Our Results"}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
