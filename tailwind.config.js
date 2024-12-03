module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
// tailwind.config.js

module.exports = {
  // ...
  plugins: [
    require('@tailwindcss/line-clamp'),
    // Add other plugins if necessary
  ],
};
