"use client"

import { useDeferredValue, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { Command } from "cmdk"
import { IconSearch } from "@tabler/icons-react"
import { filterBrands } from "@/lib/filters"
import type { SidebarBrand } from "@/lib/types"

interface CompareBrandPickerProps {
  brands: SidebarBrand[]
  selectedSlugs: string[]
  onSelect: (slug: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  copy: {
    searchBrands: string
    noBrandsFound: string
  }
}

export function CompareBrandPicker({
  brands,
  selectedSlugs,
  onSelect,
  open,
  onOpenChange,
  copy,
}: CompareBrandPickerProps) {
  const [query, setQuery] = useState("")
  const listRef = useRef<HTMLDivElement>(null)
  const deferredQuery = useDeferredValue(query)

  const selectedSet = useMemo(() => new Set(selectedSlugs), [selectedSlugs])

  const filtered = useMemo(() => {
    const all = filterBrands(brands, {
      query: deferredQuery,
      industries: [],
      tags: [],
      colorFamilies: [],
      typographyStyles: [],
    })
    return all.filter((brand) => !selectedSet.has(brand.slug))
  }, [brands, deferredQuery, selectedSet])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close picker"
        className="fixed inset-0 animate-in cursor-default bg-black/20 backdrop-blur-sm duration-150 fade-in-0"
        onClick={() => {
          onOpenChange(false)
          setQuery("")
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onOpenChange(false)
            setQuery("")
          }
        }}
      />

      <div
        className="fixed top-[18%] left-1/2 z-50 w-[95%] max-w-md -translate-x-1/2 animate-in overflow-hidden rounded-3xl bg-surface duration-150 fade-in-0 zoom-in-95 slide-in-from-top-2"
        role="dialog"
        aria-label={copy.searchBrands}
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <Command
          shouldFilter={false}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onOpenChange(false)
              setQuery("")
            }
          }}
        >
          <div className="flex items-center gap-2 px-5">
            <IconSearch
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder={copy.searchBrands}
              autoFocus
              className="w-full bg-transparent py-4 text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="h-px bg-surface-muted" />
          <Command.List
            ref={listRef}
            className="max-h-[400px] overflow-y-auto p-2"
          >
            {filtered.length === 0 && (
              <div className="py-8 text-center text-sm text-muted-foreground">
                {copy.noBrandsFound}
              </div>
            )}

            {filtered.map((brand) => (
              <Command.Item
                key={brand.slug}
                value={brand.slug}
                onSelect={() => {
                  onSelect(brand.slug)
                  onOpenChange(false)
                  setQuery("")
                }}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-[13.5px] text-foreground transition-colors duration-150 data-[selected=true]:bg-accent"
              >
                <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-muted">
                  <Image
                    src={brand.thumbnail.src}
                    alt={brand.name}
                    width={36}
                    height={36}
                    className="size-full object-contain p-0.5"
                  />
                </div>
                <span className="font-medium">{brand.name}</span>
                <span className="ml-auto text-[11px] text-muted-foreground">
                  {brand.industry}
                </span>
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      </div>
    </div>
  )
}
