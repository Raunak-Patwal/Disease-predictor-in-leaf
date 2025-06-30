/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Override Tailwind color palette with safe RGB variants
        primary: colors.green,
        secondary: colors.red,
        neutral: colors.gray,
        background: colors.zinc,
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
      },
    },
  },

  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        customtheme: {
          primary: "#22c55e",     // Green
          secondary: "#ef4444",   // Red
          accent: "#3b82f6",      // Blue
          neutral: "#1f2937",     // Gray-800
          "base-100": "#1e1e1e",  // Dark base
        },
      },
      // optional: keep other themes too
      "dark",
      "light",
      "cupcake",
      "dracula",
      "synthwave",
      "retro",
      "cyberpunk",
      "luxury",
      "night",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "business",
      "acid",
      "lemonade",
      "coffee",
      "valentine",
      "fantasy",
      "wireframe",
      "emerald",
    ],
  },

  corePlugins: {
    preflight: false, // optional but avoids base conflicts
  },

  experimental: {
    optimizeUniversalDefaults: true,
  },
};
