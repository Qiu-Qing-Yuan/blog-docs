/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./docs/.vuepress/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.05), 0 16px 40px rgba(0,0,0,0.08)',
        'card-light': '0 1px 2px rgba(0,0,0,0.03)',
        'sidebar': '0 1px 3px rgba(0,0,0,0.03), 0 6px 24px rgba(0,0,0,0.04)',
        'elevated': '0 8px 30px rgba(0,0,0,0.06)',
        'float': '0 20px 60px rgba(0,0,0,0.08)',
      },
      colors: {
        primary: {
          DEFAULT: '#1a5c3a',
          50: '#f0f7f3',
          100: '#d4eadd',
          200: '#a8d5bb',
          300: '#6ecba5',
          400: '#3eaf7c',
          500: '#1a5c3a',
          600: '#154a2f',
          700: '#103824',
        },
        accent: {
          DEFAULT: '#2d8cf0',
          warm: '#c9963b',
        },
        muted: '#9494a8',
      },
      fontFamily: {
        sans: ['"Source Sans 3"', '"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        serif: ['"Playfair Display"', '"Noto Serif SC"', '"Source Han Serif SC"', 'serif'],
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
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
