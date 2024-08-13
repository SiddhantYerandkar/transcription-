/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out',
        bounce: 'bounce 3s infinite',
        slideInUp: 'slideInUp 1s ease-out',
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [function({ addUtilities }) {
    addUtilities({
      '.perspective': {
        perspective: '1000px',
      },
    });
  }],
}

