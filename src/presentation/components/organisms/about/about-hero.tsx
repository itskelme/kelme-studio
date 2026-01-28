"use client"

import { motion } from "framer-motion"
import { useMessages } from "next-intl"

export function AboutHero() {
  const messages: any = useMessages()
  const hook = messages?.about?.hook

  if (!hook) return null

  return (
    <section className="relative pt-40 pb-20 md:pt-60 md:pb-40 px-6 border-b border-white/10">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="font-display text-6xl md:text-8xl font-bold uppercase leading-[0.9] mb-12">
            {hook.title.split('.')[0]}. <br />
            <span className="text-secondary line-through decoration-accent decoration-4">
              {hook.title.split('.')[1]}.
            </span>
          </h1>
          
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/2">
              <p 
                className="text-xl md:text-2xl font-light leading-relaxed text-gray-200"
                dangerouslySetInnerHTML={{ __html: hook.subtitle }}
              />
            </div>
            <div className="md:w-1/2 text-secondary text-sm md:text-base leading-relaxed space-y-6">
              <p dangerouslySetInnerHTML={{ __html: hook.text1 }} />
              <p dangerouslySetInnerHTML={{ __html: hook.text2 }} />
              <p dangerouslySetInnerHTML={{ __html: hook.text3 }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
