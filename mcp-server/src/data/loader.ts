import { getAllBrands } from "@/data/brands"
import type { Brand } from "@/lib/types"

export type { Brand }

// Pre-load brands at module initialisation — `getAllBrands()` returns a module-level
// constant so this is essentially a free O(n) index build at startup.
const brandsBySlug = new Map<string, Brand>(
  getAllBrands().map((brand) => [brand.slug, brand])
)

export function getBrand(slug: string): Brand | undefined {
  return brandsBySlug.get(slug)
}

export function getBrands(): Brand[] {
  return getAllBrands()
}

export function getBrandCount(): number {
  return brandsBySlug.size
}

export function getSlugs(): string[] {
  return Array.from(brandsBySlug.keys())
}

export function searchBrands(query: string, hexQuery?: string): Brand[] {
  const q = query.toLowerCase().trim()
  const hexQ = hexQuery?.toLowerCase().replace("#", "").trim()

  return getAllBrands().filter((brand) => {
    const matchesText =
      !q ||
      brand.name.toLowerCase().includes(q) ||
      brand.description.toLowerCase().includes(q) ||
      brand.industry.toLowerCase().includes(q) ||
      brand.tags?.some((tag) => tag.toLowerCase().includes(q))

    const matchesHex =
      !hexQ ||
      brand.colors.some((color) =>
        color.hex.toLowerCase().replace("#", "").includes(hexQ)
      )

    return matchesText && matchesHex
  })
}
