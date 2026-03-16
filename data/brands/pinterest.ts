import type { Brand } from "@/lib/types"

export const pinterest: Brand = {
  slug: "pinterest",
  name: "Pinterest",
  description:
    "Pinterest is a visual discovery and bookmarking platform where users find and save creative ideas — from recipes and home decor to fashion and DIY projects. Founded in 2010, it serves over 550 million monthly active users as a personalized inspiration engine powered by visual search technology.",
  url: "https://www.pinterest.com",
  industry: "social-media",
  categories: ["social-media", "technology", "e-commerce"],
  tags: [
    "social-media",
    "visual-discovery",
    "bookmarking",
    "shopping",
    "creators",
    "advertising",
  ],
  colors: [
    {
      name: "Pinterest Red",
      hex: "#E60023",
      usage:
        "The signature brand color used in the logo badge and primary brand touchpoints.",
    },
    {
      name: "Black",
      hex: "#111111",
      usage:
        "Primary text color used for headings, body copy, and UI elements.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Background color and reversed logo applications.",
    },
    {
      name: "Light Gray",
      hex: "#EFEFEF",
      usage:
        "Secondary background color used for cards, containers, and subtle UI surfaces.",
    },
  ],
  typography: [
    {
      name: "Pinterest Sans",
      role: "Primary / Brand",
      weights: ["400", "500", "700"],
      category: "sans-serif",
      designer: "Grilli Type",
      foundry: "Grilli Type",
      fontUrl: "/brands/pinterest/fonts/pinterest-sans-regular.woff2",
    },
    {
      name: "Pinterest Sans Bold",
      role: "Display / Emphasis",
      weights: ["700"],
      category: "sans-serif",
      designer: "Grilli Type",
      foundry: "Grilli Type",
      fontUrl: "/brands/pinterest/fonts/pinterest-sans-bold.woff2",
    },
  ],
  assets: [
    {
      label: "Pinterest Badge — Color",
      src: "/brands/pinterest/pinterest-icon-color.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Pinterest Badge — Black",
      src: "/brands/pinterest/pinterest-icon-black.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Pinterest Badge — White",
      src: "/brands/pinterest/pinterest-icon-white.svg",
      width: 128,
      height: 128,
      format: "svg",
    },
    {
      label: "Pinterest Wordmark — Color",
      src: "/brands/pinterest/pinterest-wordmark-color.svg",
      width: 480,
      height: 114,
      format: "svg",
    },
    {
      label: "Pinterest Wordmark — Black",
      src: "/brands/pinterest/pinterest-wordmark-black.svg",
      width: 480,
      height: 114,
      format: "svg",
    },
    {
      label: "Pinterest Wordmark — White",
      src: "/brands/pinterest/pinterest-wordmark-white.svg",
      width: 480,
      height: 114,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Pinterest Badge — Color",
    src: "/brands/pinterest/pinterest-icon-color.svg",
    width: 128,
    height: 128,
    format: "svg",
  },
  thumbnailDark: {
    label: "Pinterest Badge — White",
    src: "/brands/pinterest/pinterest-icon-white.svg",
    width: 128,
    height: 128,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2010,
  headquarters: "San Francisco, CA",
  designer: "Grilli Type, Made Thought",
  lastRebranded: "2021",
  philosophy:
    "Pinterest's brand identity centers on its signature red badge — a stylized 'P' pin — symbolizing the act of pinning and saving inspiration. The custom Pinterest Sans typeface by Grilli Type balances warmth with modern clarity, designed to let pinned imagery shine while maintaining a distinctive, approachable brand voice.",
  legal: {
    guidelinesUrl: "https://business.pinterest.com/brand-guidelines/",
    dos: [
      "Only use the Pinterest badge — do not use the wordmark",
      "Always include a call to action alongside the badge",
      "Display your Pinterest account handle or URL with the logo",
      "Use official EPS and high-resolution PNG files provided by Pinterest",
    ],
    donts: [
      "Outline, add filters, effects, or drop shadows to the logo",
      "Remove the 'P' from the circle badge",
      "Alter or customize the logo colors beyond approved variants",
      "Suggest Pinterest sponsorship or formal affiliation in your materials",
      "Use 'pin' as a verb — use 'save' instead",
      "Use phrases like 'Trending on Pinterest' or 'Trending Pins'",
    ],
  },
}
