import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowRightUpLine } from 'remixicon';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    client: "Nebula",
    category: "Fintech App",
    year: "2024",
    image: "https://picsum.photos/800/600?random=1",
    color: "#4A4A4A"
  },
  {
    id: 2,
    client: "Ascend",
    category: "E-Commerce",
    year: "2023",
    image: "https://picsum.photos/800/600?random=2",
    color: "#2C3E50"
  },
  {
    id: 3,
    client: "Quantum",
    category: "SaaS Dashboard",
    year: "2024",
    image: "https://picsum.photos/800/600?random=3",
    color: "#8E44AD"
  },
  {
    id: 4,
    client: "Velvet",
    category: "Fashion Brand",
    year: "2023",
    image: "https://picsum.photos/800/600?random=4",
    color: "#C0392B"
  }
];

const Work: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="work" className="py-32 border-b border-white/10 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-4">Selected Work</h2>
            <h3 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none">
              Case Studies<span className="text-secondary">.</span>
            </h3>
          </div>
          <Link to="/work" className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest border-b border-white pb-1 hover:text-gray-300 transition-colors mt-8 md:mt-0">
            View All Projects <RiArrowRightUpLine className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group border-t border-white/10 py-12 relative cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="flex flex-col md:flex-row justify-between items-baseline relative z-10 mix-blend-difference">
                <h4 className="text-3xl md:text-5xl font-display font-bold uppercase mb-2 group-hover:translate-x-4 transition-transform duration-500">
                  {project.client}
                </h4>
                <div className="flex gap-8 text-sm md:text-base uppercase tracking-wider text-secondary group-hover:text-white transition-colors">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
              </div>
              
              {/* Hover Image Reveal for Mobile/Tablet context mostly, heavily styled for desktop via overlay */}
              <AnimatePresence>
                {hoveredProject === project.id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.95, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[200px] md:h-[350px] z-0 pointer-events-none hidden md:block"
                  >
                    <img 
                      src={project.image} 
                      alt={project.client} 
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <div className="border-t border-white/10" />
        </div>
        
        <div className="mt-8 md:hidden">
            <Link to="/work" className="flex items-center gap-2 text-sm uppercase tracking-widest border-b border-white pb-1 w-max">
            View All Projects <RiArrowRightUpLine className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Work;