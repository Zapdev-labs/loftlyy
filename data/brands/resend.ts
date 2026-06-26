import type { Brand } from "@/lib/types"

export const resend: Brand = {
  slug: "resend",
  name: "Resend",
  description:
    "Resend is a modern email platform built for developers, making it simple to send transactional and marketing emails that reliably reach the inbox. Founded in 2023 by Zeno Rocha and Bu Kinoshita and backed by Y Combinator, it pairs a clean API and SDKs with React Email for building templates that render consistently across clients. Its brand is defined by an obsessive, minimal black-and-white aesthetic and a relentless focus on craft.",
  url: "https://resend.com",
  industry: "saas",
  categories: ["saas", "technology", "minimal-logos", "wordmark-logos"],
  tags: [
    "email",
    "email-api",
    "transactional-email",
    "developer-tools",
    "api",
    "react-email",
  ],
  colors: [
    {
      name: "Resend Black",
      hex: "#000000",
      usage: "Primary brand color for the wordmark, text, and key surfaces.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Light-mode canvas and the inverse logo on dark backgrounds.",
    },
    {
      name: "Ink",
      hex: "#1B1B1B",
      usage: "Dark-mode backgrounds and elevated UI surfaces.",
    },
    {
      name: "Gray",
      hex: "#A0A0A0",
      usage: "Muted text, borders, and secondary UI elements.",
    },
  ],
  typography: [
    {
      name: "ABC Favorit",
      role: "Primary / Wordmark, Headings & UI",
      weights: ["400", "500"],
      category: "sans-serif",
      designer: "Johannes Breyer & Fabian Harb",
      foundry: "Dinamo",
      fontUrl: "/brands/resend/fonts/abc_favorit_medium.woff2",
    },
    {
      name: "Commit Mono",
      role: "Monospace / Code & technical content",
      weights: ["400"],
      category: "monospace",
      designer: "Eigil Nikolajsen",
      foundry: "Open Source",
      fontUrl: "/brands/resend/fonts/commit_mono_italic.woff2",
    },
  ],
  assets: [
    {
      label: "Resend Wordmark — Black",
      src: "/brands/resend/resend-wordmark-black.svg",
      width: 1978,
      height: 420,
      format: "svg",
    },
    {
      label: "Resend Wordmark — White",
      src: "/brands/resend/resend-wordmark-white.svg",
      width: 1978,
      height: 420,
      format: "svg",
    },
    {
      label: "Resend Icon — Black",
      src: "/brands/resend/resend-icon-black.svg",
      width: 1800,
      height: 1800,
      format: "svg",
    },
    {
      label: "Resend Icon — White",
      src: "/brands/resend/resend-icon-white.svg",
      width: 1800,
      height: 1800,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Resend Icon — Black",
    src: "/brands/resend/resend-icon-black.svg",
    width: 1800,
    height: 1800,
    format: "svg",
  },
  thumbnailDark: {
    label: "Resend Icon — White",
    src: "/brands/resend/resend-icon-white.svg",
    width: 1800,
    height: 1800,
    format: "svg",
  },
  dateAdded: "2026-06-26",
  founded: 2023,
  headquarters: "San Francisco, California",
  designer: "Resend Team",
  philosophy:
    "Minimal to the point of obsession. Resend's identity strips email back to its essence — a stark black-and-white palette, the geometric precision of ABC Favorit, and monospaced detail from Commit Mono — reflecting a developer-first product where craft, clarity, and attention to detail are the brand.",
  legal: {
    guidelinesUrl: "https://resend.com/brand",
    dos: [
      "Write the name as 'Resend' with a capital R, as a single word",
      "Use the official wordmark for stronger brand recognition",
      "Use the white logo variant on dark backgrounds and keep clear space around it",
    ],
    donts: [
      "Alter, recolor, stretch, or otherwise modify the logo files",
      "Write the name as 'ReSend', 'resend', or any other variation",
      "Imply an official partnership or endorsement without permission",
    ],
  },
}
