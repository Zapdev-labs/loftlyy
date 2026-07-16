"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { IconCopy, IconCheck } from "@tabler/icons-react"
import type { BrandTypography as BrandTypographyType } from "@/lib/types"

const WHITESPACE_RE = /\s+/g

function fontFamilyName(name: string) {
  return `brand-${name.replace(WHITESPACE_RE, "-").toLowerCase()}`
}

function useFontLoader(font: BrandTypographyType) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!font.fontUrl) return
    const familyName = fontFamilyName(font.name)
    const face = new FontFace(familyName, `url(${font.fontUrl})`)
    face
      .load()
      .then((f) => {
        document.fonts.add(f)
        setLoaded(true)
      })
      .catch(() => {})
  }, [font.fontUrl, font.name])

  const generic = font.category ?? "sans-serif"
  if (loaded) return `"${fontFamilyName(font.name)}", ${generic}`
  return generic
}

export function BrandTypography({
  typography,
}: {
  typography: BrandTypographyType[]
}) {
  const t = useTranslations("brand")

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {t("typography")}
      </h2>
      <div className="flex flex-col gap-3">
        {typography.map((font) => (
          <TypeSpecimen key={`${font.name}-${font.role}`} font={font} />
        ))}
      </div>
    </section>
  )
}

function TypeSpecimen({ font }: { font: BrandTypographyType }) {
  const [copied, setCopied] = useState(false)
  const t = useTranslations("brand")
  const fontFamily = useFontLoader(font)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    []
  )

  async function copyName() {
    await navigator.clipboard.writeText(font.name)
    setCopied(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="group flex flex-col gap-4 rounded-2xl bg-surface-muted p-6">
      {/* Header row */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <div className="flex items-center gap-2.5">
          <h3 className="text-[15px] font-semibold text-foreground">
            {font.name}
          </h3>
          {font.category && (
            <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-[10.5px] font-medium text-muted-foreground">
              {font.category}
            </span>
          )}
          <button
            type="button"
            onClick={copyName}
            className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 hover:bg-surface-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={t("copyFontName")}
          >
            {copied ? (
              <IconCheck className="h-3.5 w-3.5" />
            ) : (
              <IconCopy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <span>{font.role}</span>
          {font.designer && (
            <>
              <span className="opacity-60">&middot;</span>
              <span>{font.designer}</span>
            </>
          )}
          {font.foundry && (
            <>
              <span className="opacity-60">&middot;</span>
              <span>{font.foundry}</span>
            </>
          )}
        </div>
      </div>

      {/* Type scale specimen */}
      <div
        className="flex min-w-0 flex-col gap-1 overflow-hidden"
        style={{ fontFamily }}
      >
        <p className="text-[28px] leading-[1.1] tracking-tight text-foreground sm:text-[36px]">
          The quick brown fox jumps
        </p>
        <p className="text-[17px] leading-snug text-muted-foreground sm:text-[20px]">
          over the lazy dog. 0123456789
        </p>
        <p className="text-[13px] leading-relaxed break-all text-muted-foreground sm:break-normal">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz !@#$%&amp;*()
        </p>
      </div>

      {/* Weight chips */}
      {font.weights && (
        <div className="flex flex-wrap gap-1.5">
          {font.weights.map((w) => (
            <span
              key={w}
              className="rounded-full bg-surface-muted px-2.5 py-0.5 font-mono text-[10.5px] text-muted-foreground"
            >
              {w}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
