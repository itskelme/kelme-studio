"use client"

import { useState, useEffect, useRef } from "react"
import { useMessages } from 'next-intl'
import { ExternalLink, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Registrar plugins do GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Work() {
  const messages: any = useMessages()
  const portfolioItems: any[] = messages.work.items
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  // Extract unique categories from portfolio items
  const categories = ["all", ...new Set(portfolioItems.map(item => item.category.toLowerCase()))]

  // Filter items based on active category
  const filteredItems = activeFilter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category.toLowerCase() === activeFilter.toLowerCase())

  // Get tag information based on category
  // Esta função não está sendo utilizada agora que usamos o estilo dourado da marca
  const getTagInfo = (category: string) => {
    return { bg: "bg-[#27D182]/20", text: "text-[#27D182]" }
  }
  
  // Configurar animações GSAP quando o componente montar
  useEffect(() => {
    // Título e subtítulo com fade in para cima
    gsap.fromTo(
      [titleRef.current, subtitleRef.current],
      { 
        opacity: 0, 
        y: 30 
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        }
      }
    );
    
    // Filtros com stagger
    if (filtersRef.current) {
      gsap.fromTo(
        Array.from(filtersRef.current.children),
        { 
          opacity: 0, 
          y: 20 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: filtersRef.current,
            start: "top 80%",
          }
        }
      );
    }
    
    // Projetos com stagger
    if (projectsRef.current) {
      gsap.fromTo(
        Array.from(projectsRef.current.children),
        { 
          opacity: 0, 
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
          }
        }
      );
    }
    
    // Botão com fade in
    gsap.fromTo(
      buttonRef.current,
      { 
        opacity: 0, 
        y: 20 
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 90%",
        }
      }
    );
  }, []);

  // Quando o filtro muda, animamos os novos itens
  useEffect(() => {
    if (projectsRef.current) {
      // Primeiro ocultamos todos os elementos
      gsap.set(Array.from(projectsRef.current.children), { 
        opacity: 0,
        y: 30 
      });
      
      // Em seguida, animamos para que apareçam
      gsap.to(Array.from(projectsRef.current.children), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  }, [activeFilter]);

  return (
    <section ref={sectionRef} className="py-32 px-6 lg:px-12 bg-[#0F0E0D]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 ref={titleRef} className="text-4xl lg:text-5xl text-[#F7F7F7] mb-6">
            {messages.work.sectionTitle}
          </h2>
          <p ref={subtitleRef} className="text-lg text-[#F7F7F7]/60 max-w-2xl font-satoshi">{messages.work.sectionSubtitle}</p>
        </div>

        {/* Filter categories */}
        <div ref={filtersRef} className="mb-12 flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === category 
                  ? "bg-[#27D182] text-[#0F0E0D]" 
                  : "bg-[#F7F7F7]/10 text-[#F7F7F7] hover:bg-[#F7F7F7]/20"
              }`}
            >
              {category === "all" ? "Explorar todos" : category}
              {category === "all" && <span className="ml-1">ᵏ</span>}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div ref={projectsRef} className="grid md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden bg-[#F7F7F7]/5 hover:bg-[#F7F7F7]/10 transition-all duration-300 cursor-pointer rounded-xl"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative h-[300px] overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D]/80 via-transparent to-transparent" />
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
            </div>
          ))}
        </div>

        <div ref={buttonRef} className="text-center mt-16">
          <Button className="inline-flex items-center gap-2">
            {messages.work.viewButton}
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
