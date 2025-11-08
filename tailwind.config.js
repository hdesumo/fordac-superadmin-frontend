/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        fordacGreen: "#1B5E20",
        fordacRed: "#C1121F",
      },
      // 🟩🟥 Définition correcte pour Tailwind 4 :
      backgroundImage: {
        "fordac-gradient":
          "linear-gradient(135deg, #1B5E20 0%, #C1121F 100%)",
      },
    },
  },
  plugins: [],
};
