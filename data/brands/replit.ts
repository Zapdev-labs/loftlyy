import type { Brand } from "@/lib/types"

export const replit: Brand = {
  slug: "replit",
  name: "Replit",
  description:
    "Replit is an AI-powered software development platform that lets anyone build, deploy, and host full-stack web and mobile apps from a single browser tab. Its Agent turns natural-language prompts into production-ready code and handles infrastructure like databases, auth, and hosting. Founded in 2016 by Amjad Masad, Haya Odeh, and Faris Masad, it aims to empower the next billion software creators.",
  url: "https://replit.com",
  industry: "ai",
  categories: ["ai", "saas", "geometric-logos", "minimal-logos"],
  tags: [
    "developer-tools",
    "code-editor",
    "ai-agent",
    "no-code",
    "collaboration",
  ],
  colors: [
    {
      name: "Replit Orange",
      hex: "#FF3C00",
      usage: "Primary brand color for the logomark, accents, and CTAs.",
    },
    {
      name: "Cream",
      hex: "#FAF6F1",
      usage: "Warm off-white background across brand surfaces.",
    },
    {
      name: "Near Black",
      hex: "#181818",
      usage: "Primary text and dark backgrounds.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "High-contrast surfaces and the logo on dark backgrounds.",
    },
  ],
  typography: [
    {
      name: "Diatype",
      role: "Display / Body",
      weights: ["400", "700"],
      category: "sans-serif",
      designer: "Dinamo",
      foundry: "Dinamo Typefaces",
      fontUrl: "/brands/replit/fonts/diatype-regular.woff2",
    },
  ],
  assets: [
    {
      label: "Replit Logomark — Orange",
      src: "/brands/replit/replit-logo-orange.svg",
      width: 160,
      height: 192,
      format: "svg",
    },
    {
      label: "Replit Logomark — Black",
      src: "/brands/replit/replit-logo-black.svg",
      width: 160,
      height: 192,
      format: "svg",
    },
    {
      label: "Replit Logomark — White",
      src: "/brands/replit/replit-logo-white.svg",
      width: 160,
      height: 192,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Replit Logomark — Orange",
    src: "/brands/replit/replit-logo-orange.svg",
    width: 160,
    height: 192,
    format: "svg",
  },
  thumbnailDark: {
    label: "Replit Logomark — White",
    src: "/brands/replit/replit-logo-white.svg",
    width: 160,
    height: 192,
    format: "svg",
  },
  dateAdded: "2026-06-26",
  founded: 2016,
  headquarters: "Foster City, California",
  designer: "Replit Design Team",
  lastRebranded: "2024",
  philosophy:
    "Warm, playful, and builder-first. Replit's identity pairs an energetic orange with the soft, blocky three-square logomark and the sharp-yet-friendly Diatype grotesque, signalling a creative tool that makes serious software feel approachable to everyone.",
  legal: {
    guidelinesUrl: "https://replit.com/brand",
    dos: [
      "Use the official Replit logomark from the brand page",
      "Keep clear space around the logo",
      "Use Replit Orange or approved monochrome variants",
    ],
    donts: [
      "Recolor or distort the logomark",
      "Rotate or rearrange the three squares",
      "Place the logo on low-contrast or busy backgrounds",
    ],
  },
}
