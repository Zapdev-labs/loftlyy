"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { needsDarkBg, needsLightBg } from "@/lib/asset-theme"
import { seededShuffle } from "@/lib/random"
import type { HomeBrand } from "@/lib/types"

const INITIAL_DELAY_MIN_MS = 300
const INITIAL_DELAY_MAX_MS = 2500
const CYCLE_MIN_MS = 2800
const CYCLE_MAX_MS = 5200

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

export function BrandCard({ brand }: { brand: HomeBrand }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [allowMotion, setAllowMotion] = useState(true)
  const [slideIndex, setSlideIndex] = useState(0)
  const displayAssets = useMemo(
    () => seededShuffle(brand.slug, brand.assets),
    [brand.slug, brand.assets]
  )
  const canCycle = displayAssets.length >= 2

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
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
    if (!(canCycle && allowMotion && isVisible) || isPaused) return

    let timeoutId: number | undefined

    const scheduleNext = (delay: number) => {
      timeoutId = window.setTimeout(() => {
        setSlideIndex((prev) => (prev + 1) % displayAssets.length)
        scheduleNext(randomBetween(CYCLE_MIN_MS, CYCLE_MAX_MS))
      }, delay)
    }

    scheduleNext(randomBetween(INITIAL_DELAY_MIN_MS, INITIAL_DELAY_MAX_MS))

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [canCycle, allowMotion, isVisible, isPaused, displayAssets.length])

  return (
    <Link
      ref={cardRef}
      href={`/${brand.slug}`}
      className="group flex flex-col gap-3"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 340px" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        {displayAssets.map((asset, assetIndex) => (
          <div
            key={asset.src}
            className={cn(
              "absolute inset-0 flex items-center justify-center p-10 transition-opacity duration-500",
              needsDarkBg(asset.label)
                ? "bg-foreground"
                : needsLightBg(asset.label)
                  ? "bg-background"
                  : "bg-surface-muted",
              assetIndex === slideIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={asset.src}
              alt={`${brand.name} ${asset.label}`}
              width={asset.width}
              height={asset.height}
              loading={assetIndex === 0 ? "eager" : "lazy"}
              unoptimized={asset.format === "svg"}
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted p-1.5">
          <Image
            src={brand.thumbnail.src}
            alt={brand.name}
            width={brand.thumbnail.width}
            height={brand.thumbnail.height}
            loading="lazy"
            className={cn(
              "h-auto max-h-full w-auto max-w-full object-contain",
              brand.thumbnailDark && "dark:hidden"
            )}
          />
          {brand.thumbnailDark && (
            <Image
              src={brand.thumbnailDark.src}
              alt={brand.name}
              width={brand.thumbnailDark.width}
              height={brand.thumbnailDark.height}
              loading="lazy"
              className="hidden h-auto max-h-full w-auto max-w-full object-contain dark:block"
            />
          )}
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-[15px] font-semibold text-foreground">
            {brand.name}
          </span>
          <p className="line-clamp-1 text-[13.5px] text-muted-foreground">
            {brand.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
