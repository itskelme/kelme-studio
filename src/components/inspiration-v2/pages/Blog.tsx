import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowRightUpLine, RiTimeLine } from 'remixicon';

const articles = [
  {
    id: 1,
    title: "The Death of the Landing Page",
    category: "Strategy",
    date: "OCT 12, 2024",
    readTime: "5 min read",
    excerpt: "Why traditional funnels are failing and what 'ecosystem marketing' actually means for high-ticket sales.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Minimalism is a Revenue Strategy",
    category: "Design",
    date: "SEP 28, 2024",
    readTime: "4 min read",
    excerpt: "Removing friction isn't just aesthetic. It's the highest ROI activity you can do for your checkout flow.",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Scaling Next.js on the Edge",
    category: "Engineering",
    date: "SEP 15, 2024",
    readTime: "8 min read",
    excerpt: "Technical deep dive into how we reduced TTI by 400ms for our largest fintech client using Vercel Middleware.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Authority Anchoring in VSLs",
    category: "Copywriting",
    date: "AUG 30, 2024",
    readTime: "6 min read",
    excerpt: "The exact script structure Jon Benson used to generate millions, adapted for the 2024 attention economy.",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Three.js Performance for Production",
    category: "Engineering",
    date: "AUG 12, 2024",
    readTime: "10 min read",
    excerpt: "How to implement high-end WebGL visuals without tanking your Lighthouse score or Google rankings.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
  }
];

const Blog: React.FC = () => {
  const [hoveredArticle, setHoveredArticle] = useState<number | null>(null);

  return (
    <section className="min-h-screen pt-40 pb-32 bg-background relative overflow-hidden">
      {/* Background Noise/Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C0392B] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[#C0392B] mb-4"
          >
            The Archive
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-8xl font-bold uppercase leading-[0.9] text-white"
          >
            Transmissions<span className="text-secondary">.</span>
          </motion.h1>
        </div>

        {/* Article List */}
        <div className="flex flex-col">
          <div className="border-t border-white/10" />
          
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="group relative border-b border-white/10 py-12 cursor-pointer"
              onMouseEnter={() => setHoveredArticle(article.id)}
              onMouseLeave={() => setHoveredArticle(null)}
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-8 relative z-10 mix-blend-difference">
                
                {/* Left: Meta */}
                <div className="w-full md:w-3/12 flex flex-row md:flex-col justify-between md:justify-start gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C0392B]">
                    {article.category}
                  </span>
                  <span className="text-xs text-secondary uppercase tracking-wider flex items-center gap-2">
                     {article.date} <span className="w-1 h-1 bg-white/20 rounded-full" /> {article.readTime}
                  </span>
                </div>

                {/* Center: Title & Excerpt */}
                <div className="w-full md:w-6/12">
                  <h3 className="text-3xl md:text-5xl font-display font-bold uppercase mb-4 text-white group-hover:text-gray-300 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-secondary text-sm md:text-base leading-relaxed max-w-md group-hover:text-white transition-colors">
                    {article.excerpt}
                  </p>
                </div>

                {/* Right: Icon */}
                <div className="w-full md:w-3/12 flex justify-end items-center">
                  <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <RiArrowRightUpLine className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Hover Image Reveal */}
              <AnimatePresence>
                {hoveredArticle === article.id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -20, rotate: 2 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[400px] h-[250px] z-0 pointer-events-none hidden lg:block overflow-hidden border border-white/10"
                  >
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                    <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>

        {/* Load More / End */}
        <div className="mt-20 text-center">
          <p className="text-secondary text-sm uppercase tracking-widest">End of transmission</p>
        </div>

      </div>
    </section>
  );
};

export default Blog;