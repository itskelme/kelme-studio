"use client"

import { useState } from "react"
import { useMessages } from 'next-intl'
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "@/i18n/navigation"
import Image from "next/image"

export function Work() {
  const messages: any = useMessages()
  const portfolioItems: any[] = messages.work.items
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <section id="work" className="py-32 border-b border-white/10 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div>
            <p className="text-label text-secondary mb-4">
              {messages.work.label || "Selected Work"}
            </p>
            <h2>
              {messages.work.sectionTitle}<span className="text-secondary">.</span>
            </h2>
          </div>
          <Link 
            href="/work" 
            className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest border-b border-white pb-1 hover:text-gray-300 transition-colors mt-8 md:mt-0"
          >
            {messages.work.viewButton || "View All Projects"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col">
          {portfolioItems.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group border-t border-white/10 py-8 md:py-12 relative cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="flex flex-col md:flex-row justify-between items-baseline relative z-10 md:mix-blend-difference">
                <h3 className="mb-2 md:mb-0 md:group-hover:translate-x-4 transition-transform duration-500">
                  {project.title}
                </h3>
                <div className="flex gap-8 text-sm md:text-base uppercase tracking-wider text-secondary md:group-hover:text-white transition-colors">
                  <span>{project.category}</span>
                  <span>{project.year || "2024"}</span>
                </div>
              </div>
              
              {/* Mobile: Always show image */}
              <div className="md:hidden mt-6 relative w-full h-[200px] overflow-hidden rounded-none">
                <Image 
                  src={project.image || "/images/placeholder.svg"} 
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Desktop: Hover image */}
              <AnimatePresence>
                {hoveredProject === project.id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.95, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] z-0 pointer-events-none hidden md:block"
                  >
                    <Image 
                      src={project.image || "/images/placeholder.svg"} 
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <div className="border-t border-white/10" />
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
        
        <div className="mt-8 md:hidden">
          <Link 
            href="/work" 
            className="flex items-center gap-2 text-sm uppercase tracking-widest border-b border-white pb-1 w-max"
          >
            {messages.work.viewButton || "View All Projects"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
