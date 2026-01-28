"use client"

import { useMessages } from "next-intl"
import { motion } from "framer-motion"

export function AboutCopywriting() {
  const messages: any = useMessages()
  const copywriting = messages?.about?.copywriting

  if (!copywriting) return null

  return (
    <section className="py-32 bg-black border-b border-white/10">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <h3 className="text-accent font-bold tracking-widest uppercase mb-6 text-sm">
            {copywriting.label}
          </h3>
          <h2 
            className="font-display text-5xl md:text-7xl font-bold uppercase mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: copywriting.title.replace(/\n/g, '<br />') }}
          />
          <p className="text-white/60 text-lg md:text-xl max-w-2xl">
            {copywriting.subtitle}
          </p>
        </div>

        {/* Values Grid - Robinhood inspired */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {copywriting.cards.map((card: any, index: number) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold uppercase mb-4 text-white group-hover:text-accent transition-colors duration-300">
                {card.title}
              </h3>

              {/* Bold Statement */}
              <p className="text-white font-bold text-base md:text-lg mb-4">
                {card.boldStatement}
              </p>

              {/* Description */}
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
