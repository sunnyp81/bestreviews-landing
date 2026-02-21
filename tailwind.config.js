/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F4F2EF", // Off-White
        accent: "#1652F0",  // Signal Blue
        background: "#FFFFFF", // Pure White
        supporting: "#111827", // Charcoal
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "sans-serif"],
        drama: ["'DM Serif Display'", "serif"],
        data: ["'Space Mono'", "monospace"],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
