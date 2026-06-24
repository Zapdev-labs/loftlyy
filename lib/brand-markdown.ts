import { BASE_URL, toAbsoluteUrl } from "@/lib/seo"
import type { Brand, BrandColor } from "@/lib/types"

const NON_ALPHANUM_RE = /[^a-z0-9]+/g
const EDGE_DASH_RE = /^-+|-+$/g

function kebab(value: string): string {
  return value
    .toLowerCase()
    .replace(NON_ALPHANUM_RE, "-")
    .replace(EDGE_DASH_RE, "")
}

function buildOverview(brand: Brand): string {
  const rows: Array<[string, string]> = []
  rows.push(["Industry", brand.industry])
  if (brand.founded) rows.push(["Founded", String(brand.founded)])
  if (brand.headquarters) rows.push(["Headquarters", brand.headquarters])
  if (brand.designer) rows.push(["Designer", brand.designer])
  if (brand.lastRebranded) rows.push(["Last rebranded", brand.lastRebranded])
  if (brand.url) rows.push(["Website", brand.url])

  return rows.map(([label, value]) => `- **${label}:** ${value}`).join("\n")
}

function buildColors(colors: BrandColor[]): string {
  return colors
    .map((color) => {
      const hex = color.hex.toUpperCase()
      const usage = color.usage ? ` — ${color.usage}` : ""
      return `- **${color.name}** \`${hex}\`${usage}`
    })
    .join("\n")
}

function buildCssVariables(colors: BrandColor[]): string {
  const lines = colors.map((color, index) => {
    const name = index === 0 ? "primary" : kebab(color.name)
    return `  --brand-${name}: ${color.hex.toUpperCase()};`
  })
  return ["```css", ":root {", ...lines, "}", "```"].join("\n")
}

function buildTypography(brand: Brand): string {
  return brand.typography
    .map((font) => {
      const details: string[] = [`**${font.name}** — ${font.role}`]
      if (font.weights?.length) {
        details.push(`weights: ${font.weights.join(", ")}`)
      }
      if (font.category) details.push(`style: ${font.category}`)
      if (font.foundry) details.push(`foundry: ${font.foundry}`)
      if (font.designer) details.push(`designer: ${font.designer}`)
      if (font.fontUrl)
        details.push(`font file: ${toAbsoluteUrl(font.fontUrl)}`)
      return `- ${details.join(" · ")}`
    })
    .join("\n")
}

function buildAssets(brand: Brand): string {
  return brand.assets
    .map((asset) => {
      const url = toAbsoluteUrl(asset.src)
      const dims = `${asset.width}×${asset.height}`
      return `- **${asset.label}** (${asset.format}, ${dims}) — ${url}`
    })
    .join("\n")
}

function buildGuidelines(brand: Brand): string | null {
  const legal = brand.legal
  if (!legal) return null

  const sections: string[] = []
  if (legal.dos?.length) {
    sections.push(
      ["**Do:**", ...legal.dos.map((item) => `- ${item}`)].join("\n")
    )
  }
  if (legal.donts?.length) {
    sections.push(
      ["**Don't:**", ...legal.donts.map((item) => `- ${item}`)].join("\n")
    )
  }
  if (legal.guidelinesUrl) {
    sections.push(`Official brand guidelines: ${legal.guidelinesUrl}`)
  }

  return sections.length > 0 ? sections.join("\n\n") : null
}

/**
 * Serialize a brand into an agent-readable Markdown style reference.
 * Emits absolute asset/font URLs so an external agent can fetch artwork directly.
 */
export function brandToMarkdown(brand: Brand): string {
  const sourceUrl = `${BASE_URL}/en/${brand.slug}`
  const blocks: string[] = [
    `# ${brand.name} — Brand Style Reference`,
    buildOverview(brand),
    `## Description\n\n${brand.description}`,
  ]

  if (brand.philosophy) {
    blocks.push(`## Design Philosophy\n\n${brand.philosophy}`)
  }

  blocks.push(`## Colors\n\n${buildColors(brand.colors)}`)
  blocks.push(`## CSS Variables\n\n${buildCssVariables(brand.colors)}`)
  blocks.push(`## Typography\n\n${buildTypography(brand)}`)

  if (brand.assets.length > 0) {
    blocks.push(`## Logos & Assets\n\n${buildAssets(brand)}`)
  }

  const guidelines = buildGuidelines(brand)
  if (guidelines) {
    blocks.push(`## Usage Guidelines\n\n${guidelines}`)
  }

  blocks.push(
    `---\n\nAuto-generated brand style reference from [Loftlyy](${sourceUrl}). Append \`.md\` to any brand URL to get this file.`
  )

  return `${blocks.join("\n\n")}\n`
}
