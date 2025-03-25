/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ["rich-black"]: "#0D1317",
        ["oxford-blue"]: "#101D42",
        ["auburn"]: "#A52422",
        ["non-photo-blue"]: "#89D2DC",
      },
      animation: {
        "text-slider": "20s infinite forwards text-slider ",
      },
    },
  },
  plugins: [],
};
