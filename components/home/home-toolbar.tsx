"use client"

import type { ReactNode } from "react"
import { useTranslations } from "next-intl"
import { SidebarFilters } from "@/components/sidebar-filters"
import { cn } from "@/lib/utils"
import type { FilterDimension, FilterState } from "@/lib/filters"
import type { SidebarBrand } from "@/lib/types"

export type HomeSort = "latest" | "az"

interface HomeToolbarProps {
  sort: HomeSort
  onSortChange: (sort: HomeSort) => void
  sidebarBrands: SidebarBrand[]
  filters: FilterState
  hasActiveFilters: boolean
  onToggleFilter: (dimension: FilterDimension, value: string) => void
  onClearFilters: () => void
}

function SortTab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border-b-2 pb-2 text-[13.5px] transition-colors duration-150",
        active
          ? "border-foreground font-medium text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  )
}

export function HomeToolbar({
  sort,
  onSortChange,
  sidebarBrands,
  filters,
  hasActiveFilters,
  onToggleFilter,
  onClearFilters,
}: HomeToolbarProps) {
  const tHome = useTranslations("home")
  const tNav = useTranslations("nav")

  return (
    <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-4 pb-4 sm:px-6">
      <div className="flex items-center gap-5">
        <SortTab
          active={sort === "latest"}
          onClick={() => onSortChange("latest")}
        >
          {tHome("sortLatest")}
        </SortTab>
        <SortTab active={sort === "az"} onClick={() => onSortChange("az")}>
          {tHome("sortAZ")}
        </SortTab>
      </div>

      <SidebarFilters
        brands={sidebarBrands}
        filters={filters}
        onToggle={onToggleFilter}
        onClear={onClearFilters}
        hasActiveFilters={hasActiveFilters}
        label={tNav("filter")}
      />
    </div>
  )
}
