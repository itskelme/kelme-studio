/**
 * Navigation Constants
 * Single Source of Truth (SSOT) for navigation structure
 */

/**
 * Main navigation items
 */
export const NAV_ITEMS = {
  services: {
    key: 'services',
    hasDropdown: true,
  },
  work: {
    key: 'work',
    href: '/work',
    hasDropdown: false,
  },
  about: {
    key: 'about',
    href: '/about',
    hasDropdown: false,
  },
  insights: {
    key: 'insights',
    hasDropdown: true,
  },
  contact: {
    key: 'contact',
    href: '/contact',
    hasDropdown: false,
  },
} as const;

/**
 * Insights menu items with routes
 */
export const INSIGHTS_MENU_ITEMS = {
  blog: {
    key: 'blog',
    href: '/blog',
  },
  tools: {
    key: 'tools',
    href: '/tools',
  },
} as const;

/**
 * Work menu items with routes
 */
export const WORK_MENU_ITEMS = {
  recentProjects: {
    key: 'recentProjects',
    href: '/work#recent',
  },
  caseStudies: {
    key: 'caseStudies',
    href: '/work#case-studies',
  },
  successStories: {
    key: 'successStories',
    href: '/work#success-stories',
  },
} as const;

/**
 * Services menu items - organized by category
 */
export const SERVICES_MENU_ITEMS = {
  development: {
    webDevelopment: { key: 'webDevelopment', href: '/services/web-development' },
    mobileDevelopment: { key: 'mobileDevelopment', href: '/services/mobile-development' },
    ecommerce: { key: 'ecommerce', href: '/services/ecommerce' },
  },
  marketing: {
    seo: { key: 'seo', href: '/services/seo' },
    paidAds: { key: 'paidAds', href: '/services/paid-ads' },
    emailMarketing: { key: 'emailMarketing', href: '/services/email-marketing' },
  },
  strategy: {
    branding: { key: 'branding', href: '/services/branding' },
    uxResearch: { key: 'uxResearch', href: '/services/ux-research' },
  },
  video: {
    vsl: { key: 'vsl', href: '/services/vsl' },
    creativeAds: { key: 'creativeAds', href: '/services/creative-ads' },
  },
} as const;

/**
 * Services menu categories
 */
export const SERVICES_CATEGORIES = {
  development: 'development',
  marketing: 'marketing',
  strategy: 'strategy',
  video: 'video',
} as const;

/**
 * Footer navigation sections
 */
export const FOOTER_SECTIONS = {
  sitemap: {
    items: [
      { key: 'home', href: '/' },
      { key: 'work', href: '/#work' },
      { key: 'services', href: '/#services' },
      { key: 'pricing', href: '/#pricing' },
    ],
  },
  resources: {
    items: [
      { key: 'insights', href: '/blog', badge: 'NEW' },
      { key: 'careers', href: '/careers' },
      { key: 'faq', href: '/#faq' },
      { key: 'brandAssets', href: '#' },
    ],
  },
} as const;

/**
 * Legal pages
 */
export const LEGAL_PAGES = {
  privacyPolicy: {
    key: 'privacyPolicy',
    href: '/privacy-policy',
  },
  termsOfService: {
    key: 'termsOfUse',
    href: '/terms',
  },
} as const;

/**
 * Helper function to get navigation item by key
 */
export const getNavItem = (key: keyof typeof NAV_ITEMS) => {
  return NAV_ITEMS[key];
};

/**
 * Helper function to check if nav item has dropdown
 */
export const hasDropdown = (key: keyof typeof NAV_ITEMS): boolean => {
  return NAV_ITEMS[key].hasDropdown;
};

/**
 * Helper to get service URL by category and service key
 */
export const getServiceUrl = (category: keyof typeof SERVICES_MENU_ITEMS, serviceKey: string): string => {
  const categoryItems = SERVICES_MENU_ITEMS[category];
  const service = Object.values(categoryItems).find(item => item.key === serviceKey);
  return service?.href || '#';
};

/**
 * Helper to get insights URL by key
 */
export const getInsightsUrl = (key: string): string => {
  const item = Object.values(INSIGHTS_MENU_ITEMS).find(item => item.key === key);
  return item?.href || '#';
};

/**
 * Helper to get work URL by key
 */
export const getWorkUrl = (key: string): string => {
  const item = Object.values(WORK_MENU_ITEMS).find(item => item.key === key);
  return item?.href || '#';
};
