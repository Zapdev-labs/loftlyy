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
          "flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] transition-colors duration-150",
          hasActiveFilters
            ? "bg-foreground text-background"
            : "bg-surface-muted text-muted-foreground hover:bg-accent hover:text-foreground"
        )}
      >
        <IconAdjustmentsHorizontal className="size-3.5" />
        <span>{t("filters")}</span>
        {activeCount > 0 && (
          <span className="flex size-5 items-center justify-center rounded-full bg-sidebar/20 text-[10px] font-semibold">
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
                type="button"
                onClick={onClear}
                className="flex items-center gap-1 rounded-full bg-surface-muted px-3 py-1.5 text-[12px] text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground"
              >
                <IconX className="size-3" />
                {t("clearFilters")}
              </button>
            )}
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="flex flex-col gap-5 pr-3">
            {available.industries.length > 0 && (
              <FilterGroup
                label={t("industry")}
                values={available.industries}
                active={filters.industries}
                onToggle={(v) => onToggle("industries", v)}
              />
            )}

            {available.tags.length > 0 && (
              <FilterGroup
                label={t("styleTags")}
                values={available.tags}
                active={filters.tags}
                onToggle={(v) => onToggle("tags", v)}
              />
            )}

            {available.colorFamilies.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <span className="text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                  {t("colorFamily")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {available.colorFamilies.map((v) => {
                    const isActive = filters.colorFamilies.includes(v)
                    return (
                      <button
                        type="button"
                        key={v}
                        onClick={() => onToggle("colorFamilies", v)}
                        className={cn(
                          "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] transition-colors duration-150",
                          isActive
                            ? "bg-foreground text-background"
                            : "bg-surface-muted text-foreground hover:bg-accent"
                        )}
                        aria-pressed={isActive}
                      >
                        <span
                          className="size-2.5 rounded-full"
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
    <div className="flex flex-col gap-2.5">
      <span className="text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {values.map((v) => {
          const isActive = active.includes(v)
          return (
            <button
              type="button"
              key={v}
              onClick={() => onToggle(v)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors duration-150",
                isActive
                  ? "bg-foreground text-background"
                  : "bg-surface-muted text-foreground hover:bg-accent"
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
