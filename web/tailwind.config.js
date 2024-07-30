/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#236E45",
        dark: "#3B3B3B",
        gray: "#333333",
      },
    },
    styles: {
      "::-webkit-scrollbar": {
        width: "5px",
      },
      "::-webkit-scrollbar-track": {
        background: "#236E45)",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: " #236E45)",
      },
      scrollbarWidth: "thin",
      scrollbarColor: "#236E45",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
