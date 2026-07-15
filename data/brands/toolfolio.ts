import type { Brand } from "@/lib/types"

export const toolfolio: Brand = {
  slug: "toolfolio",
  name: "Toolfolio",
  description:
    "Toolfolio is a tool discovery platform that gathers the best tools and resources for productivity, creativity, and design in one place. It curates and organizes top solutions across categories like design, AI, no-code, marketing, and development, helping makers, startups, and creative teams find the right tool for the job.",
  url: "https://toolfolio.com",
  industry: "saas",
  categories: ["saas", "technology", "minimal-logos", "wordmark-logos"],
  tags: [
    "productivity",
    "design-tools",
    "developer-tools",
    "creators",
    "software",
  ],
  colors: [
    {
      name: "Black",
      hex: "#000000",
      usage: "Primary brand color for the wordmark, logomark, and text.",
    },
    {
      name: "Toolfolio Blue",
      hex: "#010DFF",
      usage:
        "Electric blue accent for highlights, links, and interactive elements.",
    },
    {
      name: "Deep Blue",
      hex: "#000DCC",
      usage: "Darker blue accent for hover states and secondary emphasis.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Light backgrounds and reversed logo applications.",
    },
  ],
  typography: [
    {
      name: "Inter",
      role: "Primary / Headings, UI & Body",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Rasmus Andersson",
      foundry: "Open Source (SIL OFL)",
      fontUrl: "/brands/toolfolio/fonts/inter-variable.woff2",
    },
  ],
  assets: [
    {
      label: "Toolfolio Logo — Black",
      src: "/brands/toolfolio/toolfolio-logo-black.svg",
      width: 872,
      height: 95,
      format: "svg",
    },
    {
      label: "Toolfolio Logo — White",
      src: "/brands/toolfolio/toolfolio-logo-white.svg",
      width: 872,
      height: 95,
      format: "svg",
    },
    {
      label: "Toolfolio Logo — Blue",
      src: "/brands/toolfolio/toolfolio-logo-blue.svg",
      width: 872,
      height: 95,
      format: "svg",
    },
    {
      label: "Toolfolio Logomark — Black",
      src: "/brands/toolfolio/toolfolio-logomark-black.svg",
      width: 263,
      height: 128,
      format: "svg",
    },
    {
      label: "Toolfolio Logomark — White",
      src: "/brands/toolfolio/toolfolio-logomark-white.svg",
      width: 263,
      height: 128,
      format: "svg",
    },
    {
      label: "Toolfolio Logomark — Blue",
      src: "/brands/toolfolio/toolfolio-logomark-blue.svg",
      width: 263,
      height: 128,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Toolfolio Logomark — Black",
    src: "/brands/toolfolio/toolfolio-logomark-black.svg",
    width: 263,
    height: 128,
    format: "svg",
  },
  thumbnailDark: {
    label: "Toolfolio Logomark — White",
    src: "/brands/toolfolio/toolfolio-logomark-white.svg",
    width: 263,
    height: 128,
    format: "svg",
  },
  dateAdded: "2026-07-15",
  founded: 2023,
  designer: "Toolfolio Team",
  philosophy:
    "Stark black-and-white utility with a jolt of electric blue. Toolfolio's identity is built around a geometric arrow monogram and a blocky, engineered wordmark — direct, functional, and tool-like by design.",
}
