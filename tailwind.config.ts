import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/page/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/entities/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        min826: "826px",
      },
      colors: {
        "accent-green": "#60dcc9",
        "accent-black": "#393944",
        "primary-white": "#f5f5f5",
        "secondary-green": "#37897b",
        "primary-gray": "#999999",
      },
      boxShadow: {
        card: "0 0 0 1px rgba(13, 35, 67, .07), 0 5px 15px -8px rgba(13, 35, 67, .4)",
      },
      fontFamily: {
        dmsans: ["var(--font-dmsans)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
