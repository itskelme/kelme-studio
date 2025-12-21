import React, { useEffect, useState } from "react";
import { navbarStyles as styles } from "./styles";
import { MenuSection } from "./use-nav-menus";
import { Button } from "@/components/ui";
import { Link } from '@/i18n/navigation';
import { X, ChevronDown, ChevronUp, PenTool, BookOpen } from "lucide-react";
import { LanguageSelector } from "@/components/language-selector";
import Image from "next/image";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  servicesSections: MenuSection[];
  workItems: string[];
  insightsItems: string[];
  socialItems?: string[];
  aboutLabel: string;
  letsTalkLabel: string;
  servicesLabel: string;
  workLabel: string;
  insightsLabel: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  servicesSections,
  workItems,
  insightsItems,
  socialItems = [],
  aboutLabel,
  letsTalkLabel,
  servicesLabel,
  workLabel,
  insightsLabel
}) => {
  // Estado para controlar quais seções de accordion estão abertas
  const [openSections, setOpenSections] = useState<{
    services: boolean;
    work: boolean;
    insights: boolean;
    social: boolean;
  }>({
    services: false,
    work: false,
    insights: false,
    social: false
  });

  // Toggle para abrir/fechar seções do accordion
  const toggleSection = (section: 'services' | 'work' | 'insights' | 'social') => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Gerencia efeitos quando o menu está aberto
  useEffect(() => {
    if (isOpen) {
      // Impede rolagem do body
      document.body.style.overflow = 'hidden';
      // Oculta a barra de navegação principal
      document.body.classList.add('mobile-menu-open');
    } else {
      // Restaura rolagem do body
      document.body.style.overflow = '';
      // Restaura a barra de navegação principal
      document.body.classList.remove('mobile-menu-open');
    }
    
    return () => {
      // Limpeza ao desmontar o componente
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isOpen]);
  
  if (!isOpen) return null;

  return (
    <div className={styles.mobileOverlay}>
      <div className={styles.mobileBackdrop} onClick={onClose} />
      <div 
        className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#0F0E0D] h-full w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho com logo e botão de fechar */}
        <div className="flex justify-between items-center p-4 border-b border-[#27D182]/20">
          <div className="flex items-bottom space-x-0">
              <Link href="/" className={styles.logoContainer}>
                            <Image
                              src="/kelme-icon.svg"
                              alt="Eagle Icon"
                              width={32}
                              height={32}
                              className={styles.logoImage}
                              priority
                            />
                           
                          </Link>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <button 
              onClick={onClose}
              className="rounded-full hover:bg-[#1A1918] text-[#F7F7F7] hover:text-[#27D182] transition-colors ml-2"
              aria-label="Fechar menu"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Área de conteúdo rolável */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Navegação Principal */}
          <nav>
            {/* About Link */}
            <div className="mb-6 border-b border-[#27D182]/10 pb-4">
              <a
                href="#about"
                className="text-[#F7F7F7] hover:text-[#27D182] font-satoshi text-xl font-medium py-2 block"
                onClick={onClose}
              >
                {aboutLabel}
              </a>
            </div>
            
            {/* Services Section - Accordion */}
            <div className="mb-6 border-b border-[#27D182]/10 pb-4">
              <button 
                className="flex items-center justify-between w-full text-left text-[#F7F7F7] hover:text-[#27D182] font-satoshi text-xl font-medium py-2"
                onClick={() => toggleSection('services')}
                aria-expanded={openSections.services}
                aria-controls="services-content"
              >
                <span>{servicesLabel}</span>
                {openSections.services ? (
                  <ChevronUp className="h-5 w-5 text-[#27D182]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#27D182]" />
                )}
              </button>
              
              {openSections.services && (
                <div id="services-content" className="mt-3 grid grid-cols-2 gap-x-4 gap-y-6 max-h-[40vh] overflow-y-auto pr-2">
                  {servicesSections.map((section, idx) => (
                    <div key={idx} className="border-l-2 border-[#27D182]/30 pl-3">
                      <h4 className="text-[#27D182] text-sm font-medium uppercase mb-2">
                        {section.title}
                      </h4>
                      <ul className="space-y-2">
                        {section.items.slice(0, 3).map((item: any, i: number) => (
                          <li key={i}>
                            <a 
                              href="#" 
                              className="flex items-center space-x-2 text-[#F7F7F7]/80 hover:text-[#27D182] text-sm py-1"
                              onClick={onClose}
                            >
                              <span className="text-[#27D182] w-5 h-5 flex items-center justify-center">
                                {item.icon}
                              </span>
                              <span>{item.label}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Work Link */}
            <div className="mb-6 border-b border-[#27D182]/10 pb-4">
              <Link 
                href="/work" 
                className="text-[#F7F7F7] hover:text-[#27D182] font-satoshi text-xl font-medium py-2 block"
                onClick={onClose}
              >
                {workLabel}
              </Link>
            </div>
            
            {/* Insights Section - Accordion */}
            <div className="mb-6 border-b border-[#27D182]/10 pb-4">
              <button 
                className="flex items-center justify-between w-full text-left text-[#F7F7F7] hover:text-[#27D182] font-satoshi text-xl font-medium py-2"
                onClick={() => toggleSection('insights')}
                aria-expanded={openSections.insights}
                aria-controls="insights-content"
              >
                <span>{insightsLabel}</span>
                {openSections.insights ? (
                  <ChevronUp className="h-5 w-5 text-[#27D182]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#27D182]" />
                )}
              </button>
              
              {openSections.insights && (
                <div id="insights-content" className="mt-2 grid grid-cols-2 gap-x-4">
                  <div className="border-l-2 border-[#27D182]/30 pl-3 py-1">
                    <ul className="space-y-3">
                      {insightsItems.map((item: string, i: number) => (
                        <li key={i}>
                          <a 
                            href="#" 
                            className="flex items-center space-x-2 text-[#F7F7F7]/80 hover:text-[#27D182] text-sm py-1"
                            onClick={onClose}
                          >
                            <span className="text-[#27D182] w-5 h-5 flex items-center justify-center">
                              <BookOpen className="h-4 w-4" />
                            </span>
                            <span>{item}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Social Media Links */}
                  <div className="border-l-2 border-[#27D182]/30 pl-3 py-1">
                    <h4 className="text-[#27D182] text-sm font-medium uppercase mb-2">
                      Social
                    </h4>
                    <ul className="space-y-3">
                      {socialItems.map((item: string, i: number) => {
                        // Substituir "Twitter" por "X" para exibição
                        const displayName = item === "Twitter" ? "X" : item;
                        const iconName = item === "Twitter" ? "x" : item.toLowerCase();
                        
                        return (
                          <li key={i}>
                            <a 
                              href={`https://${iconName}.com/kelmeofc`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-[#F7F7F7]/80 hover:text-[#27D182] text-sm py-1"
                              onClick={onClose}
                            >
                              <span className="text-[#27D182] w-5 h-5 flex items-center justify-center">
                                <img 
                                  src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${iconName}.svg`}
                                  alt={displayName}
                                  className="h-4 w-4"
                                  style={{ filter: "invert(44%) sepia(99%) saturate(505%) hue-rotate(116deg) brightness(95%) contrast(87%)" }}
                                />
                              </span>
                              <span>{displayName}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* CTA Button - Fixo na parte inferior */}
        <div className="p-6 border-t border-[#27D182]/20 bg-[#0F0E0D] mt-auto">
          <Link href="/contact">
            <Button className="w-full" size="lg" onClick={onClose}>
              {letsTalkLabel}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
