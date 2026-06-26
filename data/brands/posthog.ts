import type { Brand } from "@/lib/types"

export const posthog: Brand = {
  slug: "posthog",
  name: "PostHog",
  description:
    "PostHog is an open-source product analytics platform that bundles product analytics, session replay, feature flags, A/B testing, and surveys into a single suite built for engineers. Founded in 2020 by James Hawkins and Tim Glaser and backed by Y Combinator, it lets teams self-host or use the cloud to understand how people use their products and ship better software. PostHog is known for its developer-first approach and its distinctive, irreverent hedgehog-led brand.",
  url: "https://posthog.com",
  industry: "saas",
  categories: ["saas", "technology", "geometric-logos"],
  tags: [
    "product-analytics",
    "analytics",
    "session-replay",
    "feature-flags",
    "open-source",
    "developer-tools",
  ],
  colors: [
    {
      name: "PostHog Red",
      hex: "#F54E00",
      usage:
        "Signature brand accent for the logo, highlights, and key actions.",
    },
    {
      name: "PostHog Blue",
      hex: "#1D4AFF",
      usage: "Secondary brand color used in the logo, links, and accents.",
    },
    {
      name: "PostHog Yellow",
      hex: "#F9BD2B",
      usage: "Warm accent that forms the spikes of the hedgehog logomark.",
    },
    {
      name: "Off Black",
      hex: "#151515",
      usage: "Primary text and dark-mode backgrounds.",
    },
    {
      name: "Bone",
      hex: "#EEEFE9",
      usage: "Light-mode background and canvas surfaces.",
    },
    {
      name: "Gray",
      hex: "#BFBFBC",
      usage: "Muted UI elements, borders, and secondary text.",
    },
  ],
  typography: [
    {
      name: "Open Runde",
      role: "Primary / Headings, UI & Body",
      weights: ["400", "500", "600", "700"],
      category: "sans-serif",
      designer: "Laurids Kern",
      foundry: "Open Source (SIL OFL)",
      fontUrl: "/brands/posthog/fonts/OpenRunde-Semibold.woff2",
    },
  ],
  assets: [
    {
      label: "PostHog Logo — Color",
      src: "/brands/posthog/posthog-logo-color.svg",
      width: 800,
      height: 140,
      format: "svg",
    },
    {
      label: "PostHog Logo — Black",
      src: "/brands/posthog/posthog-logo-black.svg",
      width: 157,
      height: 30,
      format: "svg",
    },
    {
      label: "PostHog Logo — White",
      src: "/brands/posthog/posthog-logo-white.svg",
      width: 157,
      height: 30,
      format: "svg",
    },
    {
      label: "PostHog Logomark — Color",
      src: "/brands/posthog/posthog-logomark-color.svg",
      width: 213,
      height: 128,
      format: "svg",
    },
    {
      label: "PostHog Logo — Stacked",
      src: "/brands/posthog/posthog-logo-stacked.svg",
      width: 137,
      height: 132,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "PostHog Logomark — Color",
    src: "/brands/posthog/posthog-logomark-color.svg",
    width: 213,
    height: 128,
    format: "svg",
  },
  thumbnailDark: {
    label: "PostHog Logomark — Color",
    src: "/brands/posthog/posthog-logomark-dark.svg",
    width: 213,
    height: 128,
    format: "svg",
  },
  dateAdded: "2026-06-26",
  founded: 2020,
  headquarters: "San Francisco, California (Remote-first)",
  designer: "PostHog Team",
  philosophy:
    "Handcrafted, slightly weird, and unmistakably human. PostHog's identity rejects polished corporate sameness in favor of custom hedgehog illustrations, a deliberately limited palette anchored by its signature red-orange, and a playful, irreverent voice — the guiding test being that even with the logo removed, it should still feel like PostHog.",
  legal: {
    guidelinesUrl: "https://posthog.com/handbook/company/brand-assets",
    dos: [
      "Use the unmodified official SVG logo files from the brand assets page",
      "Use the white logo variant on dark backgrounds and keep clear space around it",
      "Describe compatibility with phrasing like 'works with PostHog' or 'built for PostHog'",
    ],
    donts: [
      "Modify the logo colors, stretch, skew, rotate, or add effects",
      "Use the hedgehog mascot in commercial materials without permission",
      "Imply an official partnership or endorsement without authorization",
    ],
  },
}
