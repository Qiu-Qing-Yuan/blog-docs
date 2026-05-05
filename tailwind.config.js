/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./docs/.vuepress/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.1)',
        'card-light': '0 1px 2px rgba(0,0,0,0.04)',
        'sidebar': '0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.06)',
        'elevated': '0 8px 30px rgba(0,0,0,0.08)',
        'float': '0 20px 60px rgba(0,0,0,0.1)',
      },
      colors: {
        primary: {
          DEFAULT: '#2c7a5a',
          50: '#f0faf6',
          100: '#d4f0e4',
          200: '#a8e1c9',
          300: '#6ecba5',
          400: '#3eaf7c',
          500: '#2c7a5a',
          600: '#1f5c43',
          700: '#174635',
        },
        accent: '#2d8cf0',
        muted: '#94a3b8',
      },
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', '"STSong"', 'serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
