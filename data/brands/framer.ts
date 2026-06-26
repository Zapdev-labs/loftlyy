import type { Brand } from "@/lib/types"

export const framer: Brand = {
  slug: "framer",
  name: "Framer",
  description:
    "Framer is an AI-powered website builder that lets designers and teams create, manage, and publish professional, responsive sites without writing code. Founded in Amsterdam in 2014 by Koen Bok and Jorn van Dijk, it evolved from a design prototyping tool into a full publishing platform combining a freeform canvas, CMS, and high-performance hosting.",
  url: "https://www.framer.com",
  industry: "saas",
  categories: ["saas", "ai", "geometric-logos", "minimal-logos"],
  tags: ["no-code", "design", "design-tools", "prototyping", "ai"],
  colors: [
    {
      name: "Framer Blue",
      hex: "#0099FF",
      usage: "Bright primary accent for highlights and interactive elements.",
    },
    {
      name: "Framer Deep Blue",
      hex: "#0055FF",
      usage: "Core brand blue used in the logo mark and key UI.",
    },
    {
      name: "Black",
      hex: "#000000",
      usage: "Primary text and the logo on light backgrounds.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Backgrounds and the logo on dark backgrounds.",
    },
  ],
  typography: [
    {
      name: "Lexend Giga",
      role: "Display / Headlines",
      weights: ["700"],
      category: "sans-serif",
      designer: "Bonnie Shaver-Troup, Thomas Jockin",
      foundry: "Google Fonts",
      fontUrl: "/brands/framer/fonts/lexend-giga-bold.woff2",
    },
    {
      name: "Urbanist",
      role: "Body / UI",
      weights: ["500", "800"],
      category: "sans-serif",
      designer: "Corey Hu",
      foundry: "Google Fonts",
      fontUrl: "/brands/framer/fonts/urbanist-medium.woff2",
    },
  ],
  assets: [
    {
      label: "Framer Logo — Blue",
      src: "/brands/framer/framer-logo-blue.svg",
      width: 128,
      height: 192,
      format: "svg",
    },
    {
      label: "Framer Logo — Black",
      src: "/brands/framer/framer-logo-black.svg",
      width: 128,
      height: 192,
      format: "svg",
    },
    {
      label: "Framer Logo — White",
      src: "/brands/framer/framer-logo-white.svg",
      width: 128,
      height: 192,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Framer Logo — Blue",
    src: "/brands/framer/framer-logo-blue.svg",
    width: 128,
    height: 192,
    format: "svg",
  },
  thumbnailDark: {
    label: "Framer Logo — White",
    src: "/brands/framer/framer-logo-white.svg",
    width: 128,
    height: 192,
    format: "svg",
  },
  dateAdded: "2026-06-26",
  founded: 2014,
  headquarters: "Amsterdam, Netherlands",
  designer: "Framer Design Team",
  philosophy:
    "Bold, geometric, and design-led. Framer's identity centers on its triangular blue mark and a confident electric-blue palette, signalling a tool that gives designers total creative freedom while keeping things sharp, modern, and unmistakably crafted.",
  legal: {
    guidelinesUrl: "https://www.framer.com/brand",
    dos: [
      "Use the official Framer logo files from the brand page",
      "Pair wordmarks with wordmarks and icons with icons",
      "Keep clear space around the logo and use approved colors",
    ],
    donts: [
      "Outline, rotate, or skew the logo",
      "Recolor the logo or place it on low-contrast backgrounds",
      "Use the icon as a standalone letter alongside the wordmark",
    ],
  },
}
