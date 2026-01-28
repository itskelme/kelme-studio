"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { BRAND_LOGOS } from "@/lib/constants/brands"

export function Marquee() {
  return (
		<div className="w-full py-12 border-b border-white/10 bg-black overflow-hidden relative z-10">
			<p className="text-center text-sm md:text-base text-white/60 mb-8 uppercase tracking-wide">
				Companies that already generate leads with Zarp
			</p>
			<div className="flex">
				<motion.div
					className="flex whitespace-nowrap"
					animate={{ x: [0, -1000] }}
					transition={{
						repeat: Infinity,
						ease: "linear",
						duration: 30,
					}}
				>
					{[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map(
						(brand, index) => (
							<Link href="/work" key={`${brand.name}-${index}`}>
								<div className="mx-8 flex items-center justify-center">
									<div className="relative w-32 h-12 md:w-42 md:h-16 opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
										<Image
											src={brand.path}
											alt={brand.alt}
											fill
											className="object-contain"
											sizes="(max-width: 768px) 128px, 256px"
										/>
									</div>
								</div>
							</Link>
						),
					)}
				</motion.div>

				{/* Fade edges */}
				<div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-black to-transparent pointer-events-none" />
				<div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-black to-transparent pointer-events-none" />
			</div>
		</div>
	);
}
