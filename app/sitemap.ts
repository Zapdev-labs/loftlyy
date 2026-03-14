import type { MetadataRoute } from "next"
import { routing } from "@/i18n/routing"
import { getAllBrands } from "@/data/brands"
import { getAllCategories } from "@/data/categories"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://branddb.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const brands = getAllBrands()
  const categories = getAllCategories()

  const brandUrls = brands.flatMap((brand) =>
    routing.locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/${brand.slug}`,
      lastModified: new Date(brand.dateAdded),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${BASE_URL}/${l}/${brand.slug}`])
        ),
      },
    }))
  )

  const categoryUrls = categories.flatMap((cat) =>
    routing.locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${BASE_URL}/${l}/category/${cat.slug}`])
        ),
      },
    }))
  )

  const homeUrls = routing.locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}`])
      ),
    },
  }))

  return [...homeUrls, ...brandUrls, ...categoryUrls]
}
