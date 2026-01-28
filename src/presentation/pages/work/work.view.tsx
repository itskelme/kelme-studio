"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { RiArrowRightLine } from "@remixicon/react"
import type { WorkPageProps } from "./work.types"

const ProjectCard = ({ project, index }: { project: WorkPageProps["projects"][0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index % 2 === 0 ? 0 : 0.2 }}
      className={`group relative mb-24 ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
    >
      <Link href={`/work/${project.slug}`} className="block">
        <div className="relative aspect-4/3 overflow-hidden mb-8 border border-white/10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
          </motion.div>
          
          <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 font-bold text-xl border-b border-r border-white/10 z-10">
            0{project.id}
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
            <span className="text-accent text-xs font-bold uppercase tracking-widest">
              {project.client}
            </span>
            <span className="text-secondary text-xs font-bold uppercase tracking-widest">
              {project.category}
            </span>
          </div>
        
          <h3 className="text-3xl md:text-5xl font-bold uppercase leading-none mb-4 group-hover:text-white transition-colors text-gray-200">
            {project.title}
          </h3>
          <p className="text-secondary text-sm leading-relaxed max-w-md mb-6 group-hover:text-white transition-colors">
            {project.description}
          </p>

          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white group-hover:translate-x-2 transition-transform duration-300">
            View Case Study <RiArrowRightLine className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function WorkPageView({ projects, messages }: WorkPageProps & { messages: any }) {
  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 pt-40 pb-20">
        
        <div className="mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-[15vw] leading-[0.8] font-bold uppercase text-white mix-blend-difference opacity-20 select-none absolute top-20 left-0 w-full text-center pointer-events-none"
          >
            Selected
          </motion.h1>
          
          <div className="relative z-10 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-px bg-accent" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">
                {messages.sectionLabel}
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-6xl md:text-8xl font-bold uppercase leading-[0.9] text-white mb-8"
            >
              {messages.sectionTitle}
              <span className="text-accent">.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-secondary text-lg max-w-xl leading-relaxed"
            >
              {messages.sectionSubtitle}
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-32 border-t border-white/10 pt-24 text-center">
          <h3 className="font-display text-4xl md:text-6xl font-bold uppercase mb-8">
            Ready to build <br /> something <span className="text-white">Iconic?</span>
          </h3>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-black px-12 py-5 text-sm uppercase tracking-widest font-bold hover:bg-gray-200 transition-colors"
          >
            Start Project
          </Link>
        </div>

      </div>
    </section>
  )
}
