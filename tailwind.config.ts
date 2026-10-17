import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        kiro: {
          DEFAULT: "#6366F1",
          deep: "#4F46E5",
        },
        tide: {
          DEFAULT: "#06B6D4",
          deep: "#0284C7",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 60px -20px rgba(99, 102, 241, 0.65)",
        "glow-cyan": "0 20px 60px -20px rgba(6, 182, 212, 0.55)",
        "glow-white": "0 20px 50px -24px rgba(255, 255, 255, 0.45)",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "spin-border": {
          to: { "--angle": "360deg" },
        },
        shine: {
          "0%": { transform: "translateX(-130%) skewX(-20deg)" },
          "100%": { transform: "translateX(230%) skewX(-20deg)" },
        },
      },
      animation: {
        gradient: "gradient 7s ease infinite",
        "spin-border": "spin-border 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
