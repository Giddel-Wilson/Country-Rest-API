/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
	  extend: {
		colors: {
		  // Light Mode
		  'light-bg': 'hsl(0, 0%, 98%)',
		  'light-text': 'hsl(200, 15%, 8%)',
		  'light-input': 'hsl(0, 0%, 52%)',
		  // Dark Mode
		  'dark-bg': 'hsl(207, 26%, 17%)',
		  'dark-elements': 'hsl(209, 23%, 22%)',
		},
		fontFamily: {
		  'nunito-sans': ['Nunito Sans', 'sans-serif'],
		},
		fontSize: {
		  'home': '14px',
		  'detail': '16px',
		},
		fontWeight: {
		  light: 300,
		  semibold: 600,
		  extrabold: 800,
		},
	  },
	},
	plugins: [],
  }