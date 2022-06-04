module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#34cc98",
          secondary: "#effbf6",
          accent: "#1FB2A6",
          neutral: "#1B1C22",
          "base-100": "#FFFFFF",
          info: "#4CBBD6",
          success: "#1F937C",
          warning: "#DA8F16",
          error: "#DA253D",

          "--rounded-btn": "4rem",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
