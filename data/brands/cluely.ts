import type { Brand } from "@/lib/types"

export const cluely: Brand = {
  slug: "cluely",
  name: "Cluely",
  description:
    "Cluely is a real-time AI assistant that provides live suggestions and answers during meetings, interviews, and calls. Built for high-stakes conversations, it operates invisibly through an overlay interface powered by large language models.",
  url: "https://cluely.com",
  industry: "ai",
  categories: ["ai", "saas", "technology", "wordmark-logos"],
  tags: [
    "artificial-intelligence",
    "meetings",
    "productivity",
    "real-time",
    "machine-learning",
  ],
  colors: [
    {
      name: "Cluely Lavender",
      hex: "#DDE2EE",
      usage:
        "Primary brand background color, used across the main site and marketing materials.",
    },
    {
      name: "Cluely Black",
      hex: "#19191D",
      usage: "Primary dark color for text, headings, and dark UI backgrounds.",
    },
    {
      name: "Cluely Dark Gray",
      hex: "#31343E",
      usage: "Secondary dark color used in gradients and dark backgrounds.",
    },
    {
      name: "Cluely Blue",
      hex: "#4B87FF",
      usage: "Accent blue for interactive elements and highlights.",
    },
    {
      name: "Cluely Gray",
      hex: "#7D8390",
      usage: "Secondary text and muted UI elements.",
    },
  ],
  typography: [
    {
      name: "Geist",
      role: "Body / UI",
      weights: ["400", "500", "600"],
      category: "sans-serif",
      designer: "Vercel Design Team",
      foundry: "Vercel",
      fontUrl: "/brands/cluely/fonts/geist-regular.woff2",
    },
    {
      name: "Forma",
      role: "Display / Headings",
      weights: ["400"],
      category: "sans-serif",
      designer: "David Jonathan Ross",
      foundry: "DJR",
      fontUrl: "/brands/cluely/fonts/forma-regular.woff2",
    },
  ],
  assets: [
    {
      label: "Cluely Wordmark — Black",
      src: "/brands/cluely/cluely-logo-black.svg",
      width: 840,
      height: 220,
      format: "svg",
    },
    {
      label: "Cluely Wordmark — White",
      src: "/brands/cluely/cluely-logo-white.svg",
      width: 840,
      height: 220,
      format: "svg",
    },
    {
      label: "Cluely Icon — Black",
      src: "/brands/cluely/cluely-icon-black.svg",
      width: 128,
      height: 129,
      format: "svg",
    },
    {
      label: "Cluely Icon — White",
      src: "/brands/cluely/cluely-icon-white.svg",
      width: 128,
      height: 129,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Cluely Icon — Black",
    src: "/brands/cluely/cluely-icon-black.svg",
    width: 128,
    height: 129,
    format: "svg",
  },
  thumbnailDark: {
    label: "Cluely Icon — White",
    src: "/brands/cluely/cluely-icon-white.svg",
    width: 128,
    height: 129,
    format: "svg",
  },
  dateAdded: "2026-03-16",
  founded: 2025,
  headquarters: "San Francisco, CA",
  designer: "Cluely Design Team",
  philosophy:
    "Clean, professional, and quietly confident. Cluely's identity pairs soft lavender tones with deep charcoal, projecting trustworthiness and discretion for a tool designed to assist invisibly during high-stakes conversations.",
  legal: {
    guidelinesUrl: "https://cluely.com/terms",
    dos: [
      "Use the official Cluely wordmark and icon assets provided",
      "Maintain adequate clear space around the logo",
      "Use approved color variants on appropriate backgrounds",
    ],
    donts: [
      "Modify the Cluely logo proportions or colors",
      "Use the Cluely name to imply official endorsement",
      "Place the logo on busy backgrounds that reduce legibility",
    ],
  },
}
