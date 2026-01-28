import { PHONE_CONFIG, CountryCode } from "./types";

// Apply phone mask based on country configuration
export function applyPhoneMask(value: string, country: CountryCode): string {
  const digits = value.replace(/\D/g, "");
  const config = PHONE_CONFIG[country];
  const limitedDigits = digits.slice(0, config.maxDigits);
  
  let result = "";
  let digitIndex = 0;
  
  for (const char of config.mask) {
    if (digitIndex >= limitedDigits.length) break;
    if (char === "#") {
      result += limitedDigits[digitIndex];
      digitIndex++;
    } else {
      result += char;
    }
  }
  
  return result;
}

// Get raw digits from masked phone value
export function getPhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number by country
export function isValidPhone(phone: string, country: CountryCode): boolean {
  const digits = getPhoneDigits(phone);
  const config = PHONE_CONFIG[country];
  return digits.length === config.maxDigits;
}

// Format phone with country code for submission
export function formatPhoneWithCountryCode(phone: string, country: CountryCode): string {
  const config = PHONE_CONFIG[country];
  return `${config.code} ${phone}`;
}
