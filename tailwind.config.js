// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // Define your custom color palette
      colors: {
        // Primary Colors
        'primary-green': '#066b06',       // Primary Green
        'sage': '#e2eac2',                 // Sage
        'deep-teal': '#0a4c4c',            // Deep Teal
        'gold': '#c49b3c',                 // Gold
        'light-background': '#f7f9f3',     // Light Background
        'deep-brown': '#2c1810',           // Deep Brown

        // Supporting Colors
        'olive-green': '#88a359',          // Olive Green
        'dark-green': '#044d04',           // Dark Green
        'light-gold': '#f4e9d1',           // Light Gold
      },

      // Extend font families
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
      },

      // Extend typography settings
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: 'Work Sans, sans-serif',
            h1: {
              fontSize: '2.5rem',
              fontWeight: '700',
              color: theme('colors.deep-brown'), // Deep Brown
              fontFamily: 'Work Sans, sans-serif',
            },
            h2: {
              fontSize: '2rem',
              fontWeight: '600',
              color: theme('colors.deep-brown'), // Deep Brown
              fontFamily: 'Work Sans, sans-serif',
            },
            p: {
              fontSize: '1rem',
              lineHeight: '1.8',
              color: theme('colors.deep-brown'), // Deep Brown
              fontFamily: 'Work Sans, sans-serif',
            },
            a: {
              color: theme('colors.primary-green'), // Primary Green
              textDecoration: 'underline',
              fontFamily: 'Work Sans, sans-serif',
              '&:hover': {
                color: theme('colors.dark-green'), // Dark Green
              },
            },
            img: {
              borderRadius: '8px',
              margin: '16px 0',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
