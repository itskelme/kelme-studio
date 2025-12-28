/**
 * Contact Information Constants
 * Single Source of Truth (SSOT) for all contact details
 */

/**
 * Email addresses
 */
export const CONTACT_EMAIL = {
  primary: 'hello@kelme.studio',
  alternative: 'contato@kelmestudio.com',
} as const;

/**
 * Phone numbers
 */
export const CONTACT_PHONE = {
  brazil: {
    number: '+55 48 99151-5420',
    formatted: '+55 48 99151-5420',
    whatsappUrl: 'https://wa.me/5548991515420',
  },
} as const;

/**
 * Community platforms
 */
export const COMMUNITY_PLATFORMS = {
  discord: {
    name: 'Discord',
    url: 'https://discord.gg/kelme-studio',
    inviteUrl: 'https://discord.gg/kelme-studio',
  },
} as const;

/**
 * Office locations
 */
export const OFFICE_LOCATIONS = [
  {
    id: 'florianopolis',
    title: 'Florianópolis',
    address: [
      'Rua Exemplo, 123',
      'Centro',
      'Florianópolis - SC',
      'Brasil',
    ],
    phone: CONTACT_PHONE.brazil.number,
    phoneHref: CONTACT_PHONE.brazil.whatsappUrl,
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
