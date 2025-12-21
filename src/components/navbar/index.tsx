"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/language-selector";
import { Link } from "@/i18n/navigation";
import { NavItem, MegaDropdown } from "@/components/ui/mega-dropdown";
import { useTranslations, useMessages } from "next-intl";
import { getServiceIcon, getCategoryDefaultIcon } from "./icon-mapper";
import { MobileMenu } from "./mobile-menu";
import { useNavMenus } from "./use-nav-menus";
import Image from "next/image";

/**
 * Navbar principal do site
 * Versão simplificada e otimizada
 */
export function Navbar() {
	// State hooks
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [isScrolled, setIsScrolled] = useState(false);

	// Get translations
	const t = useTranslations();
	const messages: any = useMessages();

	// Importando o hook que prepara os menus com ícones
	const {
		servicesSections,
		workSections,
		insightsSections,
		socialSections
	} = useNavMenus();

	// Handle scroll effect
	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 10);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Handle dropdown toggle with simplified event handling
	const handleDropdownToggle = (dropdown: string) => {
		setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
	};

	// Auxiliar para cliques em itens de dropdown
	const handleItemClick = (e: React.MouseEvent, dropdown: string) => {
		e.stopPropagation();
		handleDropdownToggle(dropdown);
	};

	// Close all dropdowns when clicking outside
	useEffect(() => {
		if (!activeDropdown) return;
		const handleClickOutside = () => setActiveDropdown(null);
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, [activeDropdown]);

	// Define classes baseadas no estado de scroll
	const containerClass = isScrolled
		? "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0F0E0D]/80 backdrop-blur-md border-b border-[#27D182]/20"
		: "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent border-b border-transparent";

	// Estilos embutidos
	const styles = {
		innerWrapper: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full",
		flexContainer: "flex items-center justify-between h-20 w-full",
		logoContainer: "flex items-center space-x-1",
		logoImage: "h-8 w-8",
		logoText:
			"font-bold text-lg text-[#F7F7F7] font-satoshi uppercase tracking-wider",
		logoAccent: "font-light text-[#27D182]",
		mobileMenuBtn:
			"lg:hidden text-[#F7F7F7] hover:text-[#27D182] transition-colors ml-4",
		mobileMenuIcon: "h-6 w-6",
	};

	return (
		<>
			<nav className={`${containerClass} navbar-main`}>
				<div className={styles.innerWrapper}>
					<div className={styles.flexContainer}>
						{/* Divisão 1: Logo (1/3) */}
						<div className="w-full lg:w-1/3 flex justify-start items-center">
							<Link href="/" className={styles.logoContainer}>
								<Image
									src="/kelme-icon.svg"
									alt="Eagle Icon"
									width={32}
									height={32}
									className={styles.logoImage}
									priority
								/>
								<div className={styles.logoText}>
									KELME
								</div>  
							</Link>
						</div>

						{/* Divisão 2: Menu Central (1/3) */}
						<div className="hidden lg:flex w-1/3 justify-center items-center">
							<div className="flex items-center space-x-6 xl:space-x-8">
								{/* Services NavItem */}
								<div onClick={(e) => handleItemClick(e, "services")}>
									<NavItem
										label={t("navbar.services").toUpperCase()}
										isActive={activeDropdown === "services"}
										sections={servicesSections}
									/>
								</div>

								{/* Work NavItem - Simple link like About */}
								<NavItem 
									label={t("navbar.work").toUpperCase()} 
									href="/work" 
								/>

								{/* About NavItem */}
								<NavItem label={t("navbar.about").toUpperCase()} href="#about" />

								{/* Insights NavItem */}
								<div onClick={(e) => handleItemClick(e, "insights")}>
									<NavItem
										label={t("navbar.insights").toUpperCase()}
										isActive={activeDropdown === "insights"}
										sections={insightsSections}
									/>
								</div>
							</div>
						</div>

						{/* Divisão 3: Botões e Controles (1/3) */}
						<div className="w-full lg:w-1/3 flex justify-end items-center">
							<div className="hidden lg:flex items-center space-x-4">
								<LanguageSelector />
								<Link href="/contact">
									<Button size="default">
										{t("navbar.letsTalk").toUpperCase()}
									</Button>
								</Link>
							</div>
							<button
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								className={styles.mobileMenuBtn}
								aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
							>
								<Menu className={styles.mobileMenuIcon} />
							</button>
						</div>
					</div>
				</div>

				{/* Mega Dropdowns */}
				<MegaDropdown
					isOpen={activeDropdown === "services"}
					sections={servicesSections}
					onClose={() => setActiveDropdown(null)}
				/>

				{/* Work dropdown removed - it's now a simple link */}

				<MegaDropdown
					isOpen={activeDropdown === "insights"}
					sections={[...insightsSections, ...socialSections]}
					onClose={() => setActiveDropdown(null)}
				/>
			</nav>

			{/* Mobile Menu Component */}
			<MobileMenu
				isOpen={mobileMenuOpen}
				onClose={() => setMobileMenuOpen(false)}
				servicesSections={servicesSections}
				workItems={messages.navbar.menus.work}
				insightsItems={messages.navbar.menus.insights}
				socialItems={messages.footer.socialLinks}
				aboutLabel={t("navbar.about").toUpperCase()}
				letsTalkLabel={t("navbar.letsTalk").toUpperCase()}
				servicesLabel={t("navbar.services")}
				workLabel={t("navbar.work")}
				insightsLabel={t("navbar.insights")}
			/>
		</>
	);
}
