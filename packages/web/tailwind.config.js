const defaultTheme = require("tailwindcss/defaultTheme");

/**
 * @type {import("@types/tailwindcss/tailwind-config").TailwindConfig }
 */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontWeight: {
      medium: 500,
      semibold: 600,
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#FF9400",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
