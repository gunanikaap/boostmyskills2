import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#079845",
          dark: "#1A1A1A",
          muted: "#767676",
          pale: "#EAF3E7",
          wash: "#F6F7F9",
          line: "#EEEEEE"
        }
      },
      fontFamily: {
        sans: ["var(--font-urbanist)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 12px 30px rgba(0, 0, 0, 0.08)"
      }
    }
  },
  plugins: [forms]
};

export default config;
