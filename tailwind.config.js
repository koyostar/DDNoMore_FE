/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        darkpri: "#5a5a5a",
        lightpri: "white",
        darksec: "#5F5D9C",
        lightsec: "#ACB1D6",
        darkacc: "#E5C3A6",
        lightacc: "#FFEAD2",
        disabled: "#ACB1D6",
        enabled: "#5F5D9C",
      },
      backgroundImage: {
        productivitybg: "url('/public/background.png')",
      },
    },
  },
  plugins: [],
};
