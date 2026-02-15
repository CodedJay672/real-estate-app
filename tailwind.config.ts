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
        dark: {
          50: "#5e5e5e",
          100: "#303030",
          200: "#000000",
        },
        light: {
          50: "#ffffff",
          100: "#c6c6c6",
          200: "#919191",
        },
        primary: {
          DEFAULT: "#020873",
          light: "#48358f",
        },
        seconday: {
          light: {
            50: "#303030",
            100: "#000000",
          },
          dark: {
            50: "#ffffff",
            100: "#919191",
          },
        },
        accent: {
          bright: "#F2E205",
          brown: "#D9A036",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
} satisfies Config;
