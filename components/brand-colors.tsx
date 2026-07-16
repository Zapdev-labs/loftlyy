"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import { IconCopy, IconCheck } from "@tabler/icons-react"
import type { BrandColor } from "@/lib/types"

export function BrandColors({ colors }: { colors: BrandColor[] }) {
  const [paletteCopied, setPaletteCopied] = useState(false)
  const t = useTranslations("brand")
  const paletteTimerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(
    () => () => {
      if (paletteTimerRef.current) clearTimeout(paletteTimerRef.current)
    },
    []
  )

  async function copyPalette() {
    const json = JSON.stringify(
      colors.map((c) => ({
        name: c.name,
        hex: c.hex,
        ...(c.usage && { usage: c.usage }),
      })),
      null,
      2
    )
    await navigator.clipboard.writeText(json)
    setPaletteCopied(true)
    if (paletteTimerRef.current) clearTimeout(paletteTimerRef.current)
    paletteTimerRef.current = setTimeout(() => setPaletteCopied(false), 1500)
  }

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {t("colors")}
        </h2>
        <button
          type="button"
          onClick={copyPalette}
          aria-label={t("copyPaletteJson")}
          className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors duration-150 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
        >
          {paletteCopied ? (
            <>
              <IconCheck className="h-3 w-3" />
              <span>{t("copied")}</span>
            </>
          ) : (
            <>
              <IconCopy className="h-3 w-3" />
              <span>{t("copyPaletteJson")}</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {colors.map((color) => (
          <ColorTile key={`${color.hex}-${color.name}`} color={color} />
        ))}
      </div>
    </section>
  )
}

function ColorTile({ color }: { color: BrandColor }) {
  const [copied, setCopied] = useState(false)
  const t = useTranslations("brand")
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    []
  )

  async function copyHex() {
    await navigator.clipboard.writeText(color.hex)
    setCopied(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={copyHex}
      aria-label={t("copyHex")}
      className="group flex flex-col gap-2.5 overflow-hidden rounded-2xl bg-surface-muted p-1 text-left transition-colors duration-150 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        className="h-28 w-full rounded-[1.4rem]"
        style={{ backgroundColor: color.hex }}
      />
      <div className="flex items-start justify-between gap-2 px-4 pb-2">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[13px] font-medium text-foreground">
            {color.name}
          </span>
          {color.usage && (
            <span className="truncate text-[11px] text-muted-foreground">
              {color.usage}
            </span>
          )}
        </div>
        <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
          {copied ? t("copied") : color.hex.toUpperCase()}
        </span>
      </div>
    </button>
  )
}
