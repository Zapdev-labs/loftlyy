import type { Brand } from "@/lib/types"

export const orchid: Brand = {
  slug: "orchid",
  name: "Orchid",
  description:
    "Orchid is an AI executive assistant that lives in your iMessage. It texts you a brief each morning, drafts your replies, books your meetings, and quietly handles the administrative busywork by connecting to the tools you already use. You approve, and Orchid takes care of the rest across web, iOS, and macOS.",
  url: "https://orchid.ai",
  industry: "ai",
  categories: ["ai", "saas", "wordmark-logos", "minimal-logos"],
  tags: [
    "executive-assistant",
    "personal-assistant",
    "productivity",
    "imessage",
    "ai-agent",
  ],
  colors: [
    {
      name: "Bone",
      hex: "#F5F3EC",
      usage: "Primary background and warm surface tone.",
    },
    {
      name: "Ink",
      hex: "#0C0C0C",
      usage: "Primary text, logo, and high-contrast elements.",
    },
    {
      name: "Stone",
      hex: "#5C5C5C",
      usage: "Secondary text and muted UI details.",
    },
    {
      name: "Twilight",
      hex: "#455886",
      usage: "Accent tone drawn from Orchid's dusk imagery.",
    },
  ],
  typography: [
    {
      name: "TWK Lausanne",
      role: "Headings / Display",
      weights: ["500"],
      category: "sans-serif",
      designer: "Nizar Kazan",
      foundry: "Weltkit",
      fontUrl: "/brands/orchid/fonts/twk-lausanne-500.woff2",
    },
    {
      name: "TWK Lausanne",
      role: "Body / UI",
      weights: ["400"],
      category: "sans-serif",
      designer: "Nizar Kazan",
      foundry: "Weltkit",
      fontUrl: "/brands/orchid/fonts/twk-lausanne-400.woff2",
    },
  ],
  assets: [
    {
      label: "Orchid Logo — Black",
      src: "/brands/orchid/orchid-logo-black.svg",
      width: 117,
      height: 28,
      format: "svg",
    },
    {
      label: "Orchid Logo — White",
      src: "/brands/orchid/orchid-logo-white.svg",
      width: 117,
      height: 28,
      format: "svg",
    },
    {
      label: "Orchid Symbol — Black",
      src: "/brands/orchid/orchid-symbol-black.svg",
      width: 134,
      height: 128,
      format: "svg",
    },
    {
      label: "Orchid Symbol — White",
      src: "/brands/orchid/orchid-symbol-white.svg",
      width: 134,
      height: 128,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Orchid Symbol — Black",
    src: "/brands/orchid/orchid-symbol-black.svg",
    width: 134,
    height: 128,
    format: "svg",
  },
  thumbnailDark: {
    label: "Orchid Symbol — White",
    src: "/brands/orchid/orchid-symbol-white.svg",
    width: 134,
    height: 128,
    format: "svg",
  },
  dateAdded: "2026-06-24",
  founded: 2025,
  headquarters: "San Francisco, CA",
  designer: "Emir Ayaz",
  philosophy:
    "Calm, warm, and quietly capable. Orchid pairs a bone-and-ink palette with the geometric TWK Lausanne and a soft orchid-petal mark to feel like a personal assistant that is human and unobtrusive — present when needed, invisible when not.",
  legal: {
    guidelinesUrl: "https://orchid.ai",
    dos: [
      "Use the official Orchid logo and petal mark from the brand",
      "Maintain clear space around the logo",
      "Use approved color variants on backgrounds with sufficient contrast",
    ],
    donts: [
      "Modify the Orchid logo proportions, colors, or petal mark",
      "Use the Orchid name or mark to imply partnership or endorsement",
      "Place the logo on busy backgrounds that reduce legibility",
    ],
  },
}
