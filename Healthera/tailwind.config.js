/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { light: "#50c352", dark: "#3caf3e" },
        secondary: { light: "#9bc09c", dark: "#3f6440" },
        accent: { light: "#37fb3a", dark: "#04c807" },
        text: { light: "#0f0f0f", dark: "#f1f1f1" },
        background: { light: "#f1f1f1", dark: "#0f0f0f" },
      },
    },
  },
  plugins: [],
};
