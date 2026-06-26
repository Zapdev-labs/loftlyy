import type { Brand } from "@/lib/types"

export const webflow: Brand = {
  slug: "webflow",
  name: "Webflow",
  description:
    "Webflow is a visual website builder that lets designers and teams design, build, and launch responsive, production-ready websites without writing code. Founded in 2013 by Vlad Magdalin, Sergie Magdalin, and Bryant Chou, it combines a freeform visual canvas with a built-in CMS, hosting, and interactions to give creators full control over the web.",
  url: "https://webflow.com",
  industry: "saas",
  categories: ["saas", "technology", "geometric-logos", "minimal-logos"],
  tags: [
    "no-code",
    "website-builder",
    "web-design",
    "cms",
    "hosting",
    "templates",
  ],
  colors: [
    {
      name: "Webflow Blue",
      hex: "#146EF5",
      usage: "Primary brand blue used for the logo and key brand moments.",
    },
    {
      name: "Black",
      hex: "#080808",
      usage: "Anchors the brand for text and the logo on light backgrounds.",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      usage: "Backgrounds and the logo on dark backgrounds.",
    },
    {
      name: "Purple",
      hex: "#7A3DFF",
      usage: "Secondary accent used sparingly to add energy to brand work.",
    },
  ],
  typography: [
    {
      name: "WF Visual Sans",
      role: "Display / Headlines",
      weights: ["600"],
      category: "sans-serif",
      foundry: "Webflow",
      fontUrl: "/brands/webflow/fonts/webflow-visual-sans-semibold.woff2",
    },
    {
      name: "WF Visual Sans Text",
      role: "Body / UI",
      weights: ["400"],
      category: "sans-serif",
      foundry: "Webflow",
      fontUrl: "/brands/webflow/fonts/webflow-visual-sans-text-regular.woff2",
    },
  ],
  assets: [
    {
      label: "Webflow Logo — Full Color",
      src: "/brands/webflow/webflow-logo-full.svg",
      width: 1080,
      height: 181,
      format: "svg",
    },
    {
      label: "Webflow Logo — Full Color White",
      src: "/brands/webflow/webflow-logo-full-white.svg",
      width: 1080,
      height: 181,
      format: "svg",
    },
    {
      label: "Webflow Logo — Black",
      src: "/brands/webflow/webflow-logo-black.svg",
      width: 1080,
      height: 181,
      format: "svg",
    },
    {
      label: "Webflow Logo — White",
      src: "/brands/webflow/webflow-logo-white.svg",
      width: 1080,
      height: 181,
      format: "svg",
    },
    {
      label: "Webflow Mark — Blue",
      src: "/brands/webflow/webflow-mark-blue.svg",
      width: 1080,
      height: 674,
      format: "svg",
    },
    {
      label: "Webflow Mark — Black",
      src: "/brands/webflow/webflow-mark-black.svg",
      width: 1080,
      height: 674,
      format: "svg",
    },
    {
      label: "Webflow Mark — White",
      src: "/brands/webflow/webflow-mark-white.svg",
      width: 1080,
      height: 674,
      format: "svg",
    },
  ],
  thumbnail: {
    label: "Webflow Mark — Blue",
    src: "/brands/webflow/webflow-mark-blue.svg",
    width: 1080,
    height: 674,
    format: "svg",
  },
  thumbnailDark: {
    label: "Webflow Mark — White",
    src: "/brands/webflow/webflow-mark-white.svg",
    width: 1080,
    height: 674,
    format: "svg",
  },
  dateAdded: "2026-06-26",
  founded: 2013,
  headquarters: "San Francisco, California, USA",
  designer: "Webflow Design Team",
  philosophy:
    "Memorable, coherent, and consistent. Webflow's identity centers on its geometric W mark — three shapes representing the three pillars of the web (HTML, CSS, and JavaScript) — paired with a confident blue, black, and white palette that leads with restraint while letting punchy secondary colors add personality.",
  legal: {
    guidelinesUrl: "https://brand.webflow.com/design-guidelines",
    dos: [
      "Use the official Webflow logo files from the brand site",
      "Lead with the full-color blue logo whenever possible",
      "Keep clearspace around the logo equal to its height",
    ],
    donts: [
      "Alter, crop, skew, or distort the logo",
      "Place the default logo on low-contrast or colored backgrounds",
      "Add gradients or effects, or misalign the mark and wordmark",
    ],
  },
}
