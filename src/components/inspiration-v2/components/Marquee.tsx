import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  "NEXTFLIX", "VERCEL", "ACME CORP", "STARK", "WAYNE ENT", "CYBERDYNE", 
  "UMBRELLA", "MASSIVE", "Hooli", "PIED PIPER", "E CORP"
];

const Marquee: React.FC = () => {
  return (
    <div className="w-full py-12 border-b border-white/10 bg-black overflow-hidden flex relative z-10">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
      >
        {[...brands, ...brands, ...brands].map((brand, index) => (
          <div key={index} className="mx-8 flex items-center justify-center">
            <span className="text-2xl md:text-4xl font-display font-bold text-white/20 uppercase tracking-tighter hover:text-white transition-colors duration-500 cursor-default">
              {brand}
            </span>
          </div>
        ))}
      </motion.div>
      
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />
    </div>
  );
};

export default Marquee;