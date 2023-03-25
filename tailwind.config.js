/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        khaki: "rgb(99, 80, 10)",
        lkhaki: "rgb(190, 175, 154)",
        blood: "rgb(132, 35, 0)",
        darkg: "rgb(39, 43, 42)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
