/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'gradient': 'gradientAnimation 8s ease infinite',
        'fadeInText': 'fadeInText 1s forwards',
      },
      keyframes: {
        gradientAnimation: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        fadeInText: {
          'from': { opacity: 0, transform: 'translateY(-10px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}