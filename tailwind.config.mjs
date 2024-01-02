/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				base: {
					DEFAULT: 'rgba(255, 255, 255, 1)',
					dark: 'rgba(247, 247, 247, 1)',
					darker: 'rgba(227, 227, 227, 1)',
					darkest: 'rgba(6, 12, 28, 1)',
				},
				primary: {
					lighter: 'rgba(117, 151, 234, 1)',
					light: 'rgba(51, 73, 125, 1)',
					DEFAULT: 'rgba(18, 41, 99, 1)',
					dark: 'rgba(9, 27, 74, 1)',
					darker: 'rgba(8, 20, 49, 1)'
				},
				secondary: {
					lighter: 'rgba(229, 234, 244, 1)',
					light: 'rgba(221, 227, 241, 1)',
					DEFAULT: 'rgba(212, 220, 237, 1)',
					dark: 'rgba(170, 176, 190, 1)',
					darker: 'rgba(127, 132, 142, 1)'
				},
				accent: {
					lighter: 'rgba(181, 119, 137, 1)',
					light: 'rgba(156, 74, 97, 1)',
					DEFAULT: 'rgba(131, 29, 58, 1)',
					dark: 'rgba(105, 23, 46, 1)',
					darker: 'rgba(79, 17, 35, 1)'
				}
			},
			fontFamily: {
				sans: ['Avenir', 'Helvetica', 'sans-serif'],
			},
			fontSize: {
				sm: '0.8rem',
				base: '1rem',
				lg: '1.25rem',
				xl: '1.56rem',
				'2xl': ['1.94rem', {
					lineHeight: '125%',
					letterSpacing: '-0.01em',
					fontWeight: '600',
				}],
				'3xl': ['2.44rem', {
					lineHeight: '125%',
					letterSpacing: '-0.02em',
					fontWeight: '600',
				}],
				'4xl': ['3rem', {
					lineHeight: '125%',
					letterSpacing: '-0.02em',
					fontWeight: '600',
				}],
				'5xl': ['3.8rem', {
					lineHeight: '100%',
					letterSpacing: '-0.03em',
					fontWeight: '600',
				}],
				'6xl': ['5.6rem', {
					lineHeight: '100%',
					letterSpacing: '-0.03em',
				}],
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: false,
	},
}

/* Text-size styles */
/* base size: p (16px) */
// --h1: 3.81rem;
// --h2: 3.06rem;
// --h3: 2.44rem;
// --h4: 1.94rem;
// --h5: 1.56rem;
// --h6: 1.25rem;
// --p: 1rem;
// --small: 0.81rem;
