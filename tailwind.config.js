module.exports = {
  content: ["./src/**/*.{html,js,astro}"],
  theme: {
    extend: {
      colors: {
        miduconf: {
          orange: {
            100: "#FFC837",
            200: "#FF8008",
          },
          purple: {
            100: "#8227FE",
            200: "#D676EA",
          },
        },
      },
    },
  },
  plugins: [],
}