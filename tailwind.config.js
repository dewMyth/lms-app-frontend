/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {},
      colors: {},
      backgroundImage: {
        // "hero-pattern": "url('/src/assets/new-bg.webp')",
        "hero-pattern": "url('/src/assets/bg-img.png')",
        "maths-bg": "url('/src/assets/maths-bg.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
