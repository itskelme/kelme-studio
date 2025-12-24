import React from 'react';
import { motion } from 'framer-motion';
import ColorBends from './ColorBends';
import { RiArrowRightLine } from 'remixicon';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* 3D Background - Layer 0 */}
      <ColorBends
        className="absolute inset-0 z-0 w-full h-full"
        colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
        rotation={30}
        speed={0.3}
        scale={1.2}
        frequency={1.4}
        warpStrength={1.2}
        mouseInfluence={0.8}
        parallax={0.6}
        noise={0.08}
        transparent
      />

      {/* Gradient Overlay - Layer 1 - Essential for text contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-transparent to-black/80 pointer-events-none" />

      {/* Content - Layer 10 */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center text-center h-full pointer-events-none">
        <div className="flex flex-col items-center justify-center">
          

            <motion.h1
            className="font-display text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.9] mb-8 mix-blend-difference text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
            Kelme<br />Studio
            </motion.h1>

            <motion.p
            className="max-w-md text-secondary text-sm md:text-base leading-relaxed mb-10 mix-blend-difference"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            >
            We craft insane digital experiences for ambitious brands.
            No fluff, just high-converting design and engineering.
            </motion.p>

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pointer-events-auto"
            >
            <Link
                to="/contact"
                className="group relative px-8 py-4 bg-white text-black text-sm uppercase tracking-widest font-bold overflow-hidden rounded-none hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
                <span>Start Project</span>
                <RiArrowRightLine className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
                to="/work"
                className="px-8 py-4 border border-white/20 bg-black/50 backdrop-blur-sm text-white text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-all rounded-none flex items-center justify-center"
            >
                View Work
            </Link>
            </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden md:block z-10 mix-blend-difference pointer-events-none">
        <p className="text-xs text-white uppercase tracking-widest rotate-90 origin-right">Scroll to explore</p>
      </div>
    </section>
  );
};

export default Hero;