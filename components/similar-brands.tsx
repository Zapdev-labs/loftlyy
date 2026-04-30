"use client"

import { useRef, useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import type { SimilarBrandCard } from "@/lib/types"

function getMaskImage(canScrollLeft: boolean, canScrollRight: boolean) {
  if (canScrollLeft && canScrollRight) {
    return "linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)"
  }
  if (canScrollLeft) {
    return "linear-gradient(to right, transparent, black 48px)"
  }
  if (canScrollRight) {
    return "linear-gradient(to right, black calc(100% - 48px), transparent)"
  }
  return undefined
}

export function SimilarBrands({ brands }: { brands: SimilarBrandCard[] }) {
  const t = useTranslations("brand")
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const maskStyle = useMemo(() => {
    const mask = getMaskImage(canScrollLeft, canScrollRight)
    return mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined
  }, [canScrollLeft, canScrollRight])

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2)
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

  if (brands.length === 0) return null

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
        {t("similarBrands")}
      </h2>

      <div className="-mx-6 sm:-mx-10" style={maskStyle}>
        <div
          ref={scrollRef}
          role="region"
          aria-label={t("similarBrands")}
          tabIndex={0}
          className="scrollbar-none flex gap-3 overflow-x-auto px-6 pb-2 focus-visible:outline-2 focus-visible:outline-ring sm:px-10"
          style={{ scrollbarWidth: "none" }}
        >
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/${brand.slug}`}
              className="flex w-[200px] shrink-0 flex-col gap-3 rounded-2xl bg-surface-muted p-5 transition-colors duration-150 hover:bg-accent"
            >
              <div className="flex h-14 items-center justify-center">
                <Image
                  src={brand.thumbnail.src}
                  alt={brand.name}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="max-h-full object-contain"
                />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[13.5px] font-medium text-foreground">
                  {brand.name}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {brand.industry}
                </span>
                <div className="flex gap-1">
                  {brand.colors.map((c) => (
                    <div
                      key={c.hex}
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: c.hex }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
