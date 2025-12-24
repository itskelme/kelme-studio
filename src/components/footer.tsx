"use client"

import { useMessages } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { motion } from "framer-motion"
import { RiInstagramLine, RiTwitterXLine, RiMailLine, RiWhatsappLine, RiLinkedinBoxFill } from "@remixicon/react";

const socialIconMap: Record<string, { icon: any; url: string }> = {
  Instagram: { icon: RiInstagramLine, url: "https://instagram.com/itskelme_" },
  LinkedIn: { icon: RiLinkedinBoxFill, url: "https://linkedin.com/in/kelme" },
  X: { icon: RiTwitterXLine, url: "https://x.com/itskelme" },
};

export function Footer() {
  const messages: any = useMessages()
  const f = messages.footer
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
		<footer
			id="footer"
			className="bg-black pt-32 pb-8 border-t border-white/10 overflow-hidden"
		>
			<div className="container mx-auto px-6">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={containerVariants}
					className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-32"
				>
					{/* Main CTA Section */}
					<div className="lg:col-span-5 flex flex-col justify-between">
						<div>
							<motion.h2
								variants={itemVariants}
								className="font-oswald text-5xl md:text-7xl font-bold uppercase leading-[0.9] mb-8"
							>
								{f.title || "Have an idea?"} <br />
								<span className="text-secondary">
									{f.titleHighlight || "Let's build it."}
								</span>
							</motion.h2>
							<motion.p
								variants={itemVariants}
								className="text-secondary max-w-sm mb-12"
							>
								{f.subtitle ||
									"We help ambitious brands define their digital future. Open for new partnerships for Q4 2024."}
							</motion.p>
						</div>

						<motion.div
							variants={itemVariants}
							className="flex flex-col gap-4 max-w-xs"
						>
							<a
								href="mailto:hello@kelme.studio"
								className="group flex items-center justify-between border border-white/20 px-6 py-4 hover:bg-white hover:text-black transition-all duration-300"
							>
								<span className="text-sm uppercase tracking-widest font-bold">
									{f.emailUs || "Email Us"}
								</span>
								<RiMailLine className="w-5 h-5" />
							</a>
							<a
								href="https://wa.me/1234567890"
								target="_blank"
								rel="noreferrer"
								className="group flex items-center justify-between border border-white/20 px-6 py-4 bg-white/5 hover:bg-[#25D366] hover:border-[#25D366] hover:text-black transition-all duration-300"
							>
								<span className="text-sm uppercase tracking-widest font-bold">
									{f.whatsapp || "WhatsApp"}
								</span>
								<RiWhatsappLine className="w-5 h-5" />
							</a>
						</motion.div>
					</div>

					{/* Spacer */}
					<div className="hidden lg:block lg:col-span-2"></div>

					{/* Links Columns */}
					<div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
						<motion.div variants={itemVariants}>
							<h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">
								{f.sitemap || "Sitemap"}
							</h4>
							<ul className="space-y-4 text-secondary text-sm uppercase tracking-wider">
								<li>
									<Link
										href="/"
										className="hover:text-white transition-colors block w-max"
									>
										{f.home || "Home"}
									</Link>
								</li>
								<li>
									<a
										href="/#work"
										className="hover:text-white transition-colors block w-max"
									>
										{f.work || "Work"}
									</a>
								</li>
								<li>
									<a
										href="/#services"
										className="hover:text-white transition-colors block w-max"
									>
										{f.services || "Services"}
									</a>
								</li>
								<li>
									<a
										href="/#pricing"
										className="hover:text-white transition-colors block w-max"
									>
										{f.pricing || "Pricing"}
									</a>
								</li>
							</ul>
						</motion.div>

						<motion.div variants={itemVariants}>
							<h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">
								{f.resources || "Resources"}
							</h4>
							<ul className="space-y-4 text-secondary text-sm uppercase tracking-wider">
								<li>
									<Link
										href="/blog"
										className="hover:text-white transition-colors flex items-center gap-2 w-max"
									>
										{f.insights || "Insights"}{" "}
										<span className="text-[10px] bg-white text-black px-1 leading-none py-0.5">
											{f.newBadge || "NEW"}
										</span>
									</Link>
								</li>
								<li>
									<Link
										href="/careers"
										className="hover:text-white transition-colors block w-max"
									>
										{f.careers || "Careers"}
									</Link>
								</li>
								<li>
									<a
										href="/#faq"
										className="hover:text-white transition-colors block w-max"
									>
										FAQ
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-white transition-colors block w-max"
									>
										{f.brandAssets || "Brand Assets"}
									</a>
								</li>
							</ul>
						</motion.div>

						<motion.div variants={itemVariants}>
							<h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">
								{f.socials || "Socials"}
							</h4>
							<ul className="space-y-4 text-secondary text-sm uppercase tracking-wider">
								{(f.socialLinks || ["Instagram", "X", "LinkedIn"]).map(
									(name: string, i: number) => {
										const displayName = name === "Twitter" ? "X" : name;
										const mapKey = name === "Twitter" ? "X" : name;
										const socialInfo = socialIconMap[mapKey];

										return (
											<li key={i}>
												<a
													href={socialInfo?.url || "#"}
													target="_blank"
													rel="noreferrer"
													className="hover:text-white transition-colors flex items-center gap-2 w-max"
												>
													{socialInfo?.icon && (
														<socialInfo.icon className="w-4 h-4" />
													)}
													{displayName}
												</a>
											</li>
										);
									}
								)}
							</ul>
						</motion.div>
					</div>
				</motion.div>

				{/* Massive Brand Footer */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
					className="border-t border-white/10 w-full"
				>
					<motion.h1
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 1.2, delay: 0.3 }}
						className="text-[10vw] font-oswald font-bold uppercase text-center tracking-tighter select-none w-full"
					>
						Kelme Studio
					</motion.h1>
				</motion.div>

				{/* Bottom Bar */}
				<div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] md:text-xs uppercase tracking-widest text-secondary">
					<div className="flex gap-6 mb-4 md:mb-0">
						<Link
							href="/privacy-policy"
							className="hover:text-white transition-colors"
						>
							{f.privacyPolicy || "Privacy Policy"}
						</Link>
						<Link href="/terms" className="hover:text-white transition-colors">
							{f.termsOfUse || "Terms of Service"}
						</Link>
					</div>
					<div className="flex gap-1">
						<span>© 2026 DIEGO KELME. All rights reserved.</span>{" "}
						<span className="text-white">Designed in the Dark.</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
