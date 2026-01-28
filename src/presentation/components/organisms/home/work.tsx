"use client"

import { useState, useCallback, useEffect } from "react"
import { useMessages } from 'next-intl'
import { motion } from "framer-motion"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import useEmblaCarousel from 'embla-carousel-react'
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react"

interface Project {
  id: number
  slug: string
  title: string
  category: string
  image: string
  description?: string
}

// Project Card Component
function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="block group">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative overflow-hidden bg-white/5 border border-white/10 hover:border-accent/50 transition-colors duration-300"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image 
            src={project.image || "/images/placeholder.svg"} 
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <span className="absolute top-4 left-4 text-[10px] sm:text-xs uppercase tracking-widest font-bold text-accent bg-black/50 backdrop-blur-sm px-3 py-1 border border-accent/30">
            {project.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold uppercase leading-tight text-white group-hover:text-accent transition-colors duration-300 mb-2">
            {project.title}
          </h3>
          
          {project.description && (
            <p className="text-secondary text-sm line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          )}
          
          {/* View Project Link */}
          <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white/70 group-hover:text-accent transition-colors">
            <span>View Project</span>
            <RiArrowRightLine className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

// Carousel Navigation Button
function CarouselButton({ 
  direction, 
  onClick, 
  disabled 
}: { 
  direction: 'prev' | 'next'
  onClick: () => void
  disabled: boolean 
}) {
  const Icon = direction === 'prev' ? RiArrowLeftLine : RiArrowRightLine
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center
        border border-white/20 hover:border-accent hover:bg-accent
        text-white transition-all duration-300
        disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:bg-transparent disabled:cursor-not-allowed
      `}
    >
      <Icon className="w-5 h-5" />
    </button>
  )
}

// Dot Indicator
function DotIndicator({ 
  count, 
  selected, 
  onSelect 
}: { 
  count: number
  selected: number
  onSelect: (index: number) => void 
}) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`
            h-1.5 rounded-full transition-all duration-300
            ${selected === index 
              ? 'w-8 bg-accent' 
              : 'w-2 bg-white/30 hover:bg-white/50'
            }
          `}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}

export function Work() {
  const messages: any = useMessages()
  const portfolioItems: Project[] = messages.work.items

  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    loop: true,
    skipSnaps: false,
    dragFree: false
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section id="work" className="py-24 sm:py-32 border-b border-white/10 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-label text-secondary mb-4"
            >
              {messages.work.label || "Selected Work"}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {messages.work.sectionTitle}<span className="text-secondary">.</span>
            </motion.h2>
          </div>
          
          {/* Desktop Navigation */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden lg:flex items-center gap-4 mt-8 lg:mt-0"
          >
            <CarouselButton direction="prev" onClick={scrollPrev} disabled={!canScrollPrev} />
            <CarouselButton direction="next" onClick={scrollNext} disabled={!canScrollNext} />
            <Link 
              href="/work" 
              className="ml-4 flex items-center gap-2 text-sm uppercase tracking-widest border-b border-white/50 pb-1 hover:text-accent hover:border-accent transition-colors"
            >
              {messages.work.viewButton || "View All Projects"}
              <RiArrowRightLine className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden"
          ref={emblaRef}
        >
          <div className="flex gap-4 sm:gap-6">
            {portfolioItems.map((project) => (
              <div 
                key={project.id} 
                className="flex-none w-[85%] sm:w-[45%] lg:w-[30%]"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile Navigation & Dots */}
        <div className="mt-8 flex flex-col items-center gap-6 lg:hidden">
          <DotIndicator 
            count={portfolioItems.length} 
            selected={selectedIndex} 
            onSelect={scrollTo} 
          />
          
          <div className="flex items-center gap-4">
            <CarouselButton direction="prev" onClick={scrollPrev} disabled={!canScrollPrev} />
            <CarouselButton direction="next" onClick={scrollNext} disabled={!canScrollNext} />
          </div>
          
          <Link 
            href="/work" 
            className="flex items-center gap-2 text-sm uppercase tracking-widest border-b border-white/50 pb-1 hover:text-accent hover:border-accent transition-colors"
          >
            {messages.work.viewButton || "View All Projects"}
            <RiArrowRightLine className="w-4 h-4" />
          </Link>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 sm:mt-24 text-center"
        >
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors"
          >
            {messages.hero.buttons?.talkToDiego || "Start Project"}
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
