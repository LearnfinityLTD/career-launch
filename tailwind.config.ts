// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all files in the src directory
    "./components/**/*.{js,ts,jsx,tsx}", // Scans all files in the components directory (if you have it)
    "./pages/**/*.{js,ts,jsx,tsx}", // Scans all files in the pages directory (if you have it)
  ],

  theme: {
    extend: {
      colors: {
        "primary-dark": "#0F0E17",
        "primary-light": "#A7A9BE",
        accent: "#FF8906",
        background: "#0D0D0D",
      },
      animation: {
        scroll: "scroll 30s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },

  plugins: [],
};
