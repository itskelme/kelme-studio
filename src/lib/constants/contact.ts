/**
 * Contact Information Constants
 * Single Source of Truth (SSOT) for all contact details
 */

/**
 * Email addresses
 */
export const CONTACT_EMAIL = {
  primary: 'info@zarpstudio.com',
  brazil: 'info@zarpstudio.com',
} as const;

/**
 * Phone numbers
 */
export const CONTACT_PHONE = {
  us: {
    number: '+13213332825',
    formatted: '+1 (321) 333-2825',
    telUrl: 'tel:+13213332825',
  },
  brazil: {
    number: '+55 48 99151-5420',
    formatted: '+55 48 99151-5420',
    whatsappUrl: 'https://wa.me/5548991515420',
    telUrl: 'tel:+5548991515420',
  },
} as const;

/**
 * Community platforms
 */
export const COMMUNITY_PLATFORMS = {
  discord: {
    name: 'Discord',
    url: 'https://discord.gg/zarp-studio',
    inviteUrl: 'https://discord.gg/zarp-studio',
  },
} as const;

/**
 * Office locations
 */
export const OFFICE_LOCATIONS = [
  {
    id: 'orlando',
    title: 'Orlando',
    address: [
      'Orlando',
      'Florida',
      'United States',
    ],
    phone: CONTACT_PHONE.us.number,
    phoneHref: CONTACT_PHONE.us.telUrl,
    whatsappHref: CONTACT_PHONE.brazil.whatsappUrl,
  },
] as const;

/**
 * Helper functions
 */
export const getEmailHref = (email: string = CONTACT_EMAIL.primary): string => {
  return `mailto:${email}`;
};

export const getWhatsAppHref = (phone: string = CONTACT_PHONE.brazil.whatsappUrl): string => {
  return phone;
};
