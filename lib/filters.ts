import type { Brand, SimilarBrandCard } from "./types"

/** Fields shared by Brand and SidebarBrand that filtering needs */
type FilterableBrand = Pick<Brand, "name" | "industry" | "tags"> & {
  colors: { hex: string }[]
  typography: { category?: string }[]
}

type SearchableBrand = FilterableBrand & {
  searchIndex: {
    text: string
    hexes: string[]
  }
}

export interface FilterState {
  query: string
  industries: string[]
  tags: string[]
  colorFamilies: string[]
  typographyStyles: string[]
}

export type FilterDimension = Exclude<keyof FilterState, "query">

export const emptyFilters: FilterState = {
  query: "",
  industries: [],
  tags: [],
  colorFamilies: [],
  typographyStyles: [],
}

const HEX_TOKEN_RE = /^#?([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/
const WHITESPACE_RE = /\s+/g

function normalizeText(value: string): string {
  return value.trim().toLowerCase().replace(WHITESPACE_RE, " ")
}

export function normalizeHex(input: string): string | null {
  const match = input.trim().match(HEX_TOKEN_RE)
  if (!match) return null

  const value = match[1].toUpperCase()
  if (value.length === 3) {
    return `#${value
      .split("")
      .map((char) => char.repeat(2))
      .join("")}`
  }

  return `#${value}`
}

function matchesQuery(brand: SearchableBrand, query: string): boolean {
  const tokens = normalizeText(query).split(" ").filter(Boolean)

  if (tokens.length === 0) return true

  return tokens.every((token) => {
    const normalizedHex = normalizeHex(token)
    if (normalizedHex) {
      return brand.searchIndex.hexes.includes(normalizedHex)
    }

    return brand.searchIndex.text.includes(token)
  })
}

export function hexToColorFamily(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  const lightness = (max + min) / 2
  const saturation =
    delta === 0 ? 0 : delta / (1 - Math.abs((2 * lightness) / 255 - 1)) / 255

  if (saturation < 0.15 || delta < 30) return "neutral"

  let hue = 0
  if (delta !== 0) {
    if (max === r) hue = 60 * (((g - b) / delta) % 6)
    else if (max === g) hue = 60 * ((b - r) / delta + 2)
    else hue = 60 * ((r - g) / delta + 4)
  }
  if (hue < 0) hue += 360

  if (hue < 15 || hue >= 345) return "red"
  if (hue < 45) return "orange"
  if (hue < 70) return "yellow"
  if (hue < 170) return "green"
  if (hue < 260) return "blue"
  if (hue < 300) return "purple"
  return "pink"
}

export function getBrandColorFamilies(brand: {
  colors: { hex: string }[]
}): string[] {
  const families = new Set(brand.colors.map((c) => hexToColorFamily(c.hex)))
  return Array.from(families)
}

export function getAvailableFilters(brands: FilterableBrand[]) {
  const industries = new Set<string>()
  const tags = new Set<string>()
  const colorFamilies = new Set<string>()
  const typographyStyles = new Set<string>()

  for (const brand of brands) {
    industries.add(brand.industry)
    brand.tags?.forEach((t) => tags.add(t))
    brand.colors.forEach((c) => colorFamilies.add(hexToColorFamily(c.hex)))
    brand.typography.forEach((t) => {
      if (t.category) typographyStyles.add(t.category)
    })
  }

  return {
    industries: Array.from(industries).sort(),
    tags: Array.from(tags).sort(),
    colorFamilies: Array.from(colorFamilies).sort(),
    typographyStyles: Array.from(typographyStyles).sort(),
  }
}

