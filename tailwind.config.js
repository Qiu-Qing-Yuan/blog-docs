/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./docs/.vuepress/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        box: '0 1px 8px 0 rgba(0, 0, 0, 0.1)',
        item: '0 1px 8px 0 rgba(0, 0, 0, 0.1)',
        card: '0 4px 16px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 32px rgba(0, 0, 0, 0.15)',
        'card-light': '0 2px 12px rgba(0, 0, 0, 0.06)',
        sidebar: '0 4px 24px rgba(0, 0, 0, 0.08)',
      },
      colors: {
        primary: '#3eaf7c'
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
