/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
       animation: {
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [require("daisyui")], // <--- this line is VERY IMPORTANT
  daisyui: {
  themes: ["dark", "light","cupcake", "dracula", "synthwave", "retro", "cyberpunk","luxury", "night", "halloween", "garden", "forest", "aqua", "business", "acid", "lemonade", "coffee", "valentine", "fantasy", "wireframe", "emerald"],
},

}
