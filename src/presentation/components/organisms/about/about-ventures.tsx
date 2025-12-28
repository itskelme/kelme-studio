"use client"

import { motion } from "framer-motion"
import { RiLinksFill } from "@remixicon/react"
import { useMessages } from "next-intl"

const ventureColors: Record<string, string> = {
  zarpy: "#E67E22",
  pppi: "#2980B9",
  pandami: "#27AE60"
}

export function AboutVentures() {
  const messages: any = useMessages()
  const ventures = messages?.about?.ventures

  if (!ventures) return null

  const venturesList = [
    { key: 'zarpy', ...ventures.zarpy, color: ventureColors.zarpy },
    { key: 'pppi', ...ventures.pppi, color: ventureColors.pppi },
    { key: 'pandami', ...ventures.pandami, color: ventureColors.pandami }
  ]

  return (
    <section className="py-32 border-b border-white/10 relative">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4 flex items-center gap-2">
            <RiLinksFill className="text-[#C0392B]" /> {ventures.label}
          </h2>
          <h3 
            className="font-display text-5xl md:text-6xl font-bold uppercase leading-none max-w-3xl"
            dangerouslySetInnerHTML={{ __html: ventures.title.replace(/\n/g, '<br />') }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {venturesList.map((venture, index) => (
            <motion.div 
              key={venture.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group border-t border-white/20 pt-8 hover:border-[#C0392B] transition-colors duration-500"
            >
              <div className="flex justify-between items-baseline mb-6">
                <h4 className="text-3xl font-display font-bold uppercase">{venture.name}</h4>
                <span className="text-[10px] uppercase tracking-widest border border-white/20 px-2 py-1 rounded-none text-secondary">
                  {venture.role}
                </span>
              </div>
              <p className="text-secondary text-sm leading-relaxed mb-8">
                {venture.description}
              </p>
              <div 
                className="w-full h-1 bg-white/10 group-hover:bg-white transition-colors duration-500"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <div 
                  className="h-full w-0 group-hover:w-full transition-all duration-700 ease-out" 
                  style={{ backgroundColor: venture.color }} 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
