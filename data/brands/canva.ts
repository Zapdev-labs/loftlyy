import type { Brand } from "@/lib/types"

export const canva: Brand = {
  slug: "canva",
  name: "Canva",
  description:
    "Canva is an online design and publishing platform that empowers everyone to design anything and publish anywhere. Founded in 2013 in Sydney, Australia, Canva has grown into one of the world's most popular design tools, making professional-quality graphic design accessible to millions of non-designers and professionals alike.",
  url: "https://canva.com",
  industry: "saas",
  categories: ["saas", "technology", "gradient-brands", "wordmark-logos"],
  tags: ["design", "collaboration", "publishing", "templates", "creativity"],
  colors: [
    {
      name: "Canva Teal",
      hex: "#00C4CC",
      usage:
        "Primary brand color, gradients, CTAs, and key interactive elements.",
    },
    {
      name: "Canva Purple",
      hex: "#7D2AE7",
      usage:
        "Secondary brand color, gradient base, and creative-focused accents.",
    },
    {
      name: "Canva Violet",
      hex: "#6420FF",
      usage: "Gradient accent, used alongside purple in brand gradients.",
    },
    {
      name: "Canva Blue",
      hex: "#3969E7",
      usage: "Supporting accent for illustrations and secondary UI elements.",
    },
    {
      name: "Canva Dark",
      hex: "#232525",
      usage: "Primary text and dark backgrounds.",
    },
  ],
  typography: [
    {
      name: "Canva Sans",
      role: "Primary / Headings & Body",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Colophon Foundry",
      foundry: "Colophon Foundry",
      fontUrl: "/brands/canva/fonts/canva-sans.woff2",
    },
  ],
  assets: [
    {
      label: "Canva Wordmark — Gradient",
      src: "/brands/canva/canva-wordmark-gradient.svg",
      width: 800,
      height: 300,
      format: "svg",
    },
    {
      label: "Canva Wordmark — Black",
      src: "/brands/canva/canva-wordmark-black.svg",
      width: 800,
      height: 300,
      format: "svg",
    },
    {
      label: "Canva Wordmark — White",
      src: "/brands/canva/canva-wordmark-white.svg",
      width: 800,
      height: 300,
      format: "svg",
    },
    {
      label: "Canva Wordmark — Teal",
      src: "/brands/canva/canva-wordmark-teal.svg",
      width: 800,
      height: 300,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Canva Wordmark — Gradient",
    src: "/brands/canva/canva-wordmark-gradient.svg",
    width: 800,
    height: 300,
    format: "svg",
  },
  thumbnailDark: {
    label: "Canva Wordmark — White",
    src: "/brands/canva/canva-wordmark-white.svg",
    width: 800,
    height: 300,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2013,
  headquarters: "Sydney, Australia",
  designer: "Canva Design Team",
  lastRebranded: "2024",
  philosophy:
    "Canva's identity blends playful teal and purple gradients with a distinctive hand-drawn wordmark to embody its mission of democratizing design. The flowing, organic letterforms reflect creativity and accessibility, while the vibrant gradient signals innovation and joy in the creative process.",
  legal: {
    guidelinesUrl: "https://www.canva.dev/docs/connect/guidelines/brand/",
    dos: [
      "Use official Canva logos from approved brand resources",
      "Maintain clear space around the Canva wordmark",
      "Use the gradient version as the primary logo on light backgrounds",
      "Refer to the company as 'Canva' (capitalized) in text",
    ],
    donts: [
      "Modify the Canva logo colors, proportions, or gradient",
      "Use the Canva brand to imply partnership without authorization",
      "Recreate or approximate the Canva wordmark using standard fonts",
      "Place the Canva logo on visually busy or low-contrast backgrounds",
    ],
  },
}
