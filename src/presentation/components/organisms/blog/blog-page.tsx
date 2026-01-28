"use client"

import { motion } from "framer-motion"
import { RiArrowRightLine, RiTimeLine, RiUserLine } from "@remixicon/react"
import { useState } from "react"

const blogPosts = [
  {
    id: 1,
    title: "The Future of Digital Design: Trends to Watch in 2024",
    excerpt: "Exploring the cutting-edge design trends that will shape the digital landscape in the coming year.",
    category: "Design",
    author: "Diego Kelme",
    date: "Dec 15, 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1600&auto=format&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "Building High-Performance Web Applications with Next.js",
    excerpt: "A deep dive into optimizing Next.js applications for maximum performance and user experience.",
    category: "Development",
    author: "Diego Kelme",
    date: "Dec 10, 2024",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    featured: false
  },
  {
    id: 3,
    title: "The Psychology of Color in Brand Identity",
    excerpt: "Understanding how color choices impact brand perception and user behavior.",
    category: "Branding",
    author: "Diego Kelme",
    date: "Dec 5, 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1600&auto=format&fit=crop",
    featured: false
  },
  {
    id: 4,
    title: "Conversion Rate Optimization: Data-Driven Strategies",
    excerpt: "Proven techniques to increase your website's conversion rates through strategic design and testing.",
    category: "Strategy",
    author: "Diego Kelme",
    date: "Nov 28, 2024",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    featured: false
  },
  {
    id: 5,
    title: "Minimalism vs Maximalism: Finding Your Design Voice",
    excerpt: "Exploring the spectrum of design philosophies and how to choose the right approach for your brand.",
    category: "Design",
    author: "Diego Kelme",
    date: "Nov 20, 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop",
    featured: false
  },
  {
    id: 6,
    title: "The Art of Micro-Interactions in Modern UI",
    excerpt: "How subtle animations and interactions can dramatically improve user engagement and satisfaction.",
    category: "UI/UX",
    author: "Diego Kelme",
    date: "Nov 15, 2024",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1600&auto=format&fit=crop",
    featured: false
  }
]

const categories = ["All", "Design", "Development", "Branding", "Strategy", "UI/UX"]

export function BlogV2() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <section className="min-h-screen bg-black relative overflow-hidden pt-32 pb-20">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4"
          >
            Insights & Articles
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-8xl font-bold uppercase leading-[0.9] text-white mb-8"
          >
            Blog<span className="text-accent">.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-secondary text-lg max-w-2xl"
          >
            Insights sobre design, desenvolvimento e estratégia digital. Aprenda com nossa experiência construindo produtos de classe mundial.
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-white/10 pb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 text-sm uppercase tracking-wider font-bold transition-all ${
                selectedCategory === category
                  ? 'bg-white text-black'
                  : 'bg-transparent text-secondary border border-white/20 hover:border-white hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "All" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border border-white/10 overflow-hidden group cursor-pointer">
              <div className="relative aspect-4/3 lg:aspect-auto overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold uppercase px-3 py-1 tracking-widest">
                  Featured
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4">
                  {featuredPost.category}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold uppercase leading-tight mb-4 group-hover:text-gray-300 transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-secondary text-lg mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 text-xs text-secondary uppercase tracking-wider mb-6">
                  <div className="flex items-center gap-2">
                    <RiUserLine className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RiTimeLine className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white font-bold uppercase text-sm tracking-wider group-hover:translate-x-2 transition-transform">
                  Read Article <RiArrowRightLine className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="border border-white/10 overflow-hidden mb-4">
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                </div>
              </div>
              <span className="text-accent text-xs font-bold uppercase tracking-widest block mb-3">
                {post.category}
              </span>
              <h3 className="font-display text-xl font-bold uppercase leading-tight mb-3 group-hover:text-gray-300 transition-colors">
                {post.title}
              </h3>
              <p className="text-secondary text-sm mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-secondary uppercase tracking-wider mb-4">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                Read More <RiArrowRightLine className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-32 border border-white/10 bg-white/5 p-12 text-center">
          <h3 className="font-display text-3xl md:text-4xl font-bold uppercase mb-4">
            Stay Updated<span className="text-accent">.</span>
          </h3>
          <p className="text-secondary mb-8 max-w-xl mx-auto">
            Receba insights exclusivos sobre design, desenvolvimento e estratégia digital diretamente no seu email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="seu@email.com"
              className="flex-1 bg-transparent border border-white/20 px-6 py-3 text-white placeholder:text-secondary focus:outline-none focus:border-white transition-colors"
            />
            <button className="bg-white text-black px-8 py-3 text-sm uppercase tracking-widest font-bold hover:bg-accent hover:text-white transition-all">
              Subscribe
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
