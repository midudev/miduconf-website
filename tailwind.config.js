/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/sections/*.{js,ts,jsx,tsx}',
    './src/sections/**/*.{js,ts,jsx,tsx}',
    './src/tickets/components/*.{js,ts,jsx,tsx}',
    './src/twitch/components/*.{js,ts,jsx,tsx}',
    './src/gifts/components/*.{js,ts,jsx,tsx}',
    './src/gifts/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/flavors/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      imageRendering: {
        pixelated: 'pixelated'
      },
      spacing: {
        'spacing-8': '0.5rem',
        'spacing-16': '1rem',
        'spacing-24': '1.5rem',
        'spacing-32': '2rem',
        'spacing-40': '2.5rem',
        'spacing-64': '4rem',
        'spacing-96': '6rem',
        'spacing-180': '11.25rem'
      },
      fontFamily: {
        sans: ['"Inter", sans-serif'],
        code: ['code-regular', 'monospace'],
        cta: ['code-medium', 'monospace'],
        'ibm-plex': 'var(--font-ibm-plex)'
      },
      dropShadow: {
        gift: '3px 4px 8px rgba(0, 0, 0, 0.4)'
      },
      boxShadow: {
        button:
          'inset 0 6px 12px #4C64D2, 0 0 17px rgba(110, 137, 255, 0.77), inset 0 1px 10px rgba(255, 255, 255, 0.55)',
        'button-hover':
          ' inset 0 6px 12px #4C64D2, 0 0 34px rgba(110, 137, 255, 0.77), inset 0 1px 10px rgba(255, 255, 255, 0.55)'
      },
      animation: {
        marquee: 'marquee var(--duration) linear infinite',
        meteor: 'meteor 5s linear infinite',
        'text-gradient': 'text-gradient 1.5s linear infinite',
        spin: 'spin calc(var(--speed) * 2) infinite linear',
        slide: 'slide var(--speed) ease-in-out infinite alternate'
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-50% - var(--gap)/2))' }
        },
        'text-gradient': {
          to: {
            backgroundPosition: '200% center'
          }
        },
        spin: {
          '0%': {
            rotate: '0deg'
          },
          '15%, 35%': {
            rotate: '90deg'
          },
          '65%, 85%': {
            rotate: '270deg'
          },
          '100%': {
            rotate: '360deg'
          }
        },
        slide: {
          to: {
            transform: 'translate(calc(100cqw - 100%), 0)'
          }
        },
        meteor: {
          '0%': { transform: 'rotate(-40deg) translateX(0)', opacity: 0 },
          '30%': { opacity: 1 },
          '100%': {
            transform: 'rotate(-40deg) translateX(-500px)',
            opacity: 0
          }
        }
      },
      screens: {
        base: '1000px'
      },
      colors: {
        neutral: {
          black: '#0F0F0F',
          white: '#ffffff'
        },
        palette: {
          background: '#09090E',
          ghost: '#9297A6',
          'bg-foreground-primary': '#121319',
          primary: '#5A8CF6',
          'border-primary': '#95B8FB',
          'bg-foreground-secondary': '#5A8CF6',
          default: '#EFF4FF',
          'border-foreground': '#1E1F26'
        },
        twitch: '#6441a5'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        button: 'linear-gradient(to bottom, #3152DF95, #1E254595)'
      }
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwindcss-textshadow'),
    require('@midudev/tailwind-animations')
  ]
}
