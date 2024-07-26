/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: { light: "#0f0f0f", dark: "#f1f1f1" },
        background: { light: "#f1f1f1", dark: "#0f0f0f" },
        primary: { light: "#b4e193", dark: "#3e6c1e" },
        secondary: { light: "#4b8820", dark: "#a2df77" },
        accent: { light: "#77d733", dark: "#6dcc28" },
      },
    },
  },
  plugins: [],
};
