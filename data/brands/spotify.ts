import type { Brand } from "@/lib/types"

export const spotify: Brand = {
  slug: "spotify",
  name: "Spotify",
  description:
    "Spotify is the world's most popular audio streaming platform, offering millions of songs, podcasts, and audiobooks. Founded in Stockholm in 2006, Spotify's mission is to unlock the potential of human creativity by giving a million creative artists the opportunity to live off their art and billions of fans the opportunity to enjoy and be inspired by it.",
  url: "https://spotify.com",
  industry: "music",
  categories: ["music", "saas", "geometric-logos"],
  tags: ["music", "streaming", "audio", "podcasts", "playlists"],
  colors: [
    {
      name: "Spotify Green",
      hex: "#1ED760",
      usage: "Primary brand color, used in logo, buttons, and key UI elements.",
    },
    {
      name: "Black",
      hex: "#191414",
      usage: "Primary background, used in app dark theme and logo backgrounds.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Text on dark backgrounds, secondary logo variant.",
    },
  ],
  typography: [
    {
      name: "Spotify Mix UI",
      role: "Display / Headlines + UI",
      weights: ["400", "700"],
      category: "sans-serif",
      designer: "Spotify Design Team (based on Circular by Laurenz Brunner)",
      foundry: "Spotify / Lineto",
      fontUrl: "/brands/spotify/fonts/spotify-mix-regular.woff2",
    },
  ],
  assets: [
    {
      label: "Spotify Icon — Green",
      src: "/brands/spotify/logo-icon.svg",
      width: 236,
      height: 225,
      format: "svg",
    },
    {
      label: "Spotify Icon — White",
      src: "/brands/spotify/spotify-icon-white.svg",
      width: 236,
      height: 225,
      format: "svg",
    },
    {
      label: "Spotify Icon — Black",
      src: "/brands/spotify/spotify-icon-black.svg",
      width: 236,
      height: 225,
      format: "svg",
    },
    {
      label: "Spotify Wordmark — Green",
      src: "/brands/spotify/logo-wordmark.svg",
      width: 823,
      height: 225,
      format: "svg",
    },
    {
      label: "Spotify Wordmark — White",
      src: "/brands/spotify/spotify-wordmark-white.svg",
      width: 823,
      height: 225,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Spotify Icon — Green",
    src: "/brands/spotify/logo-icon.svg",
    width: 236,
    height: 225,
    format: "svg",
  },
  thumbnailDark: {
    label: "Spotify Icon — White",
    src: "/brands/spotify/spotify-icon-white.svg",
    width: 236,
    height: 225,
    format: "svg",
  },
  dateAdded: "2026-03-14",
  founded: 2006,
  headquarters: "Stockholm, Sweden",
  designer: "Spotify Design Team",
  lastRebranded: "2015",
  philosophy:
    "Bold, vibrant, and accessible. Spotify's identity uses the iconic green and a clean geometric logo to represent the joy of music discovery, making audio content feel personal and universally inviting.",
  legal: {
    guidelinesUrl: "https://developer.spotify.com/documentation/design",
    dos: [
      "Use the green Spotify logo on white or black backgrounds only",
      "Maintain clear space around the logo equal to half the height of the icon",
      "Use official assets from the Spotify brand resources page",
    ],
    donts: [
      "Alter the Spotify logo colors or proportions",
      "Place the Spotify logo on busy or photographic backgrounds without sufficient contrast",
      "Use the Spotify name or logo to imply endorsement or partnership without permission",
      "Recreate or modify the Spotify icon or wordmark",
    ],
  },
}
