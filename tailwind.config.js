module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        baskerville: ['var(--font-libre-baskerville)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        'open-sans': ['var(--font-open-sans)', 'sans-serif'],
        'maple-mono': ['Maple Mono', 'monospace'],
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
