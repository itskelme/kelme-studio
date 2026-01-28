"use client"

import { useMessages, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { motion } from "framer-motion"
import { RiMailLine, RiWhatsappLine, RiPhoneLine } from "@remixicon/react";
import { getSocialIcon, getSocialUrl } from '@/lib/constants/social-media';
import { CONTACT_EMAIL, CONTACT_PHONE, getEmailHref } from '@/lib/constants/contact';

export function Footer() {
  const messages: any = useMessages()
  const locale = useLocale();
  const isEnglish = locale === "en";
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
								href={getEmailHref()}
								className="group flex items-center justify-between border border-white/20 px-6 py-4 hover:bg-white hover:text-black transition-all duration-300"
							>
								<span className="text-sm uppercase tracking-widest font-bold">
									{f.emailUs || "Email Us"}
								</span>
								<RiMailLine className="w-5 h-5" />
							</a>
							{isEnglish ? (
								<a
									href={CONTACT_PHONE.us.telUrl}
									className="group flex items-center justify-between border border-white/20 px-6 py-4 bg-white/5 hover:bg-white hover:text-black transition-all duration-300"
								>
									<span className="text-sm uppercase tracking-widest font-bold">
										{f.callUs || "Call Us"}
									</span>
									<RiPhoneLine className="w-5 h-5" />
								</a>
							) : (
								<a
									href={CONTACT_PHONE.brazil.whatsappUrl}
									target="_blank"
									rel="noreferrer"
									className="group flex items-center justify-between border border-white/20 px-6 py-4 bg-white/5 hover:bg-[#25D366] hover:border-[#25D366] hover:text-black transition-all duration-300"
								>
									<span className="text-sm uppercase tracking-widest font-bold">
										{f.whatsapp || "WhatsApp"}
									</span>
									<RiWhatsappLine className="w-5 h-5" />
								</a>
							)}
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
										{f.faq || "FAQ"}
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
									const SocialIcon = getSocialIcon(name);
									const socialUrl = getSocialUrl(name);
									const displayName = name === "Twitter" ? "X" : name;

									return (
										<li key={i}>
											<a
												href={socialUrl}
												target="_blank"
												rel="noreferrer"
												className="hover:text-white transition-colors flex items-center gap-2 w-max"
											>
												<SocialIcon className="w-4 h-4" />
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
						Zarp Studio
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
							{f.termsOfService || "Terms of Service"}
						</Link>
					</div>
					<div className="flex gap-1">
						<span>{f.copyright || "© 2026 ZARP STUDIO. All rights reserved."}</span>{" "}
						<span className="text-white">{f.tagline || "Designed in the Dark."}</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
