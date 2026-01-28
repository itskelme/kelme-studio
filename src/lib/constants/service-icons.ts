import {
  // Service icons
  RiGlobalLine,
  RiShoppingBag3Line,
  RiLayoutLine,
  RiBox3Line,
  RiLightbulbLine,
  RiFacebookBoxLine,
  RiMailLine,
  RiSearchLine,
  RiBrushLine,
  RiFigmaLine,
  RiVideoLine,
  RiPaintBrushLine,
  
  // Category icons
  RiCodeSSlashLine,
  RiMegaphoneLine,
  RiPaletteLine,
  RiVideoLine as RiVideoIconLine,
  
  // Work and Insights icons
  RiPenNibLine,
  RiBookOpenLine
} from "@remixicon/react";

/**
 * Service Icons Configuration
 * Single Source of Truth (SSOT) for service icons
 */

export type ServiceIconKey = 
  | 'WordPress'
  | 'Shopify'
  | 'Landing Pages'
  | 'Micro-SaaS'
  | 'MVP'
  | 'Paid Ads'
  | 'Social Media'
  | 'Email Marketing'
  | 'SEO'
  | 'Branding'
  | 'UI/UX Design'
  | 'VSL'
  | 'Creative Ads';

export type CategoryKey = 'development' | 'marketing' | 'strategy' | 'video';

/**
 * Service icons mapping
 */
export const SERVICE_ICONS: Record<ServiceIconKey, React.ComponentType<any>> = {
  "WordPress": RiGlobalLine,
  "Shopify": RiShoppingBag3Line,
  "Landing Pages": RiLayoutLine,
  "Micro-SaaS": RiBox3Line,
  "MVP": RiLightbulbLine,
  "Paid Ads": RiFacebookBoxLine,
  "Social Media": RiMegaphoneLine,
  "Email Marketing": RiMailLine,
  "SEO": RiSearchLine,
  "Branding": RiBrushLine,
  "UI/UX Design": RiFigmaLine,
  "VSL": RiVideoLine,
  "Creative Ads": RiPaintBrushLine
};

/**
 * Category icons mapping
 */
export const CATEGORY_ICONS: Record<CategoryKey, React.ComponentType<any>> = {
  "development": RiCodeSSlashLine,
  "marketing": RiMegaphoneLine,
  "strategy": RiPaletteLine,
  "video": RiVideoIconLine
};

/**
 * Work section icon
 */
export const WORK_ICON = RiPenNibLine;

/**
 * Insights section icon
 */
export const INSIGHTS_ICON = RiBookOpenLine;

/**
 * Get service icon component
 */
export const getServiceIcon = (service: string): React.ComponentType<any> => {
  return SERVICE_ICONS[service as ServiceIconKey] || RiGlobalLine;
};

/**
 * Get category icon component
 */
export const getCategoryIcon = (category: string): React.ComponentType<any> => {
  const normalizedCategory = category.toLowerCase() as CategoryKey;
  return CATEGORY_ICONS[normalizedCategory] || RiCodeSSlashLine;
};
