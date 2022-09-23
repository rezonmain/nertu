/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				music: ["'Noto Music'", 'sans-serif'],
			},
		},
	},
	plugins: [],
};
