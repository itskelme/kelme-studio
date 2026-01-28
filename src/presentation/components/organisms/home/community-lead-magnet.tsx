"use client"

import { motion } from "framer-motion"
import { RiDiscordFill, RiArrowRightLine, RiLock2Line } from "@remixicon/react"
import { useMessages } from "next-intl"

export function CommunityLeadMagnet() {
  const messages: any = useMessages()
  
  if (!messages?.community) {
    return null
  }
  
  const community = messages.community

  return (
    <section className="relative py-24 bg-black border-t border-b border-white/10 overflow-hidden">
      {/* Background abstract element */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#5865F2] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 bg-white/5 border border-white/10 p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden group">
          
          {/* Decorative "Exclusive" Tag */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 sm:gap-2 text-accent text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            <RiLock2Line className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{community.badge}</span>
          </div>

          <div className="w-full lg:w-7/12 mt-8 sm:mt-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-[#5865F2] font-bold tracking-widest uppercase mb-3 sm:mb-4 text-xs sm:text-sm">
                {community.label}
              </h3>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.9] text-white mb-4 sm:mb-6 pr-16 sm:pr-0">
                {community.title.split(" ").slice(0, 2).join(" ")} <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">
                  {community.title.split(" ").slice(2).join(" ")}
                </span>
              </h2>
              <p className="text-secondary text-base sm:text-lg mb-6 sm:mb-8 max-w-xl leading-relaxed">
                {community.description}
                <span className="text-white block mt-3 sm:mt-4 font-medium text-sm sm:text-base">{community.warning}</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a 
                  href="https://discord.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 sm:gap-3 group/btn"
                >
                  <RiDiscordFill className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{community.joinDiscord}</span>
                  <RiArrowRightLine className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
                <div className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border border-white/10 bg-black/20 text-[10px] sm:text-xs uppercase tracking-wider text-secondary">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="whitespace-nowrap">1,204 {community.membersOnline}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side Visual - Abstract Discord/Community Representation */}
          <motion.div 
            className="w-full lg:w-5/12 relative hidden sm:block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-square border border-white/10 bg-black/40 p-4 sm:p-6 flex flex-col justify-end">
              {/* Mock Chat Interface */}
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-white/5 p-2 sm:p-3 border-l-2 border-[#5865F2] max-w-[90%]">
                  <p className="text-[9px] sm:text-[10px] text-[#5865F2] font-bold uppercase mb-1">
                    Diego Kelme <span className="text-white/30 text-[7px] sm:text-[8px] ml-1 sm:ml-2">TECH LEAD</span>
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-300 leading-tight">
                    Just dropped the new agency pricing framework in #resources. Let me know what you think.
                  </p>
                </div>
                <div className="bg-white/5 p-2 sm:p-3 border-l-2 border-green-500 max-w-[80%] ml-auto">
                  <p className="text-[9px] sm:text-[10px] text-green-500 font-bold uppercase mb-1">
                    Member <span className="text-white/30 text-[7px] sm:text-[8px] ml-1 sm:ml-2">PRO</span>
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-300 leading-tight">
                    This is exactly what I was stuck on. The value here is insane.
                  </p>
                </div>
                <div className="bg-white/5 p-2 sm:p-3 border-l-2 border-accent max-w-[85%]">
                  <p className="text-[9px] sm:text-[10px] text-accent font-bold uppercase mb-1">
                    System <span className="text-white/30 text-[7px] sm:text-[8px] ml-1 sm:ml-2">BOT</span>
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-300 leading-tight">
                    New case study unlocked: "How we scaled to $50k/mo in 90 days".
                  </p>
                </div>
              </div>

              {/* Overlay Glitch Effect */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
