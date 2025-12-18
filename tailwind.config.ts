import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./layouts/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			screens: {
				xs: "480px",
			},
			fontFamily: {
				sans: ['var(--font-manrope)', 'sans-serif'],
				mono: ['var(--font-space-mono)', 'monospace'],
			},
			colors: {
				// Kelme Studio Custom Colors
				harpia: {
					black: '#030303',
					dark: '#0A0A0A',
					gray: '#1F1F1F',
					gold: '#D4AF37',
					silver: '#C0C0C0'
				},
				emerald: {
					DEFAULT: "var(--color-emerald)",
					light: "var(--color-emerald-light)",
					dark: "var(--color-emerald-dark)",
				},
				blue: "var(--color-blue)",
				yellow: "var(--color-yellow)",
				dark: {
					DEFAULT: "var(--color-dark)",
					card: "var(--color-dark-card)",
				},
				light: "var(--color-light)",
				gray: "var(--color-gray)",
				// Shadcn UI Default Colors
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
			},
			// Adicionar utilitários para background-clip
			backgroundClip: {
				text: 'text',
			},
			keyframes: {
				scan: {
					'0%': { top: '0%' },
					'100%': { top: '100%' }
				},
				blink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' }
				},
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'scan': 'scan 4s linear infinite',
				'blink': 'blink 1s step-end infinite',
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				fadeIn: "fadeIn 0.5s ease-in-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
