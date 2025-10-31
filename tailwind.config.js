/* @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: false,
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00843e",
        secondary: "#121212",
        accent: "#F59E0B",
        light: "#f2f9f5",
        muted: "#121212CC",
        customgreen: "#1FAF38",
        success: "#10B981",
        error: "#BE0F00",

        customGray: {
          100: "#C6C6C682",
          200: "#F9F9F9",
          300: "#CBCBCB",
        },
        primaryGradient: {
          100: "#B74901",
          200: "#F18E4D",
        },
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(89.05deg, #B74901 0.25%, #F18E4D 98.81%)",
        "dark-gradient":
          "linear-gradient(181.98deg, #000000 1.38%, rgba(0, 0, 0, 0) 98.05%)",

        "light-gradient":
          "linear-gradient(90deg, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0.6) 100%)",
        "bottom-gradient":
          "linear-gradient(188.2deg, rgba(0, 0, 0, 0) 8.04%, #000000 91.58%)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
        boxShadow: {
        'team-card': '0px 9px 17.6px 0px rgba(228, 228, 228, 0.25)',
        'custom-shadow': '0px 0px 10px 0px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
