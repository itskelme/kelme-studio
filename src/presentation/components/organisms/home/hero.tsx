"use client";

import { useTranslations, useMessages } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Hyperspeed, hyperspeedPresets } from "@/presentation/components/atoms/hyperspeed";
import { useState, useEffect } from "react";

// Smooth cycling text animation (same as SEO section)
function CyclingText({ words, className }: { words: string[]; className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 300);
    }, 3000);
    
    return () => clearInterval(cycleInterval);
  }, [words.length]);
  
  return (
    <span 
      className={`inline-block transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${className}`}
    >
      {words[currentIndex]}
    </span>
  );
}

export function Hero() {
	const t = useTranslations();
	const messages: any = useMessages();

	return (
		<section className="relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-black">
			{/* 3D Background - Hyperspeed Effect */}
			<div className="absolute inset-0 w-screen h-screen">
				<Hyperspeed effectOptions={hyperspeedPresets.one} />
			</div>

			{/* Gradient Overlay - Layer 1 */}


			{/* Content - Layer 10 */}
			<div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center text-center h-full pointer-events-none">
				<div className="flex flex-col items-center justify-center">
					<motion.h1
						className="font-oswald text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.9] mb-8 mix-blend-difference text-white"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
					>
						{t("hero.title.line1")}<br />
						<div className="block mt-2 min-h-[1.2em]">
							<CyclingText 
								words={messages.hero.title.typewriter_options} 
								className="typewriter-glow font-bold"
							/>
						</div>
					</motion.h1>

					<motion.p
						className="max-w-md text-secondary text-sm md:text-base leading-relaxed mb-10 mix-blend-difference"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
					>
						{t("hero.subtitle")}
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 }}
						className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pointer-events-auto"
					>
						<Link
							href="/contact"
							className="group relative px-8 py-4 bg-white text-black text-sm uppercase tracking-widest font-bold overflow-hidden rounded-none hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
						>
							<span>{t("hero.buttons.talkToDiego")}</span>
							<svg
								className="w-4 h-4 transition-transform group-hover:translate-x-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</Link>
						<Link
							href="/#work"
							className="px-8 py-4 border border-white/20 bg-black/50 backdrop-blur-sm text-white text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-all rounded-none flex items-center justify-center"
						>
							{t("hero.buttons.viewWork")}
						</Link>
					</motion.div>
				</div>
			</div>

			{/* Animated Scroll to Explore */}
		<motion.div 
			className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 z-10 pointer-events-none"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 1.2, duration: 0.8 }}
		>
			<span className="scroll-shimmer text-xs text-white uppercase tracking-[0.3em] font-medium">
				{t("hero.scrollToExplore", { default: "Scroll to explore" })}
			</span>
			<motion.div
				animate={{ y: [0, 8, 0] }}
				transition={{ 
					duration: 1.5, 
					repeat: Infinity, 
					ease: "easeInOut" 
				}}
				className="relative"
			>
				<svg 
					width="24" 
					height="24" 
					viewBox="0 0 24 24" 
					fill="none" 
					className="text-white/80"
				>
					<path 
						d="M12 5v14M5 12l7 7 7-7" 
						stroke="currentColor" 
						strokeWidth="1.5" 
						strokeLinecap="round" 
						strokeLinejoin="round"
					/>
				</svg>
				{/* Glow effect behind arrow */}
				<div className="absolute inset-0 blur-md bg-white/30 rounded-full scale-150" />
			</motion.div>
		</motion.div>

			<style jsx global>{`
				.stroke-text {
				  -webkit-text-stroke: 2px #fff;
				  color: transparent;
				}
				
				.typewriter-glow {
				  background: linear-gradient(
					to right, 
					rgba(255, 255, 255, 0.1) 20%, 
					#ffffff 50%, 
					rgba(255, 255, 255, 0.1) 80%
				  );
				  background-size: 200% auto;
				  background-clip: text;
				  -webkit-background-clip: text;
				  -webkit-text-fill-color: transparent;
				  text-fill-color: transparent;
				  
				  /* Fancy Glow Effect */
				  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))
						  drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
				  
				  animation: shine 4s linear infinite;
				}

				@keyframes shine {
				  to {
					background-position: 200% center;
				  }
				}

				.scroll-shimmer {
				  background: linear-gradient(
					110deg,
					rgba(255, 255, 255, 0.4) 0%,
					rgba(255, 255, 255, 0.4) 40%,
					rgba(255, 255, 255, 1) 50%,
					rgba(255, 255, 255, 0.4) 60%,
					rgba(255, 255, 255, 0.4) 100%
				  );
				  background-size: 200% 100%;
				  background-clip: text;
				  -webkit-background-clip: text;
				  -webkit-text-fill-color: transparent;
				  animation: scroll-shimmer 2.5s ease-in-out infinite;
				}

				@keyframes scroll-shimmer {
				  0% {
					background-position: 100% 0;
				  }
				  100% {
					background-position: -100% 0;
				  }
				}
			`}</style>
		</section>
	);
}
