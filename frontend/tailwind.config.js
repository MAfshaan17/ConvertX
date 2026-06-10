/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0f172a", // slate-900
        cardBg: "rgba(30, 41, 59, 0.7)", // slate-800 with opacity for glass effect
        primary: "#3b82f6", // blue-500
        accent: "#10b981", // emerald-500
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
