/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        darkShade: "#011716",
        lightShade: "#06C2B3",
        textShade: "#DADADA"
      }
    }
  },
  plugins: [],
}