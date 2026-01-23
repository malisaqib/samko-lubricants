import { Inter } from "next/font/google";

// Clean, minimalist font - Apple-style aesthetic
// Inter is the closest open-source alternative to Apple's San Francisco
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Font class names for consistent usage across the app
export const fontVariables = `${inter.variable}`;
export const fontClassName = "font-sans antialiased";
