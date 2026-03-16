import type { Brand } from "@/lib/types"

export const openai: Brand = {
  slug: "openai",
  name: "OpenAI",
  description:
    "OpenAI is an AI research and deployment company whose mission is to ensure that artificial general intelligence benefits all of humanity. It develops and maintains foundational AI models including GPT-4 and the ChatGPT platform, which have become the world's most widely used AI products.",
  url: "https://openai.com",
  industry: "ai",
  categories: ["ai", "saas", "minimal-logos"],
  tags: [
    "artificial-intelligence",
    "machine-learning",
    "research",
    "chatgpt",
    "gpt",
  ],
  colors: [
    {
      name: "Black",
      hex: "#000000",
      usage:
        "Primary brand color. Used for the logo, body text, and dark backgrounds.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage:
        "Contrast color for light mode backgrounds and reversed logo treatments.",
    },
    {
      name: "OpenAI Green",
      hex: "#10A37F",
      usage:
        "Accent color for ChatGPT branding, interactive elements, and calls to action.",
    },
  ],
  typography: [
    {
      name: "OpenAI Sans",
      role: "Primary / All Uses",
      weights: ["300", "400", "500", "700"],
      category: "sans-serif",
      designer: "ABC Dinamo",
      foundry: "ABC Dinamo",
      fontUrl: "/brands/openai/fonts/openai-sans.woff2",
    },
  ],
  assets: [
    {
      label: "OpenAI Logo — Black",
      src: "/brands/openai/logo-icon.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "OpenAI Logo — White",
      src: "/brands/openai/openai-logo-white.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "OpenAI Logo — Green",
      src: "/brands/openai/openai-logo-green.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "OpenAI Wordmark — Black",
      src: "/brands/openai/openai-wordmark-black.svg",
      width: 351,
      height: 109,
      format: "svg",
    },
    {
      label: "OpenAI Wordmark — White",
      src: "/brands/openai/openai-wordmark-white.svg",
      width: 351,
      height: 109,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "OpenAI Logo — Black",
    src: "/brands/openai/logo-icon.svg",
    width: 256,
    height: 256,
    format: "svg",
  },
  thumbnailDark: {
    label: "OpenAI Logo — White",
    src: "/brands/openai/openai-logo-white.svg",
    width: 256,
    height: 256,
    format: "svg",
  },
  dateAdded: "2026-03-14",
  founded: 2015,
  headquarters: "San Francisco, CA",
  designer: "OpenAI Design Team",
  lastRebranded: "2025",
  philosophy:
    "Minimal, authoritative, and forward-looking. OpenAI's identity communicates trust and technological sophistication through restrained design, using stark black-and-white with purposeful green accents that signal innovation without intimidation.",
  legal: {
    guidelinesUrl: "https://openai.com/brand",
    dos: [
      "Use the official OpenAI logo files from the brand resource page.",
      "Maintain minimum clear space around the logo.",
      "Use the logo in black or white on solid backgrounds.",
    ],
    donts: [
      "Modify, distort, or recolor the OpenAI logo.",
      "Use the OpenAI name to imply endorsement without written permission.",
      "Combine the OpenAI logo with other logos or graphics.",
      "Use the OpenAI logo on cluttered or low-contrast backgrounds.",
    ],
  },
}
