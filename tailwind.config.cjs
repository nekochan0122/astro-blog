const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    fontFamily: {
      serif: ['Inter', ...defaultTheme.fontFamily.serif],
      mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
