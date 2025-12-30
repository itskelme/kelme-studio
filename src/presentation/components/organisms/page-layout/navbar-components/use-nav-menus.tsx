import React from "react";
import { useTranslations, useMessages } from 'next-intl';
import { getServiceIcon, getCategoryIcon, WORK_ICON, INSIGHTS_ICON } from "@/lib/constants/service-icons";
import { getSocialIcon, getSocialUrl, getSocialDisplayName } from "@/lib/constants/social-media";
import { SERVICES_MENU_ITEMS, INSIGHTS_MENU_ITEMS, WORK_MENU_ITEMS } from "@/lib/constants/navigation";

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

  // Helper to find service URL by label
  const getServiceUrlByLabel = (label: string, category: keyof typeof SERVICES_MENU_ITEMS): string => {
    const categoryItems = SERVICES_MENU_ITEMS[category];
    const serviceEntry = Object.entries(categoryItems).find(([_, item]) => {
      const translatedLabel = t(`navbar.menus.${category}.items`);
      return Array.isArray(translatedLabel) && translatedLabel.includes(label);
    });
    return serviceEntry ? serviceEntry[1].href : '#';
  };

  // Process services sections with SSOT constants
  const servicesSections = [
    {
      title: menus.development.title,
      items: menus.development.items.map((item: string, index: number) => {
        const IconComponent = getServiceIcon(item) || getCategoryIcon("development");
        const serviceKeys = Object.values(SERVICES_MENU_ITEMS.development);
        return {
          label: item,
          icon: <IconComponent className="h-5 w-5" />,
          href: serviceKeys[index]?.href || '#'
        };
      })
    },
    {
      title: menus.marketing.title,
      items: menus.marketing.items.map((item: string, index: number) => {
        const IconComponent = getServiceIcon(item) || getCategoryIcon("marketing");
        const serviceKeys = Object.values(SERVICES_MENU_ITEMS.marketing);
        return {
          label: item,
          icon: <IconComponent className="h-5 w-5" />,
          href: serviceKeys[index]?.href || '#'
        };
      })
    },
    {
      title: menus.strategy.title,
      items: menus.strategy.items.map((item: string, index: number) => {
        const IconComponent = getServiceIcon(item) || getCategoryIcon("strategy");
        const serviceKeys = Object.values(SERVICES_MENU_ITEMS.strategy);
        return {
          label: item,
          icon: <IconComponent className="h-5 w-5" />,
          href: serviceKeys[index]?.href || '#'
        };
      })
    },
    {
      title: menus.video.title,
      items: menus.video.items.map((item: string, index: number) => {
        const IconComponent = getServiceIcon(item) || getCategoryIcon("video");
        const serviceKeys = Object.values(SERVICES_MENU_ITEMS.video);
        return {
          label: item,
          icon: <IconComponent className="h-5 w-5" />,
          href: serviceKeys[index]?.href || '#'
        };
      })
    }
  ];

  // Work section with SSOT icon and URLs
  const workSections = [
    {
      title: t("navbar.work"),
      items: menus.work.map((item: string, index: number) => {
        const workKeys = Object.values(WORK_MENU_ITEMS);
        return {
          label: item,
          icon: <WORK_ICON className="h-5 w-5" />,
          href: workKeys[index]?.href || '/work'
        };
      })
    }
  ];

  // Insights section with SSOT icon and URLs
  const insightsSections = [
    {
      title: t("navbar.insights"),
      items: menus.insights.map((item: string, index: number) => {
        const insightsKeys = Object.values(INSIGHTS_MENU_ITEMS);
        return {
          label: item,
          icon: <INSIGHTS_ICON className="h-5 w-5" />,
          href: insightsKeys[index]?.href || '#'
        };
      })
    }
  ];

  // Social media section with SSOT constants
  const socialSections = [
    {
      title: messages.footer.socialTitle,
      items: messages.footer.socialLinks.map((name: string) => {
        const IconComponent = getSocialIcon(name);
        return {
          label: getSocialDisplayName(name),
          icon: <IconComponent className="h-5 w-5" />,
          href: getSocialUrl(name)
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
