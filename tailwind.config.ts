import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#0A0A0F',
        'surface-1': '#0F0F1A',
        'surface-2': '#141420',
        card: '#12121E',
        'card-hover': '#1A1A2A',
        border: 'rgba(255,255,255,0.08)',
        accent: '#6366F1',
        'accent-2': '#8B5CF6',
        'accent-3': '#06B6D4',
        gold: '#F59E0B',
        text: '#F1F5F9',
        muted: '#94A3B8',
        subtle: '#475569',
      },
      boxShadow: {
        glow: '0 0 60px rgba(99,102,241,0.15)',
        'glow-sm': '0 0 30px rgba(99,102,241,0.1)',
        'glow-cyan': '0 0 40px rgba(6,182,212,0.12)',
        card: '0 4px 32px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 48px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'hero-mesh': `
          radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.12) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 60% 80%, rgba(6,182,212,0.06) 0%, transparent 50%)
        `,
        'section-fade': 'linear-gradient(180deg, transparent 0%, rgba(10,10,15,0.8) 100%)',
        'card-glass': 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        'accent-gradient': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%)',
        'text-gradient': 'linear-gradient(135deg, #F1F5F9 0%, #94A3B8 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'border-flow': 'borderFlow 3s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.2)' },
          '50%': { boxShadow: '0 0 60px rgba(99,102,241,0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}

export default config
