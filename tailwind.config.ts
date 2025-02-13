import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#BFD1E6",
          200: "#BFD1D6",
          300: "#201E74",
        },
        gold: "#E0B435",
        "subtle-light": "#FFFFFC",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
