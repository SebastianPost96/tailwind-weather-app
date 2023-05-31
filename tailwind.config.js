/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        panel: { bg: "var(--panel-bg)", border: "var(--panel-border)" },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
