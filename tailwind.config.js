// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0F0E17',       // Dark for text or accents
         // Light gray for text
        'accent': '#FF8906',             // Accent color
        'background': '#F8F9FB',         // Update to a light background color
      },
    },
  },
  plugins: [],
};
