import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RiArrowRightLine } from 'remixicon';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    client: "Nebula Protocol",
    title: "DeFi Trading Interface",
    category: "Fintech / Web3",
    year: "2024",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1600&auto=format&fit=crop",
    description: "Redefining how users interact with decentralized liquidity pools through a seamless, zero-latency interface."
  },
  {
    id: 2,
    client: "Velvet Maison",
    title: "Global E-Commerce Rebrand",
    category: "Fashion",
    year: "2023",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop",
    description: "A digital flagship store that merges editorial storytelling with high-conversion checkout flows."
  },
  {
    id: 3,
    client: "Hyperion",
    title: "AI Analytics Dashboard",
    category: "SaaS",
    year: "2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    description: "Visualizing complex datasets for enterprise AI models. Dark mode native, performance obsessed."
  },
  {
    id: 4,
    client: "Off-White Architects",
    title: "Portfolio & Immersion",
    category: "Architecture",
    year: "2023",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1600&auto=format&fit=crop",
    description: "Minimalist brutalism. We let the structures speak for themselves with a silent, heavy digital presence."
  },
  {
    id: 5,
    client: "Kinetix",
    title: "Fitness App Ecosystem",
    category: "Mobile App",
    year: "2024",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop",
    description: "Gamified fitness tracking with real-time bio-feedback visualizations."
  },
  {
    id: 6,
    client: "Carbon",
    title: "Sustainability Report",
    category: "Corporate",
    year: "2023",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    description: "Interactive WebGL experience showcasing global carbon footprint reduction initiatives."
  }
];

const ProjectCard: React.FC<{ project: typeof projects[0]; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index % 2 === 0 ? 0 : 0.2 }}
      className={`group relative mb-24 ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
    >
      {/* Image Container with Overflow Hidden for Zoom Effect */}
      <div className="relative aspect-[4/3] overflow-hidden mb-8 border border-white/10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
        </motion.div>
        
        {/* Floating ID */}
        <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 font-display font-bold text-xl border-b border-r border-white/10 z-10">
          0{project.id}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
           <span className="text-[#C0392B] text-xs font-bold uppercase tracking-widest">
            {project.client}
          </span>
          <span className="text-secondary text-xs font-bold uppercase tracking-widest">
            {project.year}
          </span>
        </div>
       
        <h3 className="text-3xl md:text-5xl font-display font-bold uppercase leading-none mb-4 group-hover:text-white transition-colors text-gray-200">
          {project.title}
        </h3>
        <p className="text-secondary text-sm leading-relaxed max-w-md mb-6 group-hover:text-white transition-colors">
          {project.description}
        </p>

        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white group-hover:translate-x-2 transition-transform duration-300">
          View Case Study <RiArrowRightLine className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};

const Work: React.FC = () => {
  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 pt-40 pb-20">
        
        {/* Header */}
        <div className="mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
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
              <div className="w-12 h-[1px] bg-[#C0392B]"></div>
              <span className="text-[#C0392B] text-xs font-bold uppercase tracking-[0.2em]">Our Portfolio</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-6xl md:text-8xl font-bold uppercase leading-[0.9] text-white mb-8"
            >
              Digital <br />
              Architecture<span className="text-[#C0392B]">.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-secondary text-lg max-w-xl leading-relaxed"
            >
              A curation of our most ambitious projects. We build digital products that refuse to be ignored.
            </motion.p>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 border-t border-white/10 pt-24 text-center">
            <h3 className="font-display text-4xl md:text-6xl font-bold uppercase mb-8">
                Ready to build <br /> something <span className="text-white">Iconic?</span>
            </h3>
            <Link 
                to="/contact" 
                className="inline-block bg-white text-black px-12 py-5 text-sm uppercase tracking-widest font-bold hover:bg-gray-200 transition-colors"
            >
                Start Project
            </Link>
        </div>

      </div>
    </section>
  );
};

export default Work;