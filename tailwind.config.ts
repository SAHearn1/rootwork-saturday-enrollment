import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        evergreen: {
          light: '#4A7C59',
          DEFAULT: '#2C5530',
          dark: '#1B3A1E',
        },
        'gold-leaf': {
          light: '#E8D5A9',
          DEFAULT: '#D4AF37',
          dark: '#B8941F',
        },
        canvas: {
          light: '#F5F5DC',
          cream: '#FFF8DC',
        },
      },
    },
  },
  plugins: [],
};
export default config;
