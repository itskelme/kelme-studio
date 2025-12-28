"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { RiAddLine, RiSubtractLine } from "@remixicon/react"
import { useMessages } from "next-intl"
import { Link } from "@/i18n/navigation"

export function FAQ() {
  const messages: any = useMessages()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  
  if (!messages?.faq) {
    return null
  }
  
  const faq = messages.faq

  return (
    <section className="py-32 bg-black border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-4">
              {faq.sectionLabel}
            </h2>
            <h3 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none mb-6">
              {faq.title}
            </h3>
          </div>

          <div className="space-y-4">
            {faq.questions.map((item: any, index: number) => {
              const isOpen = openIndex === index

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-white/10 bg-white/5 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-display text-lg md:text-xl font-bold uppercase text-white pr-4">
                      {item.question}
                    </span>
                    <span className="shrink-0 w-8 h-8 flex items-center justify-center border border-white/20 text-white">
                      {isOpen ? (
                        <RiSubtractLine className="w-5 h-5" />
                      ) : (
                        <RiAddLine className="w-5 h-5" />
                      )}
                    </span>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-secondary leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-secondary text-sm">
              {faq.cantFind}{" "}
              <a 
                href="mailto:hello@kelme.studio" 
                className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all"
              >
                {faq.emailUs}
              </a>
            </p>
            <div className="mt-8">
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
        </div>
      </div>
    </section>
  )
}
