// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure this path matches your project structure
  theme: {
    extend: {
      colors: {
        'midnight-blue': '#191970',
        gold: '#FFD700',
        white: '#FFFFFF',
        'light-turquoise': '#AFEEEE',
        'soft-green': '#90EE90',
      },
      backgroundImage: theme => ({
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }),
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    // Add other plugins if necessary
  ],
};