export function filterBrands<T extends SearchableBrand>(
  brands: T[],
  filters: FilterState
): T[] {
  return brands.filter((brand) => {
    if (filters.query) {
      if (!matchesQuery(brand, filters.query)) return false
    }

    if (filters.industries.length > 0) {
      if (!filters.industries.includes(brand.industry)) return false
    }

    if (filters.tags.length > 0) {
      if (!filters.tags.some((t) => brand.tags?.includes(t))) return false
    }

    if (filters.colorFamilies.length > 0) {
      const brandFamilies = getBrandColorFamilies(brand)
      if (!filters.colorFamilies.some((f) => brandFamilies.includes(f)))
        return false
    }

    if (filters.typographyStyles.length > 0) {
      const brandStyles = brand.typography
        .map((t) => t.category)
        .filter(Boolean) as string[]
      if (!filters.typographyStyles.some((s) => brandStyles.includes(s)))
        return false
    }

    return true
  })
}

export function getSimilarBrands(
  current: Brand,
  allBrands: Brand[],
  limit = 5
): Brand[] {
  const currentColorFamilies = getBrandColorFamilies(current)
  const currentTypoCategories = current.typography
    .map((t) => t.category)
    .filter(Boolean) as string[]

  const scored = allBrands
    .filter((b) => b.slug !== current.slug)
    .map((brand) => {
      let score = 0

      const sharedCategories = brand.categories.filter((c) =>
        current.categories.includes(c)
      )
      score += sharedCategories.length * 3

      if (brand.industry === current.industry) score += 1

      const sharedTags = (brand.tags ?? []).filter((t) =>
        current.tags?.includes(t)
      )
      score += sharedTags.length * 2

      const brandFamilies = getBrandColorFamilies(brand)
      const sharedColors = brandFamilies.filter((f) =>
        currentColorFamilies.includes(f)
      )
      score += sharedColors.length * 2

      const brandTypoCategories = brand.typography
        .map((t) => t.category)
        .filter(Boolean) as string[]
      const sharedTypo = brandTypoCategories.filter((c) =>
        currentTypoCategories.includes(c)
      )
      score += sharedTypo.length

      return { brand, score }
    })
    .filter((s) => s.score > 0)
    .sort(
      (a, b) => b.score - a.score || a.brand.name.localeCompare(b.brand.name)
    )
    .slice(0, limit)

  return scored.map((s) => s.brand)
}

export function getRelatedCategoriesForBrands(brands: Brand[]): string[] {
  const categories = new Set<string>()
  for (const brand of brands) {
    for (const cat of brand.categories) {
      categories.add(cat)
    }
  }
  return Array.from(categories).sort()
}

export function getRelatedTagsForBrands(brands: Brand[]): string[] {
  const tags = new Set<string>()
  for (const brand of brands) {
    for (const tag of brand.tags ?? []) {
      tags.add(tag)
    }
  }
  return Array.from(tags).sort()
}

export function getRelatedColorFamiliesForBrands(brands: Brand[]): string[] {
  const families = new Set<string>()
  for (const brand of brands) {
    for (const color of brand.colors) {
      families.add(hexToColorFamily(color.hex))
    }
  }
  return Array.from(families).sort()
}

export function getRelatedTypographyForBrands(brands: Brand[]): string[] {
  const styles = new Set<string>()
  for (const brand of brands) {
    for (const typo of brand.typography) {
      if (typo.category) styles.add(typo.category)
    }
  }
  return Array.from(styles).sort()
}

/** Returns slim brand cards for the similar-brands section (minimal serialization). */
export function getSimilarBrandCards(
  current: Brand,
  allBrands: Brand[],
  limit = 5
): SimilarBrandCard[] {
  return getSimilarBrands(current, allBrands, limit).map((b) => ({
    slug: b.slug,
    name: b.name,
    industry: b.industry,
    thumbnail: {
      src: b.thumbnail.src,
      width: b.thumbnail.width,
      height: b.thumbnail.height,
    },
    thumbnailDark: b.thumbnailDark
      ? {
          src: b.thumbnailDark.src,
          width: b.thumbnailDark.width,
          height: b.thumbnailDark.height,
        }
      : undefined,
    colors: b.colors.slice(0, 4).map((c) => ({ hex: c.hex })),
  }))
}
