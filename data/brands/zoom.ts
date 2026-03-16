import type { Brand } from "@/lib/types"

export const zoom: Brand = {
  slug: "zoom",
  name: "Zoom",
  description:
    "Zoom is a communications platform that brings teams together with video meetings, chat, phone, and collaboration tools. Founded in 2011, Zoom became the world's go-to platform for virtual communication, serving hundreds of millions of users across businesses, schools, and personal connections.",
  url: "https://zoom.us",
  industry: "saas",
  categories: ["saas", "technology", "wordmark-logos"],
  tags: [
    "communication",
    "video-conferencing",
    "collaboration",
    "productivity",
    "remote-work",
  ],
  colors: [
    {
      name: "Zoom Blue",
      hex: "#0B5CFF",
      usage:
        "Primary brand color, logo, buttons, interactive elements, and key UI surfaces.",
    },
    {
      name: "Light Blue",
      hex: "#6096FC",
      usage: "Secondary accents, hover states, supporting UI elements.",
    },
    {
      name: "Warm Yellow",
      hex: "#FEBD00",
      usage: "Highlights, badges, accent details.",
    },
    {
      name: "Dark Navy",
      hex: "#00053D",
      usage: "Dark backgrounds, headings, text on light surfaces.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Backgrounds, text on dark surfaces, clean spaces.",
    },
  ],
  typography: [
    {
      name: "Happy Display",
      role: "Display / Headlines",
      weights: ["300", "400", "600", "700"],
      category: "sans-serif",
      designer: "Zoom Design Team",
      foundry: "Zoom",
      fontUrl: "/brands/zoom/fonts/happy-display-semibold.woff2",
    },
    {
      name: "Almaden Sans",
      role: "Body / UI Text",
      weights: ["300", "400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Zoom Design Team",
      foundry: "Zoom",
      fontUrl: "/brands/zoom/fonts/almaden-sans-regular.woff2",
    },
  ],
  assets: [
    {
      label: "Zoom Logo — Blue",
      src: "/brands/zoom/zoom-logo-blue.svg",
      width: 111,
      height: 25,
      format: "svg",
    },
    {
      label: "Zoom Logo — Black",
      src: "/brands/zoom/zoom-logo-black.svg",
      width: 111,
      height: 25,
      format: "svg",
    },
    {
      label: "Zoom Logo — White",
      src: "/brands/zoom/zoom-logo-white.svg",
      width: 111,
      height: 25,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Zoom Logo — Blue",
    src: "/brands/zoom/zoom-logo-blue.svg",
    width: 111,
    height: 25,
    format: "svg",
  },
  thumbnailDark: {
    label: "Zoom Logo — White",
    src: "/brands/zoom/zoom-logo-white.svg",
    width: 111,
    height: 25,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2011,
  headquarters: "San Jose, California",
  designer: "Zoom Design Team",
  lastRebranded: "2024",
  philosophy:
    "Zoom's identity is built on simplicity and connection, using a bold blue wordmark that conveys trust and clarity. The 2022 visual rebrand introduced custom typefaces Happy Display and Almaden Sans, evolving Zoom from a video app into a unified communications platform. In 2024, the company dropped 'Video' from its legal name — becoming Zoom Communications Inc. — reflecting its AI-first, multi-product ambition.",
  legal: {
    guidelinesUrl: "https://brand.zoom.com/",
    dos: [
      "Use official Zoom brand assets from the brand portal",
      "Maintain clear space around the Zoom logo",
      "Use the Zoom logo on clean, uncluttered backgrounds",
      "Refer to the company as 'Zoom' (capitalized) in text",
    ],
    donts: [
      "Modify the colors or proportions of the Zoom logo",
      "Rotate, skew, or add effects to the logo",
      "Use old versions of the Zoom logo",
      "Place the Zoom logo on visually busy or low-contrast backgrounds",
      "Use the Zoom name or logo to imply endorsement",
    ],
  },
}
