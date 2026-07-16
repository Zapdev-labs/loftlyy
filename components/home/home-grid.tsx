"use client"

import { useMemo } from "react"
import { useTranslations } from "next-intl"
import { parseAsStringLiteral, useQueryState } from "nuqs"
import { BrandCard } from "@/components/home/brand-card"
import { HomeToolbar } from "@/components/home/home-toolbar"
import { useBrandFilters } from "@/hooks/use-brand-filters"
import { filterBrands } from "@/lib/filters"
import type { HomeBrand, SidebarBrand } from "@/lib/types"

const sortParser = parseAsStringLiteral(["latest", "az"] as const)
  .withDefault("latest")
  .withOptions({ clearOnDefault: true, scroll: false, history: "replace" })

export function HomeGrid({
  brands,
  sidebarBrands,
}: {
  brands: HomeBrand[]
  sidebarBrands: SidebarBrand[]
}) {
  const t = useTranslations("home")
  const tNav = useTranslations("nav")
  const { filters, hasActiveFilters, toggleFilter, clearFilters } =
    useBrandFilters()
  const [sort, setSort] = useQueryState("sort", sortParser)

  const allowedSlugs = useMemo(() => {
    const filtered = filterBrands(sidebarBrands, { ...filters, query: "" })
    return new Set(filtered.map((brand) => brand.slug))
  }, [sidebarBrands, filters])

  const visibleBrands = useMemo(() => {
    const filtered = brands.filter((brand) => allowedSlugs.has(brand.slug))
    const sorted = [...filtered]

    if (sort === "az") {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      sorted.sort(
        (a, b) =>
          b.dateAdded.localeCompare(a.dateAdded) || a.name.localeCompare(b.name)
      )
    }

    return sorted
  }, [brands, allowedSlugs, sort])

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-1 px-4 pt-8 pb-6 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
          {t("headline")}
        </h1>
        <p className="text-[13.5px] text-muted-foreground">
          {t("brandCount", { count: visibleBrands.length })}
        </p>
      </div>

      <HomeToolbar
        sort={sort}
        onSortChange={setSort}
        sidebarBrands={sidebarBrands}
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        onToggleFilter={toggleFilter}
        onClearFilters={clearFilters}
      />

      {visibleBrands.length > 0 ? (
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-x-6 gap-y-10 px-4 pb-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {visibleBrands.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-3 px-4 py-20 text-center sm:px-6">
          <p className="text-[13.5px] text-muted-foreground">
            {tNav("noBrandsFound")}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full bg-surface-muted px-4 py-2 text-[13px] text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground"
            >
              {tNav("clearFilters")}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
