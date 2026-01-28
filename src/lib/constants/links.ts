/**
 * External Links - Single Source of Truth
 * All external URLs used across the application
 */

export const EXTERNAL_LINKS = {
	// Work Portfolio Links
	STEEZ_DRINK: "https://steez.zarpstudio.com",
	PPPI: "https://pppi.com.br",
	FLIKTA: "https://flikta.zarpstudio.com",
	PONTE_AMERICAS: "https://ponteamericas.com",
	PANDAMI: "https://pandami.zarpstudio.com",

	// Social Media
	INSTAGRAM: "https://instagram.com/zarpstudio",
	LINKEDIN: "https://linkedin.com/company/zarpstudio",
	GITHUB: "https://github.com/zarpstudio",

	// Contact
	EMAIL: "mailto:info@zarpstudio.com",
	WHATSAPP: "https://wa.me/5548991515420",

	// External Resources
	GOOGLE: "https://www.zarpstudio.com/work",
	RDSTATION: "https://www.zarpstudio.com/work/",
} as const;

export type ExternalLink = typeof EXTERNAL_LINKS[keyof typeof EXTERNAL_LINKS];
