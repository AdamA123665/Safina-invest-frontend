module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1a202c',
            },
            h2: {
              fontSize: '2rem',
              fontWeight: '600',
              color: '#2d3748',
            },
            p: {
              fontSize: '1rem',
              lineHeight: '1.8',
              color: '#4a5568',
            },
            a: {
              color: '#3182ce',
              textDecoration: 'underline',
              '&:hover': {
                color: '#2b6cb0',
              },
            },
            img: {
              borderRadius: '8px',
              margin: '16px 0',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

