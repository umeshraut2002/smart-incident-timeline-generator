/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        panel: "#101828",
        border: "#233148",
        info: "#46b5ff",
        warn: "#ffca5f",
        error: "#ff6b6b",
        success: "#46d3a5"
      },
      boxShadow: {
        panel: "0 24px 80px rgba(8, 15, 31, 0.35)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
