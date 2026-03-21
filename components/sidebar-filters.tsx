"use client"

import { useMemo } from "react"
import { useTranslations } from "next-intl"
import { IconAdjustmentsHorizontal, IconX } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import {
  type FilterDimension,
  type FilterState,
  getAvailableFilters,
} from "@/lib/filters"
import type { Brand } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarFiltersProps {
  brands: Brand[]
  filters: FilterState
  onToggle: (dimension: FilterDimension, value: string) => void
  onClear: () => void
  hasActiveFilters: boolean
}

export function SidebarFilters({
  brands,
  filters,
  onToggle,
  onClear,
  hasActiveFilters,
}: SidebarFiltersProps) {
  const t = useTranslations("nav")
  const available = useMemo(() => getAvailableFilters(brands), [brands])

  const activeCount =
    (filters.query ? 1 : 0) +
    filters.industries.length +
    filters.tags.length +
    filters.colorFamilies.length +
    filters.typographyStyles.length

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] transition-colors",
          hasActiveFilters
            ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
            : "bg-neutral-100/80 text-neutral-500 hover:text-neutral-700 dark:bg-neutral-900 dark:hover:text-neutral-300"
        )}
      >
        <IconAdjustmentsHorizontal className="size-3.5" />
        <span>{t("filters")}</span>
        {activeCount > 0 && (
          <span className="flex size-4 items-center justify-center rounded-full bg-white/20 text-[10px] font-semibold dark:bg-black/20">
            {activeCount}
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{t("filters")}</DialogTitle>
            {hasActiveFilters && (
              <button
                onClick={onClear}
                className="flex items-center gap-1 text-[12px] text-neutral-400 transition-colors hover:text-neutral-600 dark:hover:text-neutral-300"
              >
                <IconX className="size-3" />
                {t("clearFilters")}
              </button>
            )}
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="flex flex-col gap-5 pr-3">
            {/* Industry */}
            {available.industries.length > 0 && (
              <FilterGroup
                label={t("industry")}
                values={available.industries}
                active={filters.industries}
                onToggle={(v) => onToggle("industries", v)}
              />
            )}

            {/* Style */}
            {available.tags.length > 0 && (
              <FilterGroup
                label={t("styleTags")}
                values={available.tags}
                active={filters.tags}
                onToggle={(v) => onToggle("tags", v)}
              />
            )}

            {/* Color */}
            {available.colorFamilies.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-medium text-neutral-500 dark:text-neutral-400">
                  {t("colorFamily")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {available.colorFamilies.map((v) => {
                    const isActive = filters.colorFamilies.includes(v)
                    return (
                      <button
                        key={v}
                        onClick={() => onToggle("colorFamilies", v)}
                        className={cn(
                          "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] transition-colors",
                          isActive
                            ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                        )}
                        aria-pressed={isActive}
                      >
                        <span
                          className="size-2.5 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]"
                          style={{
                            backgroundColor: colorFamilyMap[v] ?? "#9CA3AF",
                          }}
                        />
                        {v}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Typography */}
            {available.typographyStyles.length > 0 && (
              <FilterGroup
                label={t("typographyStyle")}
                values={available.typographyStyles}
                active={filters.typographyStyles}
                onToggle={(v) => onToggle("typographyStyles", v)}
              />
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

function FilterGroup({
  label,
  values,
  active,
  onToggle,
}: {
  label: string
  values: string[]
  active: string[]
  onToggle: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[12px] font-medium text-neutral-500 dark:text-neutral-400">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {values.map((v) => {
          const isActive = active.includes(v)
          return (
            <button
              key={v}
              onClick={() => onToggle(v)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full px-2.5 py-1 text-[12px] font-medium transition-colors",
                isActive
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
              )}
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const colorFamilyMap: Record<string, string> = {
  red: "#EF4444",
  orange: "#F97316",
  yellow: "#EAB308",
  green: "#22C55E",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  pink: "#EC4899",
  neutral: "#9CA3AF",
}
