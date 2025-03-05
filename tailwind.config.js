/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        PrimaryDark: "#171717",
        LightDark: "#8C8C8C",
        AccentViolet: "#7B44F2",
        TeriaryDark: "#BFBFBF",
        AccentGreen: "#CAF272",
      },
    },
  },
  plugins: [],
};
