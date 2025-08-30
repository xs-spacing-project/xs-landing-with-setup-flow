/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        'brand-dark': '#0A0C10',
        'brand-light': '#F5F5F7',
        'brand-accent': '#1C5BFF',
        'brand-accent-hover': '#1c5bffb3',
        'brand-secondary': '#A1A1AA',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    }
  },
  plugins: [],
}