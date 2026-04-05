/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#000000',
          lighter: '#0a0a0a',
          light: '#121212',
          card: '#0d0d0d',
        },
        purple: {
          DEFAULT: '#A855F7',
          light: '#C084FC',
          dark: '#9333EA',
          bright: '#B96EF7',
        },
        accent: {
          DEFAULT: '#A855F7',
          hover: '#9333EA',
        },
        profit: '#22C55E',
        loss: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
        'gradient-purple-dark': 'linear-gradient(135deg, #9333EA 0%, #6B21A8 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, #1a0a2e 0%, #000000 70%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
