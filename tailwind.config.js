/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'floating-1': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(-15deg)' },
          '50%': { transform: 'translate(-10px, 15px) rotate(-12deg)' }
        },
        'floating-2': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(10deg)' },
          '50%': { transform: 'translate(15px, -10px) rotate(13deg)' }
        },
        'floating-3': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(5deg)' },
          '50%': { transform: 'translate(-5px, 10px) rotate(8deg)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        'floating-1': 'floating-1 6s ease-in-out infinite',
        'floating-2': 'floating-2 7s ease-in-out infinite',
        'floating-3': 'floating-3 8s ease-in-out infinite',
        'fade-in': 'fade-in 1s ease-out forwards'
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
      }
    }
  },
  plugins: []
};