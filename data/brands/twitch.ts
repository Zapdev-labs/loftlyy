import type { Brand } from "@/lib/types"

export const twitch: Brand = {
  slug: "twitch",
  name: "Twitch",
  description:
    "Twitch is the world's leading live-streaming platform for gamers, creators, and communities. Launched in 2011 and acquired by Amazon in 2014, Twitch enables millions of streamers to broadcast live content — from gaming and music to talk shows and creative arts — to a passionate global audience.",
  url: "https://twitch.tv",
  industry: "entertainment",
  categories: ["entertainment", "social-media", "geometric-logos"],
  tags: [
    "streaming",
    "gaming",
    "community",
    "live-streaming",
    "creators",
    "entertainment",
    "video",
  ],
  colors: [
    {
      name: "Twitch Purple",
      hex: "#9146FF",
      usage:
        "Primary brand color. Used across the logo, UI accents, buttons, and all key brand touchpoints.",
    },
    {
      name: "Ice",
      hex: "#F0F0FF",
      usage:
        "Light background color. Used for contrast against purple elements and clean layouts.",
    },
    {
      name: "Hype Pink",
      hex: "#FAB4FF",
      usage:
        "Accent color for highlights, hype moments, and promotional materials.",
    },
    {
      name: "Black Ops",
      hex: "#000000",
      usage:
        "Dark theme backgrounds, text, and logo usage on light backgrounds.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Logo on dark/purple backgrounds, light text, and clean spacing.",
    },
  ],
  typography: [
    {
      name: "Roobert",
      role: "Display / Headlines",
      weights: ["400", "700"],
      category: "sans-serif",
      designer: "Display Foundry",
      foundry: "Display Foundry",
      fontUrl: "/brands/twitch/fonts/roobert-bold.woff2",
    },
    {
      name: "Inter",
      role: "Body / Interface",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Rasmus Andersson",
      foundry: "Google Fonts",
      fontUrl: "/brands/twitch/fonts/inter-latin.woff2",
    },
  ],
  assets: [
    {
      label: "Glitch (Purple)",
      src: "/brands/twitch/twitch-glitch-purple.svg",
      width: 240,
      height: 280,
      format: "svg",
    },
    {
      label: "Glitch (White)",
      src: "/brands/twitch/twitch-glitch-white.svg",
      width: 240,
      height: 280,
      format: "svg",
    },
    {
      label: "Glitch (Black)",
      src: "/brands/twitch/twitch-glitch-black.svg",
      width: 240,
      height: 280,
      format: "svg",
    },
    {
      label: "Wordmark (Purple)",
      src: "/brands/twitch/twitch-wordmark-purple.svg",
      width: 819,
      height: 250,
      format: "svg",
    },
    {
      label: "Wordmark (White)",
      src: "/brands/twitch/twitch-wordmark-white.svg",
      width: 819,
      height: 250,
      format: "svg",
    },
    {
      label: "Wordmark (Black)",
      src: "/brands/twitch/twitch-wordmark-black.svg",
      width: 819,
      height: 250,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Glitch Icon",
    src: "/brands/twitch/twitch-glitch-purple.svg",
    width: 240,
    height: 280,
    format: "svg",
  },
  thumbnailDark: {
    label: "Glitch (White)",
    src: "/brands/twitch/twitch-glitch-white.svg",
    width: 240,
    height: 280,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2011,
  headquarters: "San Francisco, CA",
  designer: "Twitch Design Team",
  lastRebranded: "2024",
  philosophy:
    "Bold, energetic, and community-driven. Twitch's identity is anchored by the iconic Glitch — a speech-bubble-meets-gaming-controller mark rendered in unmistakable purple that signals live, interactive entertainment and the passionate communities built around it.",
  legal: {
    guidelinesUrl: "https://brand.twitch.com/",
    dos: [
      "Use official Twitch logos from brand.twitch.tv for any permitted usage.",
      "Maintain clear space around the Glitch and wordmark logos.",
    ],
    donts: [
      "Do not alter, rotate, or distort the Twitch logos in any way.",
      "Do not use the Twitch brand in a way that implies partnership or endorsement without written permission.",
      "Do not combine the Twitch logo with other logos, icons, or text.",
      "Do not use the Twitch brand on merchandise without authorization.",
    ],
  },
}
