import {
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiTwitterXLine,
  RiGithubLine
} from "@remixicon/react";

/**
 * Social Media Configuration
 * Single Source of Truth (SSOT) for social media platforms
 */

export interface SocialMediaPlatform {
  name: string;
  displayName: string;
  icon: React.ComponentType<any>;
  baseUrl: string;
  username: string;
}

/**
 * Social media platform identifiers
 */
export type SocialPlatformKey = 'Instagram' | 'LinkedIn' | 'Twitter' | 'X' | 'GitHub';

/**
 * Social media icon mapping
 */
export const SOCIAL_ICONS: Record<SocialPlatformKey, React.ComponentType<any>> = {
  Instagram: RiInstagramLine,
  LinkedIn: RiLinkedinBoxLine,
  Twitter: RiTwitterXLine,
  X: RiTwitterXLine,
  GitHub: RiGithubLine
};

/**
 * Social media platform configurations
 */
export const SOCIAL_MEDIA_PLATFORMS: Record<SocialPlatformKey, SocialMediaPlatform> = {
  Instagram: {
    name: 'Instagram',
    displayName: 'Instagram',
    icon: RiInstagramLine,
    baseUrl: 'https://instagram.com',
    username: 'zarpstudio'
  },
  LinkedIn: {
    name: 'LinkedIn',
    displayName: 'LinkedIn',
    icon: RiLinkedinBoxLine,
    baseUrl: 'https://linkedin.com/in/company',
    username: 'zarpstudio'
  },
  Twitter: {
    name: 'Twitter',
    displayName: 'X',
    icon: RiTwitterXLine,
    baseUrl: 'https://twitter.com',
    username: 'itskelme'
  },
  X: {
    name: 'X',
    displayName: 'X',
    icon: RiTwitterXLine,
    baseUrl: 'https://x.com',
    username: 'itskelme'
  }
};

/**
 * Get social media icon component
 */
export const getSocialIcon = (platform: string): React.ComponentType<any> => {
  const normalizedPlatform = platform === "Twitter" ? "X" : platform;
  return SOCIAL_ICONS[normalizedPlatform as SocialPlatformKey] || RiInstagramLine;
};

/**
 * Get social media profile URL
 */
export const getSocialUrl = (platform: string): string => {
  const normalizedPlatform = platform === "Twitter" ? "X" : platform;
  const config = SOCIAL_MEDIA_PLATFORMS[normalizedPlatform as SocialPlatformKey];
  
  if (!config) return '#';
  
  return `${config.baseUrl}/${config.username}`;
};

/**
 * Get social media display name
 */
export const getSocialDisplayName = (platform: string): string => {
  const normalizedPlatform = platform === "Twitter" ? "X" : platform;
  const config = SOCIAL_MEDIA_PLATFORMS[normalizedPlatform as SocialPlatformKey];
  
  return config?.displayName || platform;
};
