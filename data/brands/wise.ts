import type { Brand } from "@/lib/types"

export const wise: Brand = {
  slug: "wise",
  name: "Wise",
  description:
    "Wise (formerly TransferWise) is an international money transfer and financial services platform that enables people and businesses to send, receive, and manage money across borders with real exchange rates and low transparent fees. Founded in 2011 in London, Wise has grown into one of the most recognised fintech brands globally.",
  url: "https://wise.com",
  industry: "fintech",
  categories: ["fintech", "minimal-logos", "geometric-logos"],
  tags: ["payments", "money-transfer", "banking", "international", "currency"],
  colors: [
    {
      name: "Wise Green",
      hex: "#9FE870",
      usage: "Primary brand color, CTAs, key accents.",
    },
    {
      name: "Navy",
      hex: "#163300",
      usage: "Primary text, dark backgrounds.",
    },
    {
      name: "Bright Green",
      hex: "#2ED06E",
      usage: "Secondary accent, success states.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Backgrounds, contrast.",
    },
  ],
  typography: [
    {
      name: "Wise Sans",
      role: "Primary / All uses",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Wise Design Team",
      foundry: "Wise (custom)",
      fontUrl: "/brands/wise/fonts/wise-sans-regular.woff2",
    },
  ],
  assets: [
    {
      label: "Wise App Icon",
      src: "/brands/wise/logo-icon.svg",
      width: 512,
      height: 512,
      format: "svg",
    },
    {
      label: "Wise Flag — Navy",
      src: "/brands/wise/wise-flag-navy.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "Wise Flag — White",
      src: "/brands/wise/wise-flag-white.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "Wise Flag — Light Green",
      src: "/brands/wise/wise-flag-green.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Wise App Icon",
    src: "/brands/wise/logo-icon.svg",
    width: 512,
    height: 512,
    format: "svg",
  },
  thumbnailDark: {
    label: "Wise Flag — White",
    src: "/brands/wise/wise-flag-white.svg",
    width: 256,
    height: 256,
    format: "svg",
  },
  dateAdded: "2026-03-14",
  founded: 2011,
  headquarters: "London, United Kingdom",
  designer: "Wise Design Team (rebranded from TransferWise)",
  lastRebranded: "2021",
  philosophy:
    "Transparent, bold, and borderless. Wise's identity uses a distinctive green and a flag motif to symbolize the movement of money across borders — straightforward design for a company that believes financial services should be fair and simple.",
  legal: {
    guidelinesUrl: "https://wise.com/brand/",
    dos: [
      "Use official Wise brand assets from the brand resource page",
      "Maintain clear space around the Wise logo",
      "Use the Wise Green on white or dark backgrounds for maximum contrast",
    ],
    donts: [
      "Modify the Wise flag icon or wordmark proportions",
      "Use the Wise brand to imply partnership without authorization",
      "Recolor the Wise logo outside of approved variants",
      "Place the Wise logo on visually busy backgrounds",
    ],
  },
}
