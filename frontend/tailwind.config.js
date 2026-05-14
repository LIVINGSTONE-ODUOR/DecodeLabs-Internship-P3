/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      },
      colors: {
        primary: { DEFAULT: '#0A66FF', 50: '#EFF6FF', 100: '#DBEAFE', 500: '#0A66FF', 600: '#0756D6', 700: '#0648B4', 900: '#082A63' },
        secondary: { DEFAULT: '#06B6D4', 50: '#ECFEFF', 100: '#CFFAFE', 500: '#06B6D4', 600: '#0891B2', 700: '#0E7490' },
        accent: { DEFAULT: '#8B5CF6', 500: '#8B5CF6', 600: '#7C3AED' },
        dark: '#0F172A',
        light: '#F8FAFC',
        success: '#10B981',
        error: '#F43F5E',
        warning: '#F59E0B'
      },
      spacing: {
        18: '4.5rem', 22: '5.5rem', 26: '6.5rem', 30: '7.5rem', 34: '8.5rem'
      },
      boxShadow: {
        glass: '0 24px 80px rgba(15, 23, 42, 0.14)',
        glow: '0 20px 60px rgba(10, 102, 255, 0.34)',
        teal: '0 18px 45px rgba(6, 182, 212, 0.25)'
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-18px)' } },
        gradientShift: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        pulseGlow: { '0%,100%': { boxShadow: '0 0 0 0 rgba(10,102,255,.4)' }, '50%': { boxShadow: '0 0 0 14px rgba(10,102,255,0)' } }, shake: { '0%,100%': { transform: 'translateX(0)' }, '35%': { transform: 'translateX(-5px)' }, '70%': { transform: 'translateX(5px)' } }
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        gradient: 'gradientShift 8s ease infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
