/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "Ink Noir" — deep aubergine-black, base for night mode
        noir: {
          DEFAULT: '#170B12',
          soft: '#231018',
          deep: '#0D0609'
        },
        // "Champagne Blush" — warm parchment for day mode
        blush: {
          DEFAULT: '#FBEFE9',
          deep: '#F3DCD3',
          paper: '#FBF6EE'
        },
        // "Rose Ember" — primary accent, deep berry rose (not terracotta)
        ember: {
          DEFAULT: '#B23A55',
          light: '#D6647E',
          dark: '#7C2740'
        },
        // "Gold Filigree" — metallic accent for luxury detailing
        filigree: {
          DEFAULT: '#CBA366',
          light: '#E4C88F',
          dark: '#9C7B45'
        },
        // "Plum Velvet" — secondary deep tone for night gradients
        velvet: {
          DEFAULT: '#3E1B36',
          light: '#5A2A4E'
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive']
      },
      boxShadow: {
        glow: '0 0 40px rgba(203,163,102,0.35)',
        ember: '0 0 30px rgba(178,58,85,0.45)'
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(4deg)' }
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-24px) translateX(10px)' }
        },
        fall: {
          '0%': { transform: 'translateY(-10vh) translateX(0) rotate(0deg)', opacity: 0 },
          '10%': { opacity: 1 },
          '100%': { transform: 'translateY(110vh) translateX(40px) rotate(220deg)', opacity: 0 }
        },
        drift: {
          '0%': { transform: 'translateX(-10vw) translateY(0)' },
          '50%': { transform: 'translateX(50vw) translateY(-30px)' },
          '100%': { transform: 'translateX(110vw) translateY(0)' }
        },
        twinkle: {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        heartbeat: 'heartbeat 1.6s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'floatSlow 9s ease-in-out infinite',
        fall: 'fall linear infinite',
        drift: 'drift linear infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        spinSlow: 'spinSlow 8s linear infinite'
      }
    }
  },
  plugins: []
}
