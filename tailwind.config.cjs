/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'toyota-red': {
          DEFAULT: '#EB0A1E',
          '10': 'rgba(235, 10, 30, 0.1)',
          '20': 'rgba(235, 10, 30, 0.2)',
          '40': 'rgba(235, 10, 30, 0.4)',
        }
      }
    },
  },
  plugins: [],
}
