import type { Brand } from "@/lib/types"
import { anthropic } from "./anthropic"
import { apple } from "./apple"
import { discord } from "./discord"
import { openai } from "./openai"
import { spotify } from "./spotify"
import { stripe } from "./stripe"
import { wise } from "./wise"

export const brands: Brand[] = [
  anthropic,
  apple,
  discord,
  openai,
  spotify,
  stripe,
  wise,
].sort((a, b) => a.name.localeCompare(b.name))

export const brandsBySlug: Record<string, Brand> = Object.fromEntries(
  brands.map((b) => [b.slug, b])
)

export function getAllBrands() {
  return brands
}

export function getBrandBySlug(slug: string) {
  return brandsBySlug[slug]
}

export function getBrandsByCategory(categorySlug: string) {
  return brands.filter((b) => b.categories.includes(categorySlug))
}
