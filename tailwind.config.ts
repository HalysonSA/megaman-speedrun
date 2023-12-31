import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        mega: ["Lexend Mega", "sans-serif"],
      },
      boxShadow: {
        blue: "0px 5px 10px 0px #1E40AF",
        blueLg: "0px 5px 40px 0px #1E40AF",
      },
    },
  },
  plugins: [],
};
export default config;
