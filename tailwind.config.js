/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      darkpri: "#5a5a5a",
      lightpri: "white",
      darksec: "#5F5D9C",
      lightsec: "#ACB1D6",
      darkacc: "#E5C3A6",
      lightacc: "#FFEAD2",
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
