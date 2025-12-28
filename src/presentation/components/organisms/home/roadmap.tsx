"use client"

import React, { useRef } from "react"
import { useMessages, useTranslations } from "next-intl"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Link } from "@/i18n/navigation"
import { 
  RiLayoutMasonryLine, 
  RiCodeSSlashLine, 
  RiFlagLine, 
  RiRocket2Line, 
  RiUserSmileLine,
  RiCheckDoubleLine
} from "@remixicon/react"

export function Roadmap() {
  const messages: any = useMessages()
  const t = useTranslations()
  const roadmap = messages.roadmap
  
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Smooth out the progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const height = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  // Icons mapping for the steps
  const icons = [
    RiUserSmileLine,
    RiLayoutMasonryLine, 
    RiCodeSSlashLine
  ]

  return (
    <section id="roadmap" className="py-32 bg-black relative overflow-hidden" ref={containerRef}>
      {/* Background Ambience */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary text-sm font-bold uppercase tracking-[0.2em] mb-4"
          >
            {roadmap.sectionLabel}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-oswald text-5xl md:text-7xl font-bold uppercase leading-none text-white mb-6"
          >
            {roadmap.title} <span className="text-secondary">.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-xl"
          >
            {roadmap.description}
          </motion.p>
        </div>

        {/* Interactive Roadmap Chart */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Central Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2">
             <motion.div 
               className="w-full bg-gradient-to-b from-secondary/50 via-secondary to-white origin-top relative"
               style={{ height }}
             >
                {/* Glowing Tip */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-secondary rounded-full shadow-[0_0_20px_5px_var(--secondary)] blur-[2px]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full z-10" />
             </motion.div>
          </div>

          {/* Start Node */}
          <div className="relative flex md:justify-center mb-16 md:mb-24">
             <div className="w-16 h-16 md:w-20 md:h-20 ml-0 md:ml-0 flex items-center justify-center rounded-full bg-black border border-white/20 relative z-20 shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]">
                <RiFlagLine className="w-6 h-6 md:w-8 md:h-8 text-white/50" />
                <motion.div 
                  className="absolute inset-0 rounded-full border border-secondary"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
             </div>
             <div className="absolute left-16 md:left-[calc(50%+40px)] top-1/2 -translate-y-1/2 ml-6 md:ml-6">
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">Project Start</span>
             </div>
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-0 relative">
             {roadmap.steps.map((step: any, index: number) => {
               const Icon = icons[index] || RiCheckDoubleLine
               const isEven = index % 2 === 0
               
               return (
                 <motion.div 
                   key={step.id}
                   initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.6, delay: index * 0.1 }}
                   className={`flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} relative`}
                 >
                    {/* Timestamp / ID Side */}
                    <div className="hidden md:flex flex-1 w-full justify-end items-center px-12 py-8">
                       <span className="text-[120px] leading-none font-oswald font-bold text-white/5 select-none absolute top-0">
                         {step.id}
                       </span>
                    </div>

                    {/* Node Point */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-white/20 z-20 top-12 md:top-12 group-hover:border-secondary transition-colors duration-500">
                      <motion.div 
                        className="w-full h-full bg-secondary rounded-full"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2 + (index * 0.1) }}
                      />
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 w-full pl-20 md:pl-12 md:px-12 pb-16">
                       <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 group">
                          
                          <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-lg bg-white/5 text-secondary group-hover:scale-110 transition-transform duration-300">
                               <Icon size={24} />
                            </div>
                            <span className="md:hidden text-4xl font-oswald font-bold text-white/10">
                              {step.id}
                            </span>
                          </div>

                          <h3 className="text-2xl md:text-3xl font-oswald font-bold uppercase text-white mb-2">
                             {step.title}
                          </h3>
                          <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-6">
                             {step.subtitle}
                          </p>
                          <p className="text-white/60 text-sm leading-relaxed">
                             {step.description}
                          </p>
                       </div>
                    </div>
                 </motion.div>
               )
             })}
          </div>

          {/* Launch Node */}
          <div className="relative flex md:justify-center mt-8">
             <div className="w-16 h-16 md:w-20 md:h-20 ml-0 md:ml-0 flex items-center justify-center rounded-full bg-secondary text-black relative z-20 shadow-[0_0_50px_-10px_var(--secondary)]">
                <RiRocket2Line className="w-6 h-6 md:w-8 md:h-8 animate-pulse" />
             </div>
             <div className="absolute left-16 md:left-[calc(50%+40px)] top-1/2 -translate-y-1/2 ml-6 md:ml-6">
                <span className="text-xs font-bold uppercase tracking-widest text-white">Go Live</span>
             </div>
          </div>

        </div>

        {/* CTA Section */}
        <div className="mt-32 flex flex-col items-center text-center relative z-20">
           
           <div className="inline-flex flex-col items-center mb-8 mix-blend-difference">
               <span className="text-xs font-bold text-white/40 uppercase tracking-[0.5em] mb-2">{roadmap.peopleUserCentered.line1}</span>
               <span className="text-4xl md:text-5xl font-oswald font-bold text-white uppercase tracking-tight">
                 {roadmap.peopleUserCentered.line2} <span className="text-secondary">{roadmap.peopleUserCentered.line3}</span>
               </span>
           </div>

           <p className="text-white/60 max-w-2xl text-lg font-light mb-12">
             {roadmap.peopleUserCentered.description}
           </p>
           
           <Link 
            href="/contact" 
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm overflow-hidden"
           >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">{t("hero.buttons.talkToDiego")}</span>
            <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <RiRocket2Line className="w-4 h-4 relative z-10 group-hover:text-white transition-colors duration-300" />
           </Link>
        </div>

      </div>
    </section>
  )
}
