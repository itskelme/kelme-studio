"use client";

import { useState, useEffect } from "react";
import { RiMenu3Line, RiCloseLine } from "@remixicon/react";
import { Button } from "@/presentation/components/atoms/ui/button";
import { LanguageSelector } from "@/presentation/components/molecules/language-selector";
import { Link } from "@/i18n/navigation";
import { NavItem, MegaDropdown } from "@/presentation/components/organisms/layout/navbar-components/mega-dropdown";
import { useTranslations, useMessages } from "next-intl";
import { MobileMenu } from "./mobile-menu";
import { useNavMenus } from "./use-nav-menus";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";

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

	// Define classes baseadas no estado de scroll com v2 styling
	const containerClass = `fixed top-0 left-0 right-0 z-50 px-6 bg-black/50 transition-all duration-300  text-white ${isScrolled ? "py-4" : "py-6"}`;

	// Estilos embutidos com v2 design
	const styles = {
		innerWrapper: "max-w-7xl mx-auto w-full",
		flexContainer: "flex items-center justify-between w-full",
		logoText: "text-2xl font-oswald font-bold tracking-tighter uppercase",
		logoAccent: "opacity-50",
		mobileMenuBtn: "lg:hidden z-50 transition-colors ml-4",
		mobileMenuIcon: "h-6 w-6",
	};

	return (
		<>
			<motion.nav 
				className={`${containerClass} navbar-main`}
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
			>
				<div className={styles.innerWrapper}>
					<div className={styles.flexContainer}>
						{/* Divisão 1: Logo (1/3) */}
						<div className="w-full lg:w-1/3 flex justify-start items-center">
							<Link href="/" className={styles.logoText}>
								Kelme<span className={styles.logoAccent}>.Studio</span>
							</Link>
						</div>

						{/* Divisão 2: Menu Central (1/3) */}
						<div className="hidden lg:flex w-1/3 justify-center items-center">
							<div className="flex items-center gap-8">
								{/* Services NavItem */}
								<div onClick={(e) => handleItemClick(e, NAV_ITEMS.services.key)}>
									<NavItem
										label={t("navbar.services").toUpperCase()}
										isActive={activeDropdown === NAV_ITEMS.services.key}
										sections={servicesSections}
									/>
								</div>

								{/* Work NavItem */}
								<NavItem 
									label={t("navbar.work").toUpperCase()} 
									href={NAV_ITEMS.work.href} 
								/>

								{/* About NavItem */}
								<NavItem 
									label={t("navbar.about").toUpperCase()} 
									href={NAV_ITEMS.about.href} 
								/>

								{/* Insights NavItem */}
								<div onClick={(e) => handleItemClick(e, NAV_ITEMS.insights.key)}>
									<NavItem
										label={t("navbar.insights").toUpperCase()}
										isActive={activeDropdown === NAV_ITEMS.insights.key}
										sections={insightsSections}
									/>
								</div>
							</div>
						</div>

						{/* Divisão 3: Botões e Controles (1/3) */}
						<div className="w-full lg:w-1/3 flex justify-end items-center">
							<div className="hidden lg:flex items-center gap-4">
								<LanguageSelector />
								<Link href={NAV_ITEMS.contact.href}>
									<Button 
										size="default"
										variant="outline"
										className="border-white text-white hover:bg-white hover:text-black transition-colors rounded-none uppercase tracking-widest"
									>
										{t("navbar.letsTalk").toUpperCase()}
									</Button>
								</Link>
							</div>
							<button
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								className={styles.mobileMenuBtn}
								aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
							>
								{mobileMenuOpen ? (
									<RiCloseLine className={styles.mobileMenuIcon} />
								) : (
									<RiMenu3Line className={styles.mobileMenuIcon} />
								)}
							</button>
						</div>
					</div>
				</div>

				{/* Mega Dropdowns */}
				<MegaDropdown
					isOpen={activeDropdown === NAV_ITEMS.services.key}
					sections={servicesSections}
					onClose={() => setActiveDropdown(null)}
				/>

				<MegaDropdown
					isOpen={activeDropdown === NAV_ITEMS.insights.key}
					sections={[...insightsSections, ...socialSections]}
					onClose={() => setActiveDropdown(null)}
				/>
			</motion.nav>

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
