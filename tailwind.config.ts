import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{ts,tsx}'],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'var(--border)',
				input: 'var(--input)',
				ring: 'var(--ring)',
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				primary: {
					DEFAULT: 'var(--primary)',
					foreground: 'var(--primary-foreground)',
				},
				secondary: {
					DEFAULT: 'var(--secondary)',
					foreground: 'var(--secondary-foreground)',
				},
				destructive: {
					DEFAULT: 'var(--destructive)',
					foreground: 'var(--destructive-foreground)',
				},
				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'var(--muted-foreground)',
				},
				accent: {
					DEFAULT: 'var(--accent)',
					foreground: 'var(--accent-foreground)',
				},
				popover: {
					DEFAULT: 'var(--popover)',
					foreground: 'var(--popover-foreground)',
				},
				card: {
					DEFAULT: 'var(--card)',
					foreground: 'var(--card-foreground)',
				},
				'text-muted': 'var(--text-muted)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0',
						opacity: '0',
					},
					to: {
						height: 'var(--radix-accordion-content-height)',
						opacity: '100',
					},
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)',
						opacity: '100',
					},
					to: {
						height: '0',
						opacity: '0',
					},
				},
				'scroll-diagonal': {
					'0%': {
						transform: 'translateX(100vw)',
					},
					'100%': {
						transform: 'translateX(-100vw)',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.4s ease-in-out',
				'accordion-up': 'accordion-up 0.4s ease-in-out',
				'scroll-diagonal': 'scroll-diagonal 25s linear infinite',
			},
			textShadow: {
				glow: '0 0 10px rgba(255, 255, 255, 0.5)',
				'glow-lg': '0 0 20px rgba(255, 255, 255, 0.7)',
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		plugin(({ addBase }) => {
			addBase({
				'*': {
					borderColor: 'var(--border)',
				},
				body: {
					backgroundColor: 'var(--background)',
					color: 'var(--foreground)',
				},
				'.text-glow': {
					'text-shadow': '0 0 10px rgba(255, 255, 255, 0.5)',
				},
				'.text-glow-lg': {
					'text-shadow': '0 0 20px rgba(255, 255, 255, 0.7)',
				},
			});
		}),
	],
} satisfies Config;
