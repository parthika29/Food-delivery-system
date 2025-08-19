/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
        },
        secondary: {
          50: '#f8fafc',
        },
        accent: {
          50: '#fdf2f8',
        }
      },
      fontFamily: {
        heading: ['ui-serif', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
