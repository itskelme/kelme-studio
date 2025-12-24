import React, { useEffect, useState } from "react";
import { MenuSection } from "./use-nav-menus";
import { Link } from '@/i18n/navigation';
import { RiArrowDownSLine, RiArrowUpSLine, RiBookOpenLine } from "@remixicon/react";
import { LanguageSelector } from "@/components/language-selector";
import { motion, AnimatePresence } from "framer-motion";

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
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black z-40 flex flex-col"
        >
          {/* Cabeçalho com logo e controles */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <Link href="/" className="text-2xl font-oswald font-bold tracking-tighter uppercase text-white" onClick={onClose}>
              Kelme<span className="opacity-50">.Studio</span>
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSelector />
            </div>
          </div>
          
          {/* Área de conteúdo rolável */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center">
          {/* Navegação Principal */}
          <nav className="space-y-8">
            {/* About Link */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <a
                href="#about"
                className="text-4xl font-oswald uppercase font-bold tracking-tighter text-white hover:text-gray-400 transition-colors block"
                onClick={onClose}
              >
                {aboutLabel}
              </a>
            </motion.div>
            
            {/* Services Section - Accordion */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <button 
                className="flex items-center justify-between w-full text-left text-white hover:text-gray-400 font-oswald text-4xl font-bold tracking-tighter py-2 transition-colors"
                onClick={() => toggleSection('services')}
                aria-expanded={openSections.services}
                aria-controls="services-content"
              >
                <span>{servicesLabel}</span>
                {openSections.services ? (
                  <RiArrowUpSLine className="h-8 w-8" />
                ) : (
                  <RiArrowDownSLine className="h-8 w-8" />
                )}
              </button>
              
              {openSections.services && (
                <motion.div 
                  id="services-content" 
                  className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 max-h-[40vh] overflow-y-auto pr-2"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {servicesSections.map((section, idx) => (
                    <div key={idx} className="border-l-2 border-white/20 pl-3">
                      <h4 className="text-white/60 text-xs font-medium uppercase mb-2">
                        {section.title}
                      </h4>
                      <ul className="space-y-2">
                        {section.items.slice(0, 3).map((item: any, i: number) => (
                          <li key={i}>
                            <a 
                              href="#" 
                              className="flex items-center space-x-2 text-white/80 hover:text-white text-sm py-1 transition-colors"
                              onClick={onClose}
                            >
                              <span className="text-white/60 w-5 h-5 flex items-center justify-center">
                                {item.icon}
                              </span>
                              <span>{item.label}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
            
            {/* Work Link */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                href="/work" 
                className="text-4xl font-oswald uppercase font-bold tracking-tighter text-white hover:text-gray-400 transition-colors block"
                onClick={onClose}
              >
                {workLabel}
              </Link>
            </motion.div>
            
            {/* Insights Section - Accordion */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button 
                className="flex items-center justify-between w-full text-left text-white hover:text-gray-400 font-oswald text-4xl font-bold tracking-tighter py-2 transition-colors"
                onClick={() => toggleSection('insights')}
                aria-expanded={openSections.insights}
                aria-controls="insights-content"
              >
                <span>{insightsLabel}</span>
                {openSections.insights ? (
                  <RiArrowUpSLine className="h-8 w-8" />
                ) : (
                  <RiArrowDownSLine className="h-8 w-8" />
                )}
              </button>
              
              {openSections.insights && (
                <motion.div 
                  id="insights-content" 
                  className="mt-4 grid grid-cols-2 gap-x-4"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="border-l-2 border-white/20 pl-3 py-1">
                    <ul className="space-y-3">
                      {insightsItems.map((item: string, i: number) => (
                        <li key={i}>
                          <a 
                            href="#" 
                            className="flex items-center space-x-2 text-white/80 hover:text-white text-sm py-1 transition-colors"
                            onClick={onClose}
                          >
                            <span className="text-white/60 w-5 h-5 flex items-center justify-center">
                              <RiBookOpenLine className="h-4 w-4" />
                            </span>
                            <span>{item}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Social Media Links */}
                  <div className="border-l-2 border-white/20 pl-3 py-1">
                    <h4 className="text-white/60 text-xs font-medium uppercase mb-2">
                      Social
                    </h4>
                    <ul className="space-y-3">
                      {socialItems.map((item: string, i: number) => {
                        const displayName = item === "Twitter" ? "X" : item;
                        const iconName = item === "Twitter" ? "x" : item.toLowerCase();
                        
                        return (
                          <li key={i}>
                            <a 
                              href={`https://${iconName}.com/kelmeofc`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-white/80 hover:text-white text-sm py-1 transition-colors"
                              onClick={onClose}
                            >
                              <span className="text-white/60 w-5 h-5 flex items-center justify-center">
                                <img 
                                  src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${iconName}.svg`}
                                  alt={displayName}
                                  className="h-4 w-4"
                                  style={{ filter: "invert(100%)" }}
                                />
                              </span>
                              <span>{displayName}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </nav>
        </div>

        {/* CTA Button - Fixo na parte inferior */}
        <motion.div 
          className="p-6 border-t border-white/10 mt-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/contact" onClick={onClose}>
            <div className="text-4xl font-oswald uppercase font-bold tracking-tighter text-[#C0392B] hover:text-[#C0392B]/80 transition-colors text-center">
              {letsTalkLabel}
            </div>
          </Link>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};
