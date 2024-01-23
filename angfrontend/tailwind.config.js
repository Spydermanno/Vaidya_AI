/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-img": "url('assets/bg.png')",
      },
    },
  },
  plugins: [],
};
