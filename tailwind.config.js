module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'crimson': ['var(--font-crimson-text)', 'serif'],
        'garamond': ['var(--font-eb-garamond)', 'serif'],
        'baskerville': ['var(--font-libre-baskerville)', 'serif'],
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
        'open-sans': ['var(--font-open-sans)', 'sans-serif'],
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
      },
    },
  },
  plugins: [],
}
