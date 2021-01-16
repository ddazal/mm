module.exports = {
  purge: ["./src/**/*.{html,ts}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        "dodger-blue": "#0496ff",
        blue: "#0331f4",
        lava: "#c42021",
        ruby: "#d81159",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
