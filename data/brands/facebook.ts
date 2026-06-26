import type { Brand } from "@/lib/types"

export const facebook: Brand = {
  slug: "facebook",
  name: "Facebook",
  description:
    "Facebook is the world's largest social network, connecting billions of people to share updates, photos, and messages, join communities, and discover content. Launched in 2004 by Mark Zuckerberg and his Harvard roommates, it grew from a college directory into a global platform and the flagship product of Meta. Its instantly recognizable blue 'f' is one of the most ubiquitous logos on the internet.",
  url: "https://facebook.com",
  industry: "social-media",
  categories: [
    "social-media",
    "technology",
    "wordmark-logos",
    "geometric-logos",
  ],
  tags: [
    "social-network",
    "messaging",
    "community",
    "advertising",
    "marketplace",
  ],
  colors: [
    {
      name: "Facebook Blue",
      hex: "#1877F2",
      usage: "Primary brand color, used in the logo, links, and key actions.",
    },
    {
      name: "Vivid Blue",
      hex: "#0866FF",
      usage:
        "Refreshed 2023 accent blue used for emphasis and interactive states.",
    },
    {
      name: "Black",
      hex: "#100F0D",
      usage: "Monochrome dark logo and primary text on light backgrounds.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Reversed logo on dark backgrounds and primary surfaces.",
    },
  ],
  typography: [
    {
      name: "Facebook Sans",
      role: "Primary / UI & Branding",
      weights: ["400", "500", "700"],
      category: "sans-serif",
      designer: "Dalton Maag",
      foundry: "Dalton Maag",
    },
    {
      name: "Klavika",
      role: "Legacy Wordmark",
      weights: ["500", "700"],
      category: "sans-serif",
      designer: "Eric Olson",
      foundry: "Process Type Foundry",
    },
  ],
  assets: [
    {
      label: "Facebook Icon — Blue",
      src: "/brands/facebook/facebook-icon-blue.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Facebook Icon — White",
      src: "/brands/facebook/facebook-icon-white-mono.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Facebook Icon — Black",
      src: "/brands/facebook/facebook-icon-black.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Facebook Wordmark — Blue",
      src: "/brands/facebook/facebook-wordmark-blue.svg",
      width: 1000,
      height: 193.545,
      format: "svg",
    },
    {
      label: "Facebook Wordmark — White",
      src: "/brands/facebook/facebook-wordmark-white.svg",
      width: 1000,
      height: 193.545,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Facebook Icon — Blue",
    src: "/brands/facebook/facebook-icon-blue.svg",
    width: 128,
    height: 128,
    format: "svg",
  },
  thumbnailDark: {
    label: "Facebook Icon — White",
    src: "/brands/facebook/facebook-icon-white-mono.svg",
    width: 128,
    height: 128,
    format: "svg",
  },
  dateAdded: "2026-06-24",
  founded: 2004,
  headquarters: "Menlo Park, CA",
  designer: "Meta Design Team",
  lastRebranded: "2023",
  philosophy:
    "Open, friendly, and universal. Facebook's identity rests on a single confident blue and a rounded lowercase 'f', signalling approachability and connection at a scale that works as a tiny app icon or a billboard.",
  legal: {
    guidelinesUrl: "https://about.meta.com/brand/resources/facebookapp/logo",
    dos: [
      "Use the official Facebook logo files from Meta's brand resources",
      "Maintain clear space around the logo",
      "Use approved color variants on backgrounds with sufficient contrast",
    ],
    donts: [
      "Modify the Facebook logo proportions, colors, or rotate the mark",
      "Use the Facebook name or 'f' to imply endorsement or partnership",
      "Recreate the wordmark in a different typeface",
      "Place the logo on busy backgrounds that reduce legibility",
    ],
  },
}
