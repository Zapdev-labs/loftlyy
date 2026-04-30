"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import Image from "next/image"
import {
  IconPlus,
  IconX,
  IconCopy,
  IconCheck,
  IconArrowsShuffle2,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { useCompareState } from "@/hooks/use-compare-state"
import { CompareBrandPicker } from "@/components/compare-brand-picker"
import { BrandColors } from "@/components/brand-colors"
import { BrandTypography } from "@/components/brand-typography"
import type { Brand, SidebarBrand } from "@/lib/types"

export interface BrandCompareCopy {
  title: string
  description: string
  addBrand: string
  addAnother: string
  optional: string
  removeBrand: string
  clearAll: string
  searchBrands: string
  noBrandsFound: string
  maxReached: string
  quickStats: string
  colorsCount: string
  fontsCount: string
  founded: string
  headquarters: string
  shareComparison: string
  linkCopied: string
  emptyTitle: string
  emptyDescription: string
}

interface BrandCompareProps {
  allBrands: Brand[]
  sidebarBrands: SidebarBrand[]
  copy: BrandCompareCopy
  translatedIndustries: Record<string, string>
}

export function BrandCompare({
  allBrands,
  sidebarBrands,
  copy,
  translatedIndustries,
}: BrandCompareProps) {
  const availableSlugs = useMemo(
    () => allBrands.map((b) => b.slug),
    [allBrands]
  )
  const { selectedSlugs, addBrand, removeBrand, clearAll, MAX_COMPARE_BRANDS } =
    useCompareState(availableSlugs)

  const [pickerOpen, setPickerOpen] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    []
  )

  const selectedBrands = useMemo(() => {
    const slugMap = new Map(allBrands.map((b) => [b.slug, b]))
    return selectedSlugs
      .map((slug) => slugMap.get(slug))
      .filter((b): b is Brand => b !== undefined)
  }, [allBrands, selectedSlugs])

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href)
    setLinkCopied(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setLinkCopied(false), 1500)
  }

  const emptySlots = MAX_COMPARE_BRANDS - selectedBrands.length

  return (
    <div className="flex flex-col gap-10 px-6 py-12 sm:px-10 sm:py-16">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-surface-muted">
              <IconArrowsShuffle2 className="size-5 text-foreground" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {copy.title}
            </h1>
          </div>
          {selectedBrands.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyLink}
                className="flex items-center gap-1.5 rounded-full bg-surface-muted px-3.5 py-1.5 text-[12px] font-medium text-foreground transition-colors duration-150 hover:bg-accent"
              >
                {linkCopied ? (
                  <>
                    <IconCheck className="size-3" />
                    <span>{copy.linkCopied}</span>
                  </>
                ) : (
                  <>
                    <IconCopy className="size-3" />
                    <span>{copy.shareComparison}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="flex items-center gap-1.5 rounded-full bg-destructive/15 px-3.5 py-1.5 text-[12px] font-medium text-destructive transition-colors duration-150 hover:bg-destructive/25"
              >
                <IconX className="size-3" />
                <span>{copy.clearAll}</span>
              </button>
            </div>
          )}
        </div>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          {copy.description}
        </p>
      </div>

      {/* Comparison grid */}
      {selectedBrands.length === 0 ? (
        <div
          className={cn(
            "grid gap-4",
            "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {Array.from({ length: MAX_COMPARE_BRANDS }).map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setPickerOpen(true)}
              className="group flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl bg-surface-muted transition-colors duration-150 hover:bg-accent"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-surface text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
                <IconPlus className="size-5" />
              </div>
              <span className="text-sm font-medium text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
                {i < 2
                  ? copy.addBrand
                  : `${copy.addAnother} (${copy.optional})`}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-4",
            selectedBrands.length === 1
              ? "grid-cols-1 md:grid-cols-2"
              : selectedBrands.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {selectedBrands.map((brand) => (
            <CompareColumn
              key={brand.slug}
              brand={brand}
              translatedIndustry={
                translatedIndustries[brand.industry] ?? brand.industry
              }
              copy={copy}
              onRemove={() => removeBrand(brand.slug)}
            />
          ))}

          {emptySlots > 0 && (
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="group flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl bg-surface-muted transition-colors duration-150 hover:bg-accent"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-surface text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
                <IconPlus className="size-5" />
              </div>
              <span className="text-sm font-medium text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
                {copy.addAnother}
              </span>
            </button>
          )}
        </div>
      )}

      <CompareBrandPicker
        brands={sidebarBrands}
        selectedSlugs={selectedSlugs}
        onSelect={addBrand}
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        copy={{
          searchBrands: copy.searchBrands,
          noBrandsFound: copy.noBrandsFound,
        }}
      />
    </div>
  )
}

function CompareColumn({
  brand,
  translatedIndustry,
  copy,
  onRemove,
}: {
  brand: Brand
  translatedIndustry: string
  copy: BrandCompareCopy
  onRemove: () => void
}) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-surface p-5">
      <div className="flex items-start gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-muted">
          <Image
            src={brand.thumbnail.src}
            alt={`${brand.name} logo`}
            width={44}
            height={44}
            className="h-full w-full object-contain p-2"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
            {brand.name}
          </h2>
          <span className="text-[12px] text-muted-foreground">
            {translatedIndustry}
          </span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={copy.removeBrand}
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 hover:bg-surface-muted hover:text-foreground"
        >
          <IconX className="size-3.5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <StatBadge
          label={copy.colorsCount.replace(
            "{count}",
            String(brand.colors.length)
          )}
        />
        <StatBadge
          label={copy.fontsCount.replace(
            "{count}",
            String(brand.typography.length)
          )}
        />
        {brand.founded && (
          <StatBadge label={`${copy.founded} ${brand.founded}`} />
        )}
        {brand.headquarters && <StatBadge label={brand.headquarters} />}
      </div>

      <BrandColors colors={brand.colors} />
      <BrandTypography typography={brand.typography} />
    </div>
  )
}

function StatBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
      {label}
    </span>
  )
}
