import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#FAF7F2",
          100: "#F5EFE6",
          200: "#EBE0D0",
          300: "#DFD0B8",
          400: "#D4C0A0",
          500: "#C9B088",
        },
        leather: {
          50: "#F7F3EF",
          100: "#EBE0D4",
          200: "#D4C4B0",
          300: "#B8956E",
          400: "#9A7349",
          500: "#7A5632",
          600: "#5C4025",
          700: "#3E2B19",
          800: "#2A1D11",
          900: "#1A1209",
        },
        maroon: {
          50: "#FDF2F4",
          100: "#F9E0E5",
          200: "#EFB8C4",
          300: "#DF8499",
          400: "#C94D6A",
          500: "#8B1538",
          600: "#6B1029",
          700: "#4D0B1D",
          800: "#330812",
          900: "#1F050B",
        },
        gold: {
          50: "#FBF7ED",
          100: "#F5EBD0",
          200: "#EBD59F",
          300: "#DFBD6A",
          400: "#D4A843",
          500: "#C4942A",
          600: "#A67A22",
          700: "#7A5A19",
          800: "#523C11",
          900: "#2E2209",
        },
        royal: {
          DEFAULT: "#8B1538",
          light: "#C94D6A",
          dark: "#4D0B1D",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "desert-gradient":
          "linear-gradient(135deg, #FAF7F2 0%, #F5EFE6 40%, #EBE0D0 100%)",
        "royal-gradient":
          "linear-gradient(135deg, #8B1538 0%, #6B1029 50%, #4D0B1D 100%)",
        "gold-shimmer":
          "linear-gradient(90deg, #C4942A 0%, #DFBD6A 50%, #C4942A 100%)",
        "pattern-overlay":
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C4942A' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        shimmer: "shimmer 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        luxury: "0 4px 30px rgba(139, 21, 56, 0.08)",
        "luxury-lg": "0 8px 40px rgba(139, 21, 56, 0.12)",
        gold: "0 4px 20px rgba(196, 148, 42, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
