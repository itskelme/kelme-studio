import React from "react";
import { useTranslations, useMessages } from 'next-intl';
import { BookOpen, PenTool } from "lucide-react";
import { getServiceIcon, getCategoryDefaultIcon } from "./icon-mapper";

// Types for menu items and sections
export interface MenuItem {
  label: string;
  icon?: string | React.ReactNode;
  href?: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

/**
 * Hook to prepare navigation menu data with proper icons and translations
 */
export const useNavMenus = () => {
  const t = useTranslations();
  const messages: any = useMessages();
  const menus = messages.navbar.menus;

  // Process services sections with proper icons
  const servicesSections = [
    {
      title: menus.development.title,
      items: menus.development.items.map((item: string) => ({
        label: item,
        icon: getServiceIcon(item, getCategoryDefaultIcon("development"))
      }))
    },
    {
      title: menus.marketing.title,
      items: menus.marketing.items.map((item: string) => ({
        label: item,
        icon: getServiceIcon(item, getCategoryDefaultIcon("marketing"))
      }))
    },
    {
      title: menus.strategy.title,
      items: menus.strategy.items.map((item: string) => ({
        label: item,
        icon: getServiceIcon(item, getCategoryDefaultIcon("strategy"))
      }))
    },
    {
      title: menus.video.title,
      items: menus.video.items.map((item: string) => ({
        label: item,
        icon: getServiceIcon(item, getCategoryDefaultIcon("video"))
      }))
    }
  ];

  // Work section with consistent icons
  const workSections = [
    {
      title: t("navbar.work"),
      items: menus.work.map((item: string) => ({
        label: item,
        icon: <PenTool className="h-5 w-5" />
      }))
    }
  ];

  // Insights section with consistent icons
  const insightsSections = [
    {
      title: t("navbar.insights"),
      items: menus.insights.map((item: string) => ({
        label: item,
        icon: <BookOpen className="h-5 w-5" />
      }))
    }
  ];

  // Social media section with icons
  const socialSections = [
    {
      title: messages.footer.socialTitle,
      items: messages.footer.socialLinks.map((name: string) => {
        // Substituir "Twitter" por "X" para exibição mantendo compatibilidade com as traduções
        const displayName = name === "Twitter" ? "X" : name;
        const iconKey = name === "Twitter" ? "X" : name;
        
        return {
          label: displayName,
          icon: `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${iconKey.toLowerCase()}.svg`,
          href: `https://${iconKey.toLowerCase()}.com/kelmeofc`
        };
      })
    }
  ];

  return {
    servicesSections,
    workSections,
    insightsSections,
    socialSections,
    menus,
    t
  };
};
