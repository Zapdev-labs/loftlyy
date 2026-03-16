import type { Brand } from "@/lib/types"

export const reddit: Brand = {
  slug: "reddit",
  name: "Reddit",
  description:
    "Reddit is a social news aggregation and discussion platform organized into communities called subreddits. Users share content, vote on posts and comments, and participate in conversations spanning virtually every topic. Reddit describes itself as 'the front page of the internet.'",
  url: "https://reddit.com",
  industry: "social-media",
  categories: ["social-media", "technology", "geometric-logos"],
  tags: ["community", "forum", "social-network", "news", "discussion"],
  colors: [
    {
      name: "Reddit Orange",
      hex: "#FF4500",
      usage:
        "Primary brand color, known as 'Orangered.' Used for the Snoo mascot background, upvote arrows, and primary actions.",
    },
    {
      name: "Alien Blue",
      hex: "#0079D3",
      usage:
        "Secondary brand color. Used for links, active states, and interactive elements.",
    },
    {
      name: "Online Green",
      hex: "#46D160",
      usage: "Status indicator for online users and success states.",
    },
    {
      name: "Reddit Black",
      hex: "#1A1A1B",
      usage:
        "Dark backgrounds, dark mode surfaces, and text on light backgrounds.",
    },
    {
      name: "Light Background",
      hex: "#DAE0E6",
      usage: "Default light mode page background color.",
    },
    {
      name: "Reddit White",
      hex: "#FFFFFF",
      usage: "Card backgrounds, content surfaces, and light mode elements.",
    },
  ],
  typography: [
    {
      name: "Reddit Display",
      role: "Display / Headlines",
      weights: ["400", "700"],
      category: "sans-serif",
      designer: "Reddit Design Team",
      foundry: "Reddit",
      fontUrl: "/brands/reddit/fonts/reddit-display.woff2",
    },
    {
      name: "Reddit Sans",
      role: "Body / Interface",
      weights: ["200", "300", "400", "500", "600", "700", "800", "900"],
      category: "sans-serif",
      designer: "Reddit Design Team",
      foundry: "Reddit",
      fontUrl: "/brands/reddit/fonts/reddit-sans.woff2",
    },
    {
      name: "Reddit Mono",
      role: "Code / Technical",
      weights: ["200", "300", "400", "500", "600", "700", "800", "900"],
      category: "monospace",
      designer: "Reddit Design Team",
      foundry: "Reddit",
      fontUrl: "/brands/reddit/fonts/reddit-mono.woff2",
    },
  ],
  assets: [
    {
      label: "Snoo Icon (Orangered)",
      src: "/brands/reddit/reddit-logo-orangered.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "Snoo Icon (Black)",
      src: "/brands/reddit/reddit-logo-black.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "Snoo Icon (White)",
      src: "/brands/reddit/reddit-logo-white.svg",
      width: 256,
      height: 256,
      format: "svg",
    },
    {
      label: "Full Wordmark",
      src: "/brands/reddit/reddit-wordmark.svg",
      width: 520,
      height: 180,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Snoo Icon",
    src: "/brands/reddit/reddit-logo-orangered.svg",
    width: 256,
    height: 256,
    format: "svg",
  },
  thumbnailDark: {
    label: "Snoo Icon (White)",
    src: "/brands/reddit/reddit-logo-white.svg",
    width: 256,
    height: 256,
    format: "svg",
  },
  dateAdded: "2026-03-15",
  founded: 2005,
  headquarters: "San Francisco, CA",
  designer: "Reddit Design Team",
  lastRebranded: "2023",
  philosophy:
    "Community-first and accessible. Reddit's identity centers on the Snoo mascot and Orangered color, balancing playfulness with the platform's role as a serious hub for authentic conversation and discovery.",
  legal: {
    guidelinesUrl: "https://reddit.lingoapp.com/k/reddit-brand-guidelines",
    dos: [
      "Use official Reddit logos from the brand resource center.",
      "Maintain clear space around the logo equal to the height of Snoo's antenna.",
      "Use approved color variants: Orangered, black, or white.",
    ],
    donts: [
      "Modify, distort, or rotate the Reddit logo or Snoo mascot.",
      "Change the colors of the logo outside of approved variants.",
      "Use the Reddit name or Snoo in a way that implies endorsement without permission.",
      "Combine the Reddit logo with other logos or graphics.",
      "Use Reddit branding on merchandise without a licensing agreement.",
    ],
  },
}
