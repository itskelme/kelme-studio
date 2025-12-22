"use client"

import { useState, useRef } from "react"
import { useMessages } from 'next-intl'
import { ExternalLink, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui"
import { motion, useInView } from "framer-motion"

export function Work() {
  const messages: any = useMessages()
  const portfolioItems: any[] = messages.work.items
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Extract unique categories from portfolio items
  const categories = ["all", ...new Set(portfolioItems.map(item => item.category.toLowerCase()))]

  // Filter items based on active category
  const filteredItems = activeFilter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category.toLowerCase() === activeFilter.toLowerCase())

  return (
    <section ref={sectionRef} className="py-32 px-6 lg:px-12 bg-[#0F0E0D]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <motion.h2 
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl lg:text-5xl text-[#F7F7F7] mb-6"
          >
            {messages.work.sectionTitle}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-[#F7F7F7]/60 max-w-2xl font-satoshi"
          >
            {messages.work.sectionSubtitle}
          </motion.p>
        </div>

        {/* Filter categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 flex flex-wrap gap-4"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === category 
                  ? "bg-[#27D182] text-[#0F0E0D]" 
                  : "bg-[#F7F7F7]/10 text-[#F7F7F7] hover:bg-[#F7F7F7]/20"
              }`}
            >
              {category === "all" ? "Explorar todos" : category}
              {category === "all" && <span className="ml-1">ᵏ</span>}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${activeFilter}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden bg-[#F7F7F7]/5 hover:bg-[#F7F7F7]/10 transition-all duration-300 cursor-pointer rounded-xl"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative h-[300px] overflow-hidden">
                <Image
                  src={item.image || "/images/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0F0E0D]/80 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                {/* Client name with location */}
                <div className="mb-2">
                  <span className="text-sm font-semibold text-[#27D182]">
                    {item.clientName || "Kelme Studio"}
                  </span>
                </div>
                
                {/* Project title */}
                <h3 className="text-xl font-semibold text-[#F7F7F7] mb-2 font-satoshi">
                  {item.title}
                </h3>
                
                <p className="text-[#F7F7F7]/60 font-satoshi leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {/* Main category tag */}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#27D182]/20 text-[#27D182]">
                    {item.category}
                  </span>
                  
                  {/* Additional tags */}
                  {item.tags && item.tags.map((tag: string, index: number) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F7F7F7]/10 text-[#F7F7F7]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Hover action button */}
              <div
                className={`absolute bottom-6 right-6 transition-all duration-300 ${
                  hoveredItem === item.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
              >
                <div className="w-10 h-10 bg-[#27D182] rounded-full flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-[#0F0E0D]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button className="inline-flex items-center gap-2">
            {messages.work.viewButton}
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
