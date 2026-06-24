import { getAllBrands } from "@/data/brands"
import { BASE_URL } from "@/lib/seo"

export const dynamic = "force-static"

export function GET() {
  const brands = getAllBrands()

  const header = [
    "# Loftlyy",
    "",
    "> Brand identity reference — colors, typography, logos, and usage guidelines for popular brands. Append `.md` to any brand URL (e.g. `/en/nike.md`) to get an agent-readable style reference with hex values, a CSS variables block, font details, asset URLs, and do/don't guidelines.",
    "",
    "## Brands",
    "",
  ].join("\n")

  const list = brands
    .map(
      (brand) =>
        `- [${brand.name}](${BASE_URL}/en/${brand.slug}.md): ${brand.industry}`
    )
    .join("\n")

  return new Response(`${header}${list}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  })
}
