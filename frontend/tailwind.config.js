/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        prompt: ["font-prompt", "sans-serif"],
      },
      colors: {
        "brand-primary-green": "#033330",
        "brand-primary-yellow": "#F9BC07",
        "brand-primary-white": "#fff",
        primary: "#03A9F4",
      },
    },
  },
  plugins: [],
};
