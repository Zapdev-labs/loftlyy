"use client"

import { useRef, useEffect, useCallback, useMemo, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import {
  IconArrowsShuffle2,
  IconBrandGithub,
  IconPlugConnected,
  IconTerminal2,
} from "@tabler/icons-react"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { filterBrands } from "@/lib/filters"
import { useBrandFilters } from "@/hooks/use-brand-filters"
import { CommandMenu } from "@/components/command-menu"
import type { SidebarBrand } from "@/lib/types"

function getVerticalMask(canScrollUp: boolean, canScrollDown: boolean) {
  if (canScrollUp && canScrollDown) {
    return "linear-gradient(to bottom, transparent, black 32px, black calc(100% - 32px), transparent)"
  }
  if (canScrollUp) {
    return "linear-gradient(to bottom, transparent, black 32px)"
  }
  if (canScrollDown) {
    return "linear-gradient(to bottom, black calc(100% - 32px), transparent)"
  }
  return undefined
}

export function BrandSidebarSearch({
  brands,
  onNavigate,
}: {
  brands: SidebarBrand[]
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const t = useTranslations("nav")
  const { filters, hasActiveFilters, toggleFilter, clearFilters } =
    useBrandFilters()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollUp(el.scrollTop > 2)
    setCanScrollDown(el.scrollTop < el.scrollHeight - el.clientHeight - 2)
  }, [])

  useEffect(() => {
    updateScrollState()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", updateScrollState, { passive: true })
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    return () => {
      el.removeEventListener("scroll", updateScrollState)
      ro.disconnect()
    }
  }, [updateScrollState])

  const maskStyle = useMemo(() => {
    const mask = getVerticalMask(canScrollUp, canScrollDown)
    return mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined
  }, [canScrollUp, canScrollDown])

  const filtered = filterBrands(brands, { ...filters, query: "" })
  const isCompareActive = pathname.endsWith("/compare")

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 px-5 lg:px-5">
      {/* Command menu trigger + filters */}
      <div className="flex flex-col gap-2">
        <CommandMenu
          brands={brands}
          filters={filters}
          onToggleFilter={toggleFilter}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Brand list */}
      <div className="flex min-h-0 flex-1 flex-col gap-5">
        <div className="flex min-h-0 flex-col gap-1">
          <div className="flex items-center gap-1.5 px-2 pb-1">
            <span className="text-[10.5px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
              {t("explore")}
            </span>
          </div>

          <Link
            href="/compare"
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors duration-150",
              isCompareActive ? "bg-surface-muted" : "hover:bg-surface-muted"
            )}
          >
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-150",
                isCompareActive
                  ? "bg-foreground text-background"
                  : "bg-surface-muted text-muted-foreground group-hover:bg-accent"
              )}
            >
              <IconArrowsShuffle2 className="size-4" />
            </span>
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-[13.5px] font-medium",
                isCompareActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {t("compareBrands")}
            </span>
          </Link>

          <a
            href="https://docs.loftlyy.com/cli"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
            className="group flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors duration-150 hover:bg-surface-muted"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-muted-foreground transition-colors duration-150 group-hover:bg-accent">
              <IconTerminal2 className="size-4" />
            </span>
            <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
              CLI
            </span>
          </a>

          <a
            href="https://docs.loftlyy.com/mcp-guide"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
            className="group flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors duration-150 hover:bg-surface-muted"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-muted-foreground transition-colors duration-150 group-hover:bg-accent">
              <IconPlugConnected className="size-4" />
            </span>
            <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
              MCP
            </span>
          </a>

          <a
            href="https://github.com/preetsuthar17/loftlyy"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
            className="group flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors duration-150 hover:bg-surface-muted"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-muted-foreground transition-colors duration-150 group-hover:bg-accent">
              <IconBrandGithub className="size-4" />
            </span>
            <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
              GitHub
            </span>
          </a>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-1.5 px-2 pb-1">
            <span className="text-[10.5px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
              {t("allBrands")}
            </span>
            <span className="text-[10.5px] font-medium text-muted-foreground/70">
              {filtered.length}
            </span>
          </div>

          <div className="min-h-0 flex-1" style={maskStyle}>
            <div
              ref={scrollRef}
              className="h-full overflow-y-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <nav className="flex flex-col gap-0.5">
                {filtered.map((brand) => {
                  const isActive = pathname.endsWith(`/${brand.slug}`)
                  return (
                    <Link
                      key={brand.slug}
                      href={`/${brand.slug}`}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors duration-150",
                        isActive ? "bg-surface-muted" : "hover:bg-surface-muted"
                      )}
                      style={{
                        contentVisibility: "auto",
                        containIntrinsicSize: "auto 40px",
                      }}
                    >
                      <div
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface",
                          /black|dark|slate|navy/i.test(brand.thumbnail.label)
                            ? "dark:bg-surface-muted"
                            : /ivory|white|light/i.test(brand.thumbnail.label)
                              ? "bg-foreground"
                              : ""
                        )}
                      >
                        <Image
                          src={brand.thumbnail.src}
                          alt={brand.name}
                          width={36}
                          height={36}
                          quality={75}
                          loading="lazy"
                          className={cn(
                            "h-full w-full scale-80 object-contain p-1"
                          )}
                        />
                      </div>
                      <span
                        className={cn(
                          "truncate text-[13.5px] font-medium",
                          isActive ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {brand.name}
                      </span>
                    </Link>
                  )
                })}
                {filtered.length === 0 && (
                  <div className="flex flex-col items-center gap-2 py-6 text-center">
                    <p className="text-[13px] text-muted-foreground">
                      {t("noBrandsFound")}
                    </p>
                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="text-xs text-muted-foreground underline underline-offset-2 transition-colors duration-150 hover:text-foreground"
                      >
                        {t("clearFilters")}
                      </button>
                    )}
                  </div>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
