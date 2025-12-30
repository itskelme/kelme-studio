"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { WorkDetail } from "@/i18n/works/en"
import { RiArrowLeftLine, RiExternalLinkLine } from "@remixicon/react"

interface WorkDetailsProps {
    work: WorkDetail
}

export function WorkDetails({ work }: WorkDetailsProps) {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const titleY = useTransform(scrollYProgress, [0, 0.2], [0, 100])
    const imageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1])
    const contentOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1])

    return (
        <main ref={containerRef} className="bg-black min-h-screen text-white selection:bg-white/20 selection:text-white">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
                <div className="flex justify-between items-center">
                    <Link href="/" className="group flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
                        <RiArrowLeftLine className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Works
                    </Link>
                    <div className="text-sm uppercase tracking-widest font-bold">
                        {work.client}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                <motion.div 
                    style={{ scale: imageScale }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={work.heroImage}
                        alt={work.title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </motion.div>

                <div className="relative z-10 container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        style={{ y: titleY }}
                    >
                        <span className="block text-secondary text-sm md:text-base uppercase tracking-[0.2em] mb-4">
                            {work.category} — {work.year}
                        </span>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter leading-none mb-8">
                            {work.title}
                        </h1>
                    </motion.div>
                </div>

                <motion.div 
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
                >
                    <span className="text-xs uppercase tracking-widest text-white/50">Scroll to Explore</span>
                </motion.div>
            </section>

            {/* Content Section */}
            <motion.div 
                style={{ opacity: contentOpacity }}
                className="relative z-20 bg-black"
            >
                <div className="container mx-auto px-6 py-24 md:py-32">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                        {/* Sidebar */}
                        <div className="md:col-span-4 lg:col-span-3">
                            <div className="sticky top-32 space-y-12">
                                <div>
                                    <h3 className="text-xs uppercase tracking-widest text-white/50 mb-4">Services</h3>
                                    <ul className="space-y-2">
                                        {work.services.map((service, i) => (
                                            <li key={i} className="text-lg md:text-xl font-light">{service}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xs uppercase tracking-widest text-white/50 mb-4">Tech Stack</h3>
                                    <ul className="space-y-2">
                                        {work.stack.map((tech, i) => (
                                            <li key={i} className="text-lg md:text-xl font-light opacity-80">{tech}</li>
                                        ))}
                                    </ul>
                                </div>
                                {work.link && (
                                    <a 
                                        href={work.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm uppercase tracking-widest font-bold hover:bg-gray-200 transition-colors"
                                    >
                                        Visit Website
                                        <RiExternalLinkLine className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-8 lg:col-span-9 space-y-32">
                            {/* Overview */}
                            <div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-12">
                                    {work.description}
                                </h2>
                                <div className="grid md:grid-cols-2 gap-12 text-white/80 leading-relaxed md:text-lg">
                                    <div className="space-y-4">
                                        <h3 className="text-white text-xl font-medium">The Challenge</h3>
                                        <p>{work.challenge}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-white text-xl font-medium">The Solution</h3>
                                        <p>{work.solution}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Image Masonry/Grid */}
                            <div className="space-y-8 md:space-y-16">
                                {work.images.map((img, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-10%" }}
                                        transition={{ duration: 0.8 }}
                                        className={`relative w-full ${img.colSpan === 2 ? 'aspect-video' : 'aspect-square md:aspect-[4/3]'}`}
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="border-t border-white/10 py-32 text-center">
                    <p className="text-white/50 uppercase tracking-widest text-sm mb-6">Next Project</p>
                    <Link href="/work" className="inline-block group">
                         {/* Logic to find next project could be added here, pointing to home for now as per simple nav requirement */}
                        <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter group-hover:text-white/70 transition-colors">
                            View All Works
                        </h2>
                    </Link>
                </div>
            </motion.div>
        </main>
    )
}
