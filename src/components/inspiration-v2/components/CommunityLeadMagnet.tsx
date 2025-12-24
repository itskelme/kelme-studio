import React from 'react';
import { motion } from 'framer-motion';
import { RiDiscordFill, RiArrowRightLine, RiLock2Line } from 'remixicon';

const CommunityLeadMagnet: React.FC = () => {
  return (
    <section className="relative py-24 bg-black border-t border-b border-white/10 overflow-hidden">
      {/* Background abstract element */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#5865F2] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-white/5 border border-white/10 p-8 md:p-16 relative overflow-hidden group">
          
          {/* Decorative "Exclusive" Tag */}
          <div className="absolute top-6 right-6 flex items-center gap-2 text-[#C0392B] text-xs font-bold uppercase tracking-widest">
            <RiLock2Line className="w-4 h-4" />
            <span>Invite Only</span>
          </div>

          <div className="w-full lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-[#5865F2] font-bold tracking-widest uppercase mb-4 text-sm">
                Join the Movement
              </h3>
              <h2 className="font-display text-4xl md:text-6xl font-bold uppercase leading-[0.9] text-white mb-6">
                Watch Us Build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                  In Public.
                </span>
              </h2>
              <p className="text-secondary text-lg mb-8 max-w-xl leading-relaxed">
                Stop guessing. Get direct access to our internal SOPs, design critiques, and the exact strategies we use to scale 7-figure agencies. 
                <span className="text-white block mt-4 font-medium">Warning: This is not for lurkers. Builders only.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://discord.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-4 text-sm uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-3 group/btn"
                >
                  <RiDiscordFill className="w-5 h-5" />
                  <span>Join Discord Community</span>
                  <RiArrowRightLine className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
                <div className="flex items-center gap-2 px-6 py-4 border border-white/10 bg-black/20 text-xs uppercase tracking-wider text-secondary">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  1,204 Members Online
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side Visual - Abstract Discord/Community Representation */}
          <motion.div 
            className="w-full lg:w-5/12 relative hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-square border border-white/10 bg-black/40 p-6 flex flex-col justify-end">
              {/* Mock Chat Interface */}
              <div className="space-y-4">
                <div className="bg-white/5 p-3 border-l-2 border-[#5865F2] max-w-[90%]">
                  <p className="text-[10px] text-[#5865F2] font-bold uppercase mb-1">Diego Kelme <span className="text-white/30 text-[8px] ml-2">TECH LEAD</span></p>
                  <p className="text-xs text-gray-300">Just dropped the new agency pricing framework in #resources. Let me know what you think.</p>
                </div>
                <div className="bg-white/5 p-3 border-l-2 border-green-500 max-w-[80%] ml-auto">
                  <p className="text-[10px] text-green-500 font-bold uppercase mb-1">Member <span className="text-white/30 text-[8px] ml-2">PRO</span></p>
                  <p className="text-xs text-gray-300">This is exactly what I was stuck on. The value here is insane.</p>
                </div>
                <div className="bg-white/5 p-3 border-l-2 border-[#C0392B] max-w-[85%]">
                  <p className="text-[10px] text-[#C0392B] font-bold uppercase mb-1">System <span className="text-white/30 text-[8px] ml-2">BOT</span></p>
                  <p className="text-xs text-gray-300">New case study unlocked: "How we scaled to $50k/mo in 90 days".</p>
                </div>
              </div>

              {/* Overlay Glitch Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunityLeadMagnet;