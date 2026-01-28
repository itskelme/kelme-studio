"use client"

import { motion } from "framer-motion"
import { RiArrowRightLine } from "@remixicon/react"
import { Link } from "@/i18n/navigation"
import { useMessages } from "next-intl"

export function AboutCTA() {
  const messages: any = useMessages()
  const cta = messages?.about?.cta

  if (!cta) return null

  return (
    <section className="py-40 bg-surface border-t border-white/10 text-center">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-8xl font-bold uppercase leading-none mb-12"
          dangerouslySetInnerHTML={{ __html: cta.title.replace(/\?/g, '?<br />') }}
        />
        
        <Link 
          href="/contact"
          className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 text-lg uppercase tracking-widest font-bold hover:bg-accent hover:text-white transition-all duration-300"
        >
          {cta.button} <RiArrowRightLine />
        </Link>
      </div>
    </section>
  )
}
