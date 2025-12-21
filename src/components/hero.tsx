"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { TextRotator } from "@/components/ui/text-rotator";

const MarqueeItem = ({ text }: { text: string }) => (
  <div className="flex items-center">
    <span className="mx-8 text-2xl md:text-4xl font-bold uppercase tracking-tighter text-white">
      {text}
    </span>
    <span className="w-2 h-2 bg-blue-500 rounded-full opacity-50" />
  </div>
);

const FloatingBadge = ({ 
  children, 
  className, 
  delay = 0, 
  yOffset = 20 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  yOffset?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: 1, 
      y: [0, -yOffset, 0],
    }}
    transition={{ 
      opacity: { duration: 0.8, delay },
      y: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }
    }}
    className={`absolute z-20 backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-2xl shadow-2xl ${className}`}
  >
    {children}
  </motion.div>
);

export function Hero() {
	const t = useTranslations();

	return (
		<section className="relative h-screen flex flex-col justify-center bg-black overflow-hidden">
			{/* Brand Watermark */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-white/[0.02] pointer-events-none select-none z-0 tracking-tighter">
				KELME.
			</div>

			{/* Background Gradients */}
			<div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

			<div className="w-full max-w-[1216px] mx-auto px-6 md:px-0 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-20 pb-24">
				
				{/* Left Side: Text Content */}
				<div className="flex flex-col items-start">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1 }}
						className="mb-6"
					>
						<div className="flex items-center gap-3 px-3 py-1 border border-white/20 rounded-full text-xs font-bold tracking-widest uppercase text-white bg-white/5 backdrop-blur-sm">
							<Zap className="w-3 h-3 text-blue-500 fill-current" />
							Kelme Studio
						</div>
					</motion.div>

					<div className="overflow-hidden mb-1">
						<motion.h1 
							initial={{ y: 100 }}
							animate={{ y: 0 }}
							transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
							className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter text-white"
						>
							{t("hero.title.line1")}
						</motion.h1>
					</div>
					<div className="overflow-hidden mb-8">
						<motion.div 
							initial={{ y: 100 }}
							animate={{ y: 0 }}
							transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
							className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter text-gradient-primary"
						>
							<TextRotator 
								texts={[
									t("hero.title.rotating.values.0"),
									t("hero.title.rotating.values.1"),
									t("hero.title.rotating.values.2"),
									t("hero.title.rotating.values.3"),
									t("hero.title.rotating.values.4"),
									t("hero.title.rotating.values.5")
								]}
								typingSpeed={60}
								deletingSpeed={40}
								delayBetweenTexts={2.5}
								cursorClassName="text-[#27D182]"
								className="inline-block"
							/>
						</motion.div>
					</div>

					<motion.p 
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4, duration: 0.8 }}
						className="text-lg md:text-xl text-neutral-400 max-w-lg mb-10 leading-relaxed"
					>
						{t("hero.subtitle")}
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 }}
						className="flex flex-col md:flex-row gap-6"
					>
						<Button size="default" className="group relative overflow-hidden">
							<span className="relative z-10">{t("hero.buttons.talkToDiego").toUpperCase()}</span>
							<ArrowUpRight className="ml-2 h-4 w-4 relative z-10" />
							<div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
						</Button>
						<Button variant="secondary" size="default">
							{t("hero.buttons.viewWork").toUpperCase()}
						</Button>
					</motion.div>
				</div>

				{/* Right Side: Visual Composition */}
				<div className="hidden lg:flex relative justify-center items-center h-full max-h-[500px]">
					{/* Decorative Logo Mark background */}
					<div className="absolute inset-0 flex items-center justify-center opacity-10">
						<div className="text-[200px] font-bold text-blue-500 leading-none">[⚡]</div>
					</div>

					{/* Main Visual Asset */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
						animate={{ opacity: 1, scale: 1, rotate: 0 }}
						transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
						className="relative z-10 w-full max-w-[400px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl bg-neutral-900"
					>
						<div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-transparent z-10 pointer-events-none" />
						<img 
							src="/diego-kelme-portrait.png" 
							alt="Diego Kelme" 
							className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-1000"
						/>
					</motion.div>

					{/* Floating Elements */}
					<FloatingBadge className="top-0 -left-10" delay={0.2} yOffset={15}>
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
								<Zap className="text-white w-5 h-5 fill-current" />
							</div>
							<div>
								<p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest leading-none mb-1">Performance</p>
								<p className="text-xl font-bold text-white leading-none">+45.2%</p>
							</div>
						</div>
					</FloatingBadge>

					<FloatingBadge className="bottom-10 -right-4" delay={0.8} yOffset={25}>
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
								<TrendingUp className="text-blue-500 w-5 h-5" />
							</div>
							<div>
								<p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest leading-none mb-1">Impact</p>
								<p className="text-xl font-bold text-white leading-none">Max ROI</p>
							</div>
						</div>
					</FloatingBadge>
					
					<div className="absolute inset-0 border border-white/5 rounded-[3rem] pointer-events-none transform scale-105 rotate-3 z-0" />
				</div>
			</div>

			{/* Bottom Marquee */}
			<div className="absolute bottom-0 left-0 w-full z-20 border-t border-white/10 bg-black/50 backdrop-blur-sm">
				<div className="flex overflow-hidden py-4 md:py-6">
					<motion.div 
						className="flex whitespace-nowrap"
						animate={{ x: ["0%", "-50%"] }}
						transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
					>
						{[...Array(6)].map((_, i) => (
							<div key={i} className="flex items-center">
								<MarqueeItem text="Kelme" />
								<MarqueeItem text="Design" />
								<MarqueeItem text="Performance" />
								<MarqueeItem text="Innovation" />
							</div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
