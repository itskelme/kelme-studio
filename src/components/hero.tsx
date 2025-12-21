"use client";
import * as React from "react";

import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui";
import { TextRotator } from "@/components/ui/text-rotator";
import DarkVeil from "@/components/blocks/Backgrounds/DarkVeil/DarkVeil";
import { useTranslations, useMessages } from "next-intl";
import { gsap } from "gsap";

function BrandLogo({ logo, name }: { logo: string; name: string }) {
	return (
		<div className="flex items-center justify-center">
			<img
				src={logo || "/placeholder.svg"}
				alt={name}
				className="w-20 h-8 opacity-40 hover:opacity-60 transition-opacity object-contain filter grayscale"
			/>
		</div>
	);
}

// Importações para tipos React
import type { ReactNode, ElementType, HTMLAttributes } from "react";

export function Hero() {
	const t = useTranslations();
	const messages = useTranslations("hero.title.rotating");
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const buttonsRef = useRef<HTMLDivElement>(null);
	
	// Importando utilitário de animações GSAP
	useEffect(() => {
		// Animação usando GSAP
		const tl = gsap.timeline();
		
		// Animação do título
		if (titleRef.current) {
			tl.fromTo(
				titleRef.current,
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
			);
		}
		
		// Animação do subtítulo
		if (subtitleRef.current) {
			tl.fromTo(
				subtitleRef.current,
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
				"-=0.5" // Inicia um pouco antes da animação anterior terminar
			);
		}
		
		// Animação dos botões
		if (buttonsRef.current && buttonsRef.current.children.length > 0) {
			tl.fromTo(
				Array.from(buttonsRef.current.children),
				{ opacity: 0, y: 30 },
				{ 
					opacity: 1, 
					y: 0, 
					duration: 0.6, 
					stagger: 0.2, 
					ease: "power2.out" 
				},
				"-=0.5"
			);
		}
	}, []);

	const trustedBrands = [
		{
			name: "SHOPIFY",
			logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shopify.svg",
		},
		{
			name: "WORDPRESS",
			logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/wordpress.svg",
		},
		{
			name: "META",
			logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg",
		},
		{
			name: "GOOGLE",
			logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg",
		},
	];

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
			{/* DarkVeil background */}
			<div className="absolute inset-0 bottom-32 z-10 w-full h-full pointer-events-none"></div>

			<div className="max-w-4xl w-full flex flex-col items-center justify-center text-center z-10 px-6 py-32 lg:px-32 lg:py-40">
				<h1
					ref={titleRef}
					className="text-5xl lg:text-7xl text-[#F7F7F7] leading-tight mb-8 uppercase tracking-tight text-center"
				>
					<span className="md:whitespace-nowrap">{t("hero.title.line1")}</span>
					<br />
					<span className="text-gradient-primary inline-block md:whitespace-nowrap" style={{ lineHeight: '1.2', display: 'inline-block', verticalAlign: 'baseline' }}>
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
							className="inline-block md:whitespace-nowrap"
						/>
					</span>
				</h1>

				<p
					ref={subtitleRef}
					className="text-lg lg:text-xl text-[#F7F7F7]/60 leading-relaxed max-w-2xl mb-12 font-satoshi text-center"
				>
					{t("hero.subtitle")}
				</p>

				<div
					ref={buttonsRef}
					className="flex flex-col sm:flex-row gap-4 justify-center items-center"
				>
					<Button size="default">
						{t("hero.buttons.talkToDiego").toUpperCase()}{" "}
						<ArrowUpRight className="ml-2 h-4 w-4" />
					</Button>
					<Button variant="secondary" size="default">
						{t("hero.buttons.viewWork").toUpperCase()}
					</Button>
				</div>
			</div>
		</section>
	);
}
