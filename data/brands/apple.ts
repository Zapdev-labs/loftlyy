import type { Brand } from "@/lib/types"

export const apple: Brand = {
  slug: "apple",
  name: "Apple",
  description:
    "Apple designs and develops consumer electronics, software, and services that seamlessly integrate hardware and software into cohesive, beautifully crafted experiences. From the Macintosh to the iPhone, Apple has repeatedly redefined entire product categories through its relentless focus on simplicity, craftsmanship, and the belief that technology should feel intuitive and human.",
  url: "https://apple.com",
  industry: "technology",
  categories: ["technology", "minimal-logos"],
  tags: ["hardware", "software", "design", "innovation", "ecosystem"],
  colors: [
    {
      name: "Black",
      hex: "#000000",
      usage: "Primary logo color, text, dark mode backgrounds.",
    },
    {
      name: "Silver",
      hex: "#A2AAAD",
      usage: "Product branding, secondary elements.",
    },
    {
      name: "Space Gray",
      hex: "#86868B",
      usage: "Muted text, secondary content.",
    },
    {
      name: "White",
      hex: "#F5F5F7",
      usage: "Light backgrounds, Apple's signature off-white.",
    },
  ],
  typography: [
    {
      name: "SF Pro",
      role: "Primary UI / Headings",
      weights: ["300", "400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Apple Design Team",
      foundry: "Apple",
      fontUrl: "/brands/apple/fonts/sf-pro.woff2",
    },
    {
      name: "New York",
      role: "Editorial / Serif content",
      weights: ["400", "500", "600", "700"],
      category: "serif",
      designer: "Apple Design Team",
      foundry: "Apple",
      fontUrl: "/brands/apple/fonts/new-york.woff2",
    },
  ],
  assets: [
    {
      label: "Apple Logo — Black",
      src: "/brands/apple/apple-logo-black.svg",
      width: 1020,
      height: 1230,
      format: "svg",
    },
    {
      label: "Apple Logo — White",
      src: "/brands/apple/apple-logo-white.svg",
      width: 1020,
      height: 1230,
      format: "svg",
    },
    {
      label: "Apple Logo — Silver",
      src: "/brands/apple/apple-logo-silver.svg",
      width: 1020,
      height: 1230,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Apple Logo — Black",
    src: "/brands/apple/apple-logo-black.svg",
    width: 1020,
    height: 1230,
    format: "svg",
  },
  dateAdded: "2026-03-14",
  founded: 1976,
  headquarters: "Cupertino, CA",
  designer: "Rob Janoff (original), Apple Design Team",
  lastRebranded: "1998",
  philosophy:
    "Simplicity is the ultimate sophistication. Apple's monochromatic identity strips away everything unnecessary, letting the iconic bitten apple speak with quiet confidence — a symbol of innovation, premium quality, and human-centered design.",
  legal: {
    guidelinesUrl:
      "https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html",
    dos: [
      "Use only Apple-provided artwork for the Apple logo",
      "Maintain minimum clear space around the Apple logo",
      "Use the Apple logo in black or white only",
    ],
    donts: [
      "Use the Apple logo in any color other than black or white without permission",
      "Modify, tilt, rotate, or embellish the Apple logo",
      "Use the Apple logo as part of a sentence or in a possessive form",
      "Use Apple trademarks in a manner that implies Apple sponsorship or endorsement",
    ],
  },
}
