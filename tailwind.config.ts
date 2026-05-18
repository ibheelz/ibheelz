import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(0, 0, 0)",
        "bg-hero": "rgb(0, 0, 0)",
        surface: "rgb(20, 20, 20)",
        red: "rgb(255, 0, 0)",
        "red-dim": "rgb(200, 0, 0)",
        "red-glow": "rgba(255, 0, 0, 0.2)",
        green: "rgb(0, 255, 0)",
        white: "rgb(255, 255, 255)",
        gray: "rgb(200, 200, 200)",
        muted: "rgb(120, 120, 120)",
        border: "rgb(60, 60, 60)",
      },
      screens: {
        tablet: "810px",
      },
    },
  },
  plugins: [],
};
export default config;
