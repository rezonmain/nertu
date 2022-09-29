/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				music: ["'Noto Music'", 'sans-serif'],
				mono: ["'Roboto Mono'", 'Monaco', 'monospace'],
				sans: [
					'Poppins',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'sans-serif',
				],
			},
			screens: {
				short: { raw: '(max-height: 550px)' },
			},
		},
	},
	plugins: [],
};
