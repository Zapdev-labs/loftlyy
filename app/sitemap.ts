import type { MetadataRoute } from "next"

import { getAllCategories } from "@/data/categories"
import {
  getAllBrands,
  getAllColorFamilies,
  getAllTags,
  getAllTypographyStyles,
  getBrandsByColorFamily,
  getBrandsByTag,
  getBrandsByTypographyStyle,
} from "@/data/brands"
import { locales } from "@/i18n/locales"
import type { Brand } from "@/lib/types"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://loftlyy.com"

type SitemapEntry = MetadataRoute.Sitemap[number]

function toAbsoluteUrl(path: string): string {
  return new URL(path, BASE_URL).toString()
}

function getLastModified(
  brands: ReadonlyArray<Pick<Brand, "dateAdded">>
): Date {
  const timestamps = brands.flatMap((brand) => {
    const timestamp = Date.parse(brand.dateAdded)
    return Number.isFinite(timestamp) ? [timestamp] : []
  })

  if (timestamps.length === 0) {
    return new Date()
  }

  return new Date(Math.max(...timestamps))
}

function getAlternateLanguages(pathSuffix: string): Record<string, string> {
  return Object.fromEntries(
    locales.map((locale) => [locale, toAbsoluteUrl(`/${locale}${pathSuffix}`)])
  )
}

function buildLocalizedEntries(
  pathSuffix: string,
  options: Pick<SitemapEntry, "changeFrequency" | "lastModified" | "priority">
): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: toAbsoluteUrl(`/${locale}${pathSuffix}`),
    alternates: {
      languages: getAlternateLanguages(pathSuffix),
    },
    ...options,
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const brands = getAllBrands()
  const latestBrandDate = getLastModified(brands)

  const entries: MetadataRoute.Sitemap = [
    ...buildLocalizedEntries("", {
      changeFrequency: "daily",
      lastModified: latestBrandDate,
      priority: 1,
    }),
    ...buildLocalizedEntries("/colors", {
      changeFrequency: "weekly",
      lastModified: latestBrandDate,
      priority: 0.5,
    }),
    ...buildLocalizedEntries("/cli", {
      changeFrequency: "weekly",
      lastModified: latestBrandDate,
      priority: 0.5,
    }),
  ]

  for (const category of getAllCategories()) {
    entries.push(
      ...buildLocalizedEntries(`/category/${category.slug}`, {
        changeFrequency: "daily",
        lastModified: getLastModified(
          brands.filter((brand) => brand.categories.includes(category.slug))
        ),
        priority: 0.6,
      })
    )
  }

  for (const tag of getAllTags()) {
    const taggedBrands = getBrandsByTag(tag)
    entries.push(
      ...buildLocalizedEntries(`/tag/${tag}`, {
        changeFrequency: "weekly",
        lastModified: getLastModified(taggedBrands),
        priority: 0.3,
      })
    )
  }

  for (const color of getAllColorFamilies()) {
    const colorBrands = getBrandsByColorFamily(color)
    entries.push(
      ...buildLocalizedEntries(`/color/${color}`, {
        changeFrequency: "weekly",
        lastModified: getLastModified(colorBrands),
        priority: 0.2,
      })
    )
  }

  for (const style of getAllTypographyStyles()) {
    const styleBrands = getBrandsByTypographyStyle(style)
    entries.push(
      ...buildLocalizedEntries(`/typography/${style}`, {
        changeFrequency: "weekly",
        lastModified: getLastModified(styleBrands),
        priority: 0.2,
      })
    )
  }

  for (const brand of brands) {
    entries.push(
      ...buildLocalizedEntries(`/${brand.slug}`, {
        changeFrequency: "weekly",
        lastModified: getLastModified([brand]),
        priority: 0.8,
      })
    )
  }

  return entries
}
