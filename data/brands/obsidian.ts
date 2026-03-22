import type { Brand } from "@/lib/types"

export const obsidian: Brand = {
  slug: "obsidian",
  name: "Obsidian",
  description:
    "Obsidian is a powerful knowledge base and note-taking application that works on top of local Markdown files. Built for thinking, Obsidian lets users create a personal knowledge graph with bidirectional linking, making it a second brain for writers, researchers, and developers.",
  url: "https://obsidian.md",
  industry: "technology",
  categories: ["saas", "technology", "minimal-logos"],
  tags: ["notes", "knowledge-management", "markdown", "productivity", "pkm"],
  colors: [
    {
      name: "Obsidian Purple",
      hex: "#6C31E3",
      usage:
        "Primary brand color used in the logo base fill and as the main accent across marketing and product UI.",
    },
    {
      name: "Obsidian Lavender",
      hex: "#A079FF",
      usage:
        "Secondary brand color used in the lockup icon and lighter accent elements.",
    },
    {
      name: "Dark Background",
      hex: "#1E1E2E",
      usage:
        "Primary dark background used in the app interface and marketing materials.",
    },
    {
      name: "Light Surface",
      hex: "#FFFFFF",
      usage: "Light mode background and text on dark surfaces.",
    },
  ],
  typography: [
    {
      name: "Inter",
      role: "UI / Body Text",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Rasmus Andersson",
      foundry: "Google Fonts",
      fontUrl: "/brands/obsidian/fonts/inter-latin.woff2",
    },
  ],
  assets: [
    {
      label: "Obsidian Icon — Gradient",
      src: "/brands/obsidian/obsidian-logo-gradient.svg",
      width: 512,
      height: 512,
      format: "svg",
    },
    {
      label: "Obsidian Lockup — Black",
      src: "/brands/obsidian/obsidian-lockup-black.svg",
      width: 143,
      height: 25,
      format: "svg",
    },
    {
      label: "Obsidian Lockup — White",
      src: "/brands/obsidian/obsidian-lockup-white.svg",
      width: 143,
      height: 25,
      format: "svg",
    },
    {
      label: "Obsidian Lockup — Purple",
      src: "/brands/obsidian/obsidian-lockup-purple.svg",
      width: 143,
      height: 25,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Obsidian Icon — Gradient",
    src: "/brands/obsidian/obsidian-logo-gradient.svg",
    width: 512,
    height: 512,
    format: "svg",
  },
  dateAdded: "2026-03-22",
  founded: 2020,
  headquarters: "Toronto, Canada",
  designer: "Obsidian Design Team",
  philosophy:
    "Obsidian's identity is inspired by its namesake, the volcanic rock used since the dawn of humanity to make tools. The brand reflects durability, privacy, and user ownership — your notes are yours, stored locally in plain Markdown, designed to last forever.",
  legal: {
    guidelinesUrl: "https://obsidian.md/brand",
    dos: [
      "Use official logo assets from the Obsidian brand page",
      "Maintain clear space around the logo",
      "You are free to customize the app icon for personal use",
    ],
    donts: [
      "Do not edit, change, distort, recolor, or reconfigure the Obsidian logo",
      "Do not use the Obsidian name or logo to imply official endorsement",
      "Do not use customized logos for commercial purposes without permission",
    ],
  },
}
