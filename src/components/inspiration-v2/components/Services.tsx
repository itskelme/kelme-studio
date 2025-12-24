import React from "react";
import { motion } from "framer-motion";
import {
	RiLayoutMasonryLine,
	RiPenNibLine,
	RiCodeSSlashLine,
	RiRocket2Line,
} from "remixicon";

const services = [
	{
		icon: <RiLayoutMasonryLine className="w-6 h-6" />,
		title: "UI/UX Design",
		description:
			"Interfaces that behave as good as they look. We focus on conversion and retention through user-centric design patterns.",
		tags: ["Web Design", "Mobile Apps", "Design Systems"],
	},
	{
		icon: <RiCodeSSlashLine className="w-6 h-6" />,
		title: "Development",
		description:
			"Pixel-perfect implementation using modern stacks. Fast, accessible, and scalable code that ranks.",
		tags: ["React/Next.js", "Webflow", "Shopify"],
	},
	{
		icon: <RiPenNibLine className="w-6 h-6" />,
		title: "Branding",
		description:
			"Visual identities that stick. From logo design to full brand guidelines, we create the face of your business.",
		tags: ["Logo", "Strategy", "Art Direction"],
	},
	{
		icon: <RiRocket2Line className="w-6 h-6" />,
		title: "Growth",
		description:
			"Design-driven growth strategies. Landing pages and creatives optimized for high ROAS.",
		tags: ["VSL", "SEO", "Ad Creatives", "Analytics"],
	},
];

const Services: React.FC = () => {
	return (
		<section
			id="services"
			className="py-32 border-b border-white/10 bg-background relative"
		>
			{/* Background Grid */}
			<div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] pointer-events-none" />

			<div className="container mx-auto px-6 relative z-10">
				<div className="mb-20">
					<h2 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-4">
						What We Do
					</h2>
					<h3 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none">
						Capabilities<span className="text-secondary">.</span>
					</h3>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 border border-white/10">
					{services.map((service, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="bg-black p-12 group hover:bg-surface transition-colors duration-500"
						>
							<div className="mb-6 text-white/50 group-hover:text-white transition-colors">
								{service.icon}
							</div>
							<h4 className="text-2xl font-display uppercase font-bold mb-4">
								{service.title}
							</h4>
							<p className="text-secondary mb-8 text-sm leading-relaxed max-w-sm">
								{service.description}
							</p>
							<div className="flex flex-wrap gap-2">
								{service.tags.map((tag) => (
									<span
										key={tag}
										className="text-xs border border-white/10 px-2 py-1 uppercase tracking-wider text-secondary rounded-none"
									>
										{tag}
									</span>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;
