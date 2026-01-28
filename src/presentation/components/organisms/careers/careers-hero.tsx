"use client"

import { motion } from "framer-motion"
import { useMessages } from "next-intl"

export function CareersHero() {
  const messages: any = useMessages()
  const careers = messages?.careers

  if (!careers) return null

  return (
    <div className="mb-24 max-w-4xl">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4"
      >
        {careers.label}
      </motion.h2>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-display text-6xl md:text-8xl font-bold uppercase leading-[0.9] text-white mb-8"
      >
        {careers.title.split('.')[0]}. <br />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-600">
          {careers.title.split('.')[1]}.
        </span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-secondary text-lg md:text-xl max-w-2xl leading-relaxed"
      >
        {careers.subtitle}
      </motion.p>
    </div>
  )
}
