/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // active le mode sombre via la classe .dark
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1b5e20", // vert profond FORDAC
          light: "#4caf50",   // vert clair
          dark: "#0f3a12",
        },
        secondary: {
          DEFAULT: "#6ee76f",
          dark: "#4fbf53",
          light: "#a9f5a5",
        },
        neutral: {
          DEFAULT: "#f4f1ee",
          dark: "#1e1e1e",
          light: "#ffffff",
        },
        success: "#2e7d32",
        warning: "#ffb300",
        danger: "#e53935",
        info: "#29b6f6",
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.1)",
        medium: "0 6px 16px rgba(0, 0, 0, 0.15)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
