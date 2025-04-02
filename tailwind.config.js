/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        fontFamily: {
            sans: ['Nunito', 'sans-serif']
        },
        colors: {
          primary: "#FF8000",
          white: "#FFFFFF",
          black: "#2C2C2C",
          gray: {
            light: "#E8E8E8",
            normal: "#E1E1E1",
            strong: "#6C6C6C"
          },
        },
    },
  },
  plugins: [],
};