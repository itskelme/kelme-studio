import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-32 bg-background overflow-hidden border-b border-white/10">
      {/* Background Typography - Anchoring Authority */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-20 select-none pointer-events-none z-0">
        <motion.span 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-display font-bold text-[25vw] leading-none text-white/[0.02] uppercase whitespace-nowrap"
        >
          Tech Lead
        </motion.span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          
          {/* Left Column: Image with Benson-style accents */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-5/12 relative group"
          >
            {/* The Image - Grayscale & High Contrast */}
            <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
              {/* Note: Replace src with local 'Photo-export' asset */}
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop" 
                alt="Diego Kelme" 
                className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>

            {/* Corner Brackets - Signature VSL Style */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-white/20 transition-all duration-500 group-hover:border-white/40 group-hover:-top-4 group-hover:-left-4" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-white/20 transition-all duration-500 group-hover:border-white/40 group-hover:-bottom-4 group-hover:-right-4" />
          </motion.div>

          {/* Right Column: Copy */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-7/12 relative"
          >
            {/* Red Accent Bracket Top-Right of Text Block */}
            <div className="absolute -top-12 right-0 w-20 h-20 border-t-4 border-r-4 border-[#C0392B] opacity-80 hidden md:block" />

            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase leading-[0.9] mb-8">
              Hi, I'm <span className="text-[#C0392B]">Diego Kelme.</span>
            </h2>

            <div className="space-y-6 text-secondary text-lg md:text-xl font-light leading-relaxed">
              <p>
                If you've navigated the digital landscapes of <span className="text-white font-medium">Orlando</span>, <span className="text-white font-medium">Porto</span>, or <span className="text-white font-medium">Florianópolis</span>, you've likely seen my work... even if you didn't know it was me.
              </p>

              <p>
                I'm the guy big brands call when "good enough" stops converting.
              </p>

              <p>
                While I'm notably known as the <strong>Tech Lead</strong> who simplifies the complex...
              </p>

              <p>
                I'm also the leader of a <span className="text-white border-b border-white/30 pb-0.5">complete elite squad</span>. We are a team of senior designers and developers who move faster than agencies ten times our size.
              </p>

              <div className="py-6 my-6 border-l-2 border-[#C0392B] pl-8 bg-white/5">
                <p className="text-white italic text-xl font-serif">
                  "I know that sounds bold. But in a world of templates and AI-generated noise, <span className="underline decoration-[#C0392B] underline-offset-4 decoration-2">authority</span> is the only currency that matters."
                </p>
              </div>

              <p>
                My real journey began with a single obsession: How do we merge perfect code with perfect design to build not just websites, but revenue engines?
              </p>

              <div className="pt-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-3">Here is the answer:</p>
                <a href="#work" className="inline-block bg-[#C0392B] text-white px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-red-700 transition-colors">
                  See Our Results
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;