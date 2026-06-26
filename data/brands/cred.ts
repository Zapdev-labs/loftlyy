import type { Brand } from "@/lib/types"

export const cred: Brand = {
  slug: "cred",
  name: "CRED",
  description:
    "CRED is an Indian fintech platform built as a members-only club that rewards creditworthy individuals for paying their credit card bills on time. Founded by Kunal Shah, the app combines bill payments, UPI, credit tracking, and curated lifestyle rewards behind a premium, invite-led experience. Its identity leans on stark black-and-white minimalism and the distinctive garuda shield mark.",
  url: "https://cred.club",
  industry: "fintech",
  categories: ["fintech", "minimal-logos", "geometric-logos"],
  tags: ["payments", "credit-cards", "rewards", "banking", "mobile"],
  colors: [
    {
      name: "CRED Black",
      hex: "#0D0D0D",
      usage: "Primary brand color used for app backgrounds and surfaces.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Wordmark, logo, and primary text on dark surfaces.",
    },
    {
      name: "Slate Gray",
      hex: "#4A4949",
      usage: "Secondary text and subtle UI detailing.",
    },
  ],
  typography: [
    {
      name: "Gilroy",
      role: "Primary / UI & Wordmark",
      weights: ["400", "500", "600", "700", "800"],
      category: "sans-serif",
      designer: "Radomir Tinkov",
      foundry: "Radomir Tinkov",
      fontUrl: "/brands/cred/fonts/gilroy-medium.woff2",
    },
    {
      name: "Denton",
      role: "Display / Editorial",
      weights: ["300", "400", "500", "700", "800"],
      category: "serif",
      designer: "Schick Toikka",
      foundry: "Schick Toikka",
      fontUrl: "/brands/cred/fonts/denton-bold.woff2",
    },
  ],
  assets: [
    {
      label: "CRED Logo — Black",
      src: "/brands/cred/cred-logo-black.svg",
      width: 148,
      height: 176,
      format: "svg",
    },
    {
      label: "CRED Logo — White",
      src: "/brands/cred/cred-logo-white.svg",
      width: 148,
      height: 176,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "CRED Logo — Black",
    src: "/brands/cred/cred-logo-black.svg",
    width: 148,
    height: 176,
    format: "svg",
  },
  thumbnailDark: {
    label: "CRED Logo — White",
    src: "/brands/cred/cred-logo-white.svg",
    width: 148,
    height: 176,
    format: "svg",
  },
  dateAdded: "2026-06-26",
  founded: 2018,
  headquarters: "Bengaluru, India",
  philosophy:
    "Reward trust. CRED frames financial responsibility as a privilege, pairing restrained black-and-white minimalism with a premium, members-only sensibility that makes paying bills feel aspirational rather than mundane.",
  legal: {
    guidelinesUrl: "https://cred.club",
    dos: [
      "Use the official CRED garuda and wordmark from approved brand files",
      "Preserve the monochrome black or white logo for maximum contrast",
      "Maintain generous clear space around the logo lockup",
    ],
    donts: [
      "Recolor the CRED logo outside the approved black and white palette",
      "Distort, rotate, or alter the proportions of the garuda mark",
      "Place the logo on low-contrast or busy backgrounds",
    ],
  },
}
