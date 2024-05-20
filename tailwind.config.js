/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4CDC98",
        secondary: {
          DEFAULT: "#141818",
          100: "#EBF3F0",
          200: "#D8E7E3",
        },
        tertary: {
          DEFAULT: "#317B59",
          100: "#DAF8DE",
          200: "#B7F1C5",
        },
        accent: {
          DEFAULT: "#1D9EF4",
          100: "#D1F7FE",
          200: "#A4E9FD",
        },
        darktext: "#41414D",
        info: "#1D9EF4",
        success: "#90C40D",
        danger: "#FF5A4F",
        warning: "#FCB80C",
        background: "#EBEBEB",
      },
      fontFamily: {
        interblack: ["Inter-Black", "sans-serif"],
        interbold: ["Inter-Bold", "sans-serif"],
        interextrabold: ["Inter-ExtraBold", "sans-serif"],
        interextralight: ["Inter-ExtraLight", "sans-serif"],
        interlight: ["Inter-Light", "sans-serif"],
        intermedium: ["Inter-Medium", "sans-serif"],
        interregular: ["Inter-Regular", "sans-serif"],
        intersemibold: ["Inter-SemiBold", "sans-serif"],
        interthin: ["Inter-Thin", "sans-serif"],
      },
    },
  },
  plugins: [],
};
