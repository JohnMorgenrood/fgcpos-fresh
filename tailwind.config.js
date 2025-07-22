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
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        accent: '#dc2626',
        flame: {
          orange: '#f97316',
          red: '#dc2626',
          yellow: '#fbbf24',
        }
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
