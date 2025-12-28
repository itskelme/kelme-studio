import React from "react";
import { useTranslations, useMessages } from 'next-intl';
import { getServiceIcon, getCategoryIcon, WORK_ICON, INSIGHTS_ICON } from "@/lib/constants/service-icons";
import { getSocialIcon, getSocialUrl, getSocialDisplayName } from "@/lib/constants/social-media";

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

  // Process services sections with SSOT constants
  const servicesSections = [
    {
      title: menus.development.title,
      items: menus.development.items.map((item: string) => {
        const IconComponent = getServiceIcon(item) || getCategoryIcon("development");
        return {
          label: item,
          icon: <IconComponent className="h-5 w-5" />
        };
      })
    },
    {
      title: menus.marketing.title,
      items: menus.marketing.items.map((item: string) => {
        const IconComponent = getServiceIcon(item) || getCategoryIcon("marketing");
        return {
          label: item,
          icon: <IconComponent className="h-5 w-5" />
        };
      })
    },
    {
      title: menus.strategy.title,
      items: menus.strategy.items.map((item: string) => {
        const IconComponent = getServiceIcon(item) || getCategoryIcon("strategy");
        return {
          label: item,
          icon: <IconComponent className="h-5 w-5" />
        };
      })
    },
    {
      title: menus.video.title,
      items: menus.video.items.map((item: string) => {
        const IconComponent = getServiceIcon(item) || getCategoryIcon("video");
        return {
          label: item,
          icon: <IconComponent className="h-5 w-5" />
        };
      })
    }
  ];

  // Work section with SSOT icon
  const workSections = [
    {
      title: t("navbar.work"),
      items: menus.work.map((item: string) => ({
        label: item,
        icon: <WORK_ICON className="h-5 w-5" />
      }))
    }
  ];

  // Insights section with SSOT icon
  const insightsSections = [
    {
      title: t("navbar.insights"),
      items: menus.insights.map((item: string) => ({
        label: item,
        icon: <INSIGHTS_ICON className="h-5 w-5" />
      }))
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
