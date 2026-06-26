import type { Brand } from "@/lib/types"

export const nothing: Brand = {
  slug: "nothing",
  name: "Nothing",
  description:
    "Nothing is a London-based consumer technology company founded by Carl Pei that designs smartphones, earbuds, and audio products defined by transparent hardware and the signature Glyph LED interface. The brand pairs a stripped-back, design-led philosophy with a distinctive retro-digital visual identity inspired by 1980s computing.",
  url: "https://nothing.tech",
  industry: "technology",
  categories: ["technology", "wordmark-logos", "minimal-logos"],
  tags: ["hardware", "electronics", "audio", "design", "consumer-goods"],
  colors: [
    {
      name: "Nothing Red",
      hex: "#D71921",
      usage:
        "Signature accent used in the dot mark, packaging, and highlights.",
    },
    {
      name: "Black",
      hex: "#000000",
      usage: "Primary logo and text color on light surfaces.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Primary backgrounds and the logo on dark surfaces.",
    },
  ],
  typography: [
    {
      name: "NDot 55",
      role: "Display / Logo",
      weights: ["400"],
      category: "monospace",
      designer: "Seventy Agency",
      foundry: "Colophon Foundry",
      fontUrl: "/brands/nothing/fonts/ndot-55-regular.woff2",
    },
    {
      name: "NType 82 Headline",
      role: "Headings / Display",
      weights: ["400"],
      category: "sans-serif",
      designer: "Colophon Foundry",
      foundry: "Colophon Foundry",
      fontUrl: "/brands/nothing/fonts/ntype-82-headline.woff2",
    },
    {
      name: "NType 82",
      role: "Body / UI",
      weights: ["400"],
      category: "sans-serif",
      designer: "Colophon Foundry",
      foundry: "Colophon Foundry",
      fontUrl: "/brands/nothing/fonts/ntype-82-regular.woff2",
    },
    {
      name: "NType 82 Mono",
      role: "Code / Technical",
      weights: ["400"],
      category: "monospace",
      designer: "Colophon Foundry",
      foundry: "Colophon Foundry",
      fontUrl: "/brands/nothing/fonts/ntype-82-mono-regular.woff2",
    },
  ],
  assets: [
    {
      label: "Nothing Logo — Black",
      src: "/brands/nothing/nothing-logo-black.svg",
      width: 374,
      height: 67,
      format: "svg",
    },
    {
      label: "Nothing Logo — White",
      src: "/brands/nothing/nothing-logo-white.svg",
      width: 374,
      height: 67,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Nothing Logo — Black",
    src: "/brands/nothing/nothing-logo-black.svg",
    width: 374,
    height: 67,
    format: "svg",
  },
  thumbnailDark: {
    label: "Nothing Logo — White",
    src: "/brands/nothing/nothing-logo-white.svg",
    width: 374,
    height: 67,
    format: "svg",
  },
  dateAdded: "2026-06-26",
  founded: 2020,
  headquarters: "London, United Kingdom",
  designer: "Teenage Engineering",
  philosophy:
    "Stripped back, transparent, and unmistakably digital. Nothing builds its identity around a dot-matrix typographic system and see-through hardware, turning restraint and 1980s computing nostalgia into a confident, design-first statement.",
  legal: {
    guidelinesUrl: "https://nothing.tech",
    dos: [
      "Use the official Nothing wordmark from approved brand files",
      "Maintain generous clear space around the logo",
      "Use the logo in solid black or white for maximum contrast",
    ],
    donts: [
      "Recreate the Nothing wordmark in a different typeface",
      "Alter the dot-matrix letterforms or logo proportions",
      "Place the logo on busy backgrounds that reduce legibility",
    ],
  },
}
