/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cardiac: {
          50: '#fdf2f2',
          100: '#fce7e7',
          500: '#e74c3c',
          600: '#c0392b',
          700: '#a93226',
          900: '#78281f',
        }
      }
    },
  },
  plugins: [],
}
