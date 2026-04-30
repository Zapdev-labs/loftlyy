"use client"

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
} from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { Command } from "cmdk"
import {
  IconSearch,
  IconX,
  IconTypography,
  IconCategory,
  IconTag,
  IconLanguage,
  IconSun,
  IconMoon,
  IconDeviceDesktop,
} from "@tabler/icons-react"
import { useLocale } from "next-intl"
import { useTheme } from "next-themes"
import { localeMetadata } from "@/i18n/locales"
import { useRouter, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { cn, searchParamsToQuery } from "@/lib/utils"
import {
  filterBrands,
  getAvailableFilters,
  normalizeHex,
  type FilterDimension,
  type FilterState,
} from "@/lib/filters"
import type { SidebarBrand } from "@/lib/types"

interface CommandMenuProps {
  brands: SidebarBrand[]
  filters: FilterState
  onToggleFilter: (dimension: FilterDimension, value: string) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
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

const WHITESPACE_RE = /\s+/g
const PLACEHOLDER_ROTATION_MS = 2200

const GROUP_HEADING_CLASS =
  "[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10.5px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:tracking-[0.12em] [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase"

const ITEM_CLASS =
  "flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-[13.5px] text-foreground transition-colors duration-150 data-[selected=true]:bg-accent"

function getSequentialSearchPrompts(
  searchPlaceholder: string,
  groups: Array<{ label: string; values: string[] }>
) {
  const prompts = [searchPlaceholder]

  for (const group of groups) {
    for (const value of group.values.slice(0, 2)) {
      prompts.push(`${group.label}: ${value}`)
    }
  }

  return [...new Set(prompts)]
}

function getSearchHeadingKey(
  query: string,
  brands: SidebarBrand[]
): "allBrands" | "colorResults" | "fontResults" | "keywordResults" {
  const tokens = query.trim().toLowerCase().split(WHITESPACE_RE).filter(Boolean)

  if (tokens.length === 0) return "allBrands"

  const hexTokens = tokens.filter((token) => normalizeHex(token))
  if (hexTokens.length === tokens.length) {
    return "colorResults"
  }

  if (hexTokens.length === 0) {
    const isFontSearch = tokens.every((token) =>
      brands.some((brand) =>
        brand.typography.some((font) => font.name.toLowerCase().includes(token))
      )
    )

    if (isFontSearch) {
      return "fontResults"
    }
  }

  return "keywordResults"
}

export function CommandMenu({
  brands,
  filters,
  onToggleFilter,
  onClearFilters,
  hasActiveFilters,
}: CommandMenuProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const listRef = useRef<HTMLDivElement>(null)
  const t = useTranslations("nav")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentLocale = useLocale()
  const { theme, setTheme } = useTheme()
  const available = useMemo(() => getAvailableFilters(brands), [brands])
  const deferredQuery = useDeferredValue(query)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [allowMotion, setAllowMotion] = useState(true)
  const filteredBrands = useMemo(
    () => filterBrands(brands, { ...filters, query: deferredQuery }),
    [brands, filters, deferredQuery]
  )
  const resultHeading = useMemo(
    () => getSearchHeadingKey(query, brands),
    [query, brands]
  )

  const activeCount =
    filters.industries.length +
    filters.tags.length +
    filters.colorFamilies.length +
    filters.typographyStyles.length

  const searchPrompts = useMemo(
    () =>
      getSequentialSearchPrompts(t("searchPlaceholder"), [
        { label: t("industry"), values: available.industries },
        { label: t("styleTags"), values: available.tags },
        { label: t("colorFamily"), values: available.colorFamilies },
        { label: t("typographyStyle"), values: available.typographyStyles },
      ]),
    [available, t]
  )

  const activeSearchPrompt = searchPrompts[placeholderIndex] ?? t("search")

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncMotionPreference = () => {
      setAllowMotion(!mediaQuery.matches)
    }

    syncMotionPreference()
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncMotionPreference)
      return () =>
        mediaQuery.removeEventListener("change", syncMotionPreference)
    }

    mediaQuery.addListener(syncMotionPreference)
    return () => mediaQuery.removeListener(syncMotionPreference)
  }, [])

  useEffect(() => {
    if (!allowMotion || searchPrompts.length < 2) {
      setPlaceholderIndex(0)
      return
    }

    const intervalId = window.setInterval(() => {
      setPlaceholderIndex(
        (currentIndex) => (currentIndex + 1) % searchPrompts.length
      )
    }, PLACEHOLDER_ROTATION_MS)

    return () => window.clearInterval(intervalId)
  }, [allowMotion, searchPrompts])

  const navigateToBrand = useCallback(
    (slug: string) => {
      router.push(`/${slug}`)
      setOpen(false)
      setQuery("")
    },
    [router]
  )

  useEffect(() => {
    if (!open) return

    const frame = requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: 0 })
    })

    return () => cancelAnimationFrame(frame)
  }, [open, query, filteredBrands.length])

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => {
          setQuery("")
          setOpen(true)
        }}
        aria-label={t("search")}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-full bg-surface-muted px-4 py-2.5 text-[13px] text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
          hasActiveFilters && "text-foreground"
        )}
      >
        <IconSearch className="size-3.5" aria-hidden="true" />
        <span className="min-w-0 flex-1 text-left">
          <span
            key={activeSearchPrompt}
            className="block animate-in truncate duration-300 fade-in-0 slide-in-from-bottom-1"
          >
            {activeSearchPrompt}
          </span>
        </span>
        {activeCount > 0 && (
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background">
            {activeCount}
          </span>
        )}
        <kbd className="hidden rounded-md bg-background/60 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-block">
          ⌘K
        </kbd>
      </button>

      {/* Command dialog */}
      {open && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close search"
            className="fixed inset-0 animate-in cursor-default bg-black/20 backdrop-blur-sm duration-150 fade-in-0"
            onClick={() => {
              setOpen(false)
              setQuery("")
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false)
                setQuery("")
              }
            }}
          />

          <div
            className="fixed top-[18%] left-1/2 z-50 w-[95%] max-w-md -translate-x-1/2 animate-in overflow-hidden rounded-3xl bg-surface duration-150 fade-in-0 zoom-in-95 slide-in-from-top-2"
            role="dialog"
            aria-label="Search brands and filters"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <Command
              shouldFilter={false}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false)
              }}
            >
              <Command.Input
                value={query}
                onValueChange={setQuery}
                placeholder={activeSearchPrompt}
                aria-label={t("searchPlaceholder")}
                autoFocus
                className="w-full bg-transparent px-5 py-4 text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
              />
              <div className="h-px bg-surface-muted" />
              <Command.List
                ref={listRef}
                className="max-h-[400px] overflow-y-auto p-2"
              >
                {filteredBrands.length === 0 && (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    {t("noBrandsFound")}
                  </div>
                )}

                {/* Brands */}
                {filteredBrands.length > 0 && (
                  <Command.Group
                    heading={t(resultHeading)}
                    className={GROUP_HEADING_CLASS}
                  >
                    {filteredBrands.map((brand) => (
                      <Command.Item
                        key={brand.slug}
                        value={brand.slug}
                        onSelect={() => navigateToBrand(brand.slug)}
                        className={ITEM_CLASS}
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
                  </Command.Group>
                )}

                {/* Industry filters */}
                {available.industries.length > 0 && (
                  <Command.Group
                    heading={t("industry")}
                    className={GROUP_HEADING_CLASS}
                  >
                    {available.industries.map((v) => {
                      const isActive = filters.industries.includes(v)
                      return (
                        <Command.Item
                          key={v}
                          value={`industry ${v}`}
                          onSelect={() => onToggleFilter("industries", v)}
                          className={ITEM_CLASS}
                        >
                          <IconCategory className="size-4 text-muted-foreground" />
                          <span>{v}</span>
                          {isActive && (
                            <span className="ml-auto size-2 rounded-full bg-foreground" />
                          )}
                        </Command.Item>
                      )
                    })}
                  </Command.Group>
                )}

                {/* Style filters */}
                {available.tags.length > 0 && (
                  <Command.Group
                    heading={t("styleTags")}
                    className={GROUP_HEADING_CLASS}
                  >
                    {available.tags.map((v) => {
                      const isActive = filters.tags.includes(v)
                      return (
                        <Command.Item
                          key={v}
                          value={`style ${v}`}
                          onSelect={() => onToggleFilter("tags", v)}
                          className={ITEM_CLASS}
                        >
                          <IconTag className="size-4 text-muted-foreground" />
                          <span>{v}</span>
                          {isActive && (
                            <span className="ml-auto size-2 rounded-full bg-foreground" />
                          )}
                        </Command.Item>
                      )
                    })}
                  </Command.Group>
                )}

                {/* Color filters */}
                {available.colorFamilies.length > 0 && (
                  <Command.Group
                    heading={t("colorFamily")}
                    className={GROUP_HEADING_CLASS}
                  >
                    {available.colorFamilies.map((v) => {
                      const isActive = filters.colorFamilies.includes(v)
                      return (
                        <Command.Item
                          key={v}
                          value={`color ${v}`}
                          onSelect={() => onToggleFilter("colorFamilies", v)}
                          className={ITEM_CLASS}
                        >
                          <span
                            className="size-4 rounded-full"
                            style={{
                              backgroundColor: colorFamilyMap[v] ?? "#9CA3AF",
                            }}
                          />
                          <span>{v}</span>
                          {isActive && (
                            <span className="ml-auto size-2 rounded-full bg-foreground" />
                          )}
                        </Command.Item>
                      )
                    })}
                  </Command.Group>
                )}

                {/* Typography filters */}
                {available.typographyStyles.length > 0 && (
                  <Command.Group
                    heading={t("typographyStyle")}
                    className={GROUP_HEADING_CLASS}
                  >
                    {available.typographyStyles.map((v) => {
                      const isActive = filters.typographyStyles.includes(v)
                      return (
                        <Command.Item
                          key={v}
                          value={`typography ${v}`}
                          onSelect={() => onToggleFilter("typographyStyles", v)}
                          className={ITEM_CLASS}
                        >
                          <IconTypography className="size-4 text-muted-foreground" />
                          <span>{v}</span>
                          {isActive && (
                            <span className="ml-auto size-2 rounded-full bg-foreground" />
                          )}
                        </Command.Item>
                      )
                    })}
                  </Command.Group>
                )}

                {/* Language */}
                <Command.Group
                  heading={t("language")}
                  className={GROUP_HEADING_CLASS}
                >
                  {routing.locales.map((loc) => {
                    const isActive = loc === currentLocale
                    return (
                      <Command.Item
                        key={loc}
                        value={`language ${localeMetadata[loc].displayName} ${localeMetadata[loc].nativeName} ${loc}`}
                        onSelect={() => {
                          router.replace(
                            {
                              pathname,
                              query: searchParamsToQuery(searchParams),
                            },
                            {
                              locale: loc,
                            }
                          )
                          setOpen(false)
                        }}
                        className={ITEM_CLASS}
                      >
                        <IconLanguage className="size-4 text-muted-foreground" />
                        <span>{localeMetadata[loc].nativeName}</span>
                        <span className="text-[11px] text-muted-foreground uppercase">
                          {loc}
                        </span>
                        {isActive && (
                          <span className="ml-auto size-2 rounded-full bg-foreground" />
                        )}
                      </Command.Item>
                    )
                  })}
                </Command.Group>

                {/* Theme */}
                <Command.Group
                  heading={t("theme")}
                  className={GROUP_HEADING_CLASS}
                >
                  {(
                    [
                      { value: "light", icon: IconSun },
                      { value: "dark", icon: IconMoon },
                      { value: "system", icon: IconDeviceDesktop },
                    ] as const
                  ).map(({ value, icon: Icon }) => (
                    <Command.Item
                      key={value}
                      value={`theme ${value}`}
                      onSelect={() => {
                        setTheme(value)
                        setOpen(false)
                      }}
                      className={ITEM_CLASS}
                    >
                      <Icon className="size-4 text-muted-foreground" />
                      <span className="capitalize">{value}</span>
                      {theme === value && (
                        <span className="ml-auto size-2 rounded-full bg-foreground" />
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>

                {/* Clear filters */}
                {hasActiveFilters && (
                  <Command.Group>
                    <Command.Item
                      value="clear all filters"
                      onSelect={() => {
                        onClearFilters()
                      }}
                      className="flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-[13.5px] text-destructive transition-colors duration-150 data-[selected=true]:bg-destructive/15"
                    >
                      <IconX className="size-4" />
                      <span>{t("clearFilters")}</span>
                    </Command.Item>
                  </Command.Group>
                )}
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  )
}
