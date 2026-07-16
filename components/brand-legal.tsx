"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import {
  IconScale,
  IconChevronRight,
  IconExternalLink,
} from "@tabler/icons-react"
import { cn, buildUtmUrl } from "@/lib/utils"
import type { Brand } from "@/lib/types"

export function BrandLegal({ brand }: { brand: Brand }) {
  const [expanded, setExpanded] = useState(false)
  const t = useTranslations("brand")

  return (
    <footer className="flex flex-col items-center gap-4 pt-16 text-center">
      <div className="flex max-w-2xl items-start gap-2 text-[12px] leading-relaxed text-muted-foreground">
        <IconScale className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <p>{t("legalNotice", { brandName: brand.name })}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {brand.legal?.guidelinesUrl && (
          <a
            href={buildUtmUrl(brand.legal.guidelinesUrl, brand.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1.5 text-[11.5px] font-medium text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("viewGuidelines")}
            <IconExternalLink className="h-3 w-3" />
          </a>
        )}

        {brand.legal && (brand.legal.dos || brand.legal.donts) && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1.5 text-[11.5px] font-medium text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("brandGuidelines")}
            <IconChevronRight
              className={cn(
                "h-3 w-3 transition-transform duration-150",
                expanded && "rotate-90"
              )}
            />
          </button>
        )}
      </div>

      {brand.legal && (brand.legal.dos || brand.legal.donts) && (
        <div
          className="grid w-full max-w-2xl transition-[grid-template-rows] duration-200 ease-out"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="mt-2 flex flex-col gap-5 rounded-2xl bg-surface-muted p-5 text-left">
              {brand.legal.donts && brand.legal.donts.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-[10.5px] font-medium tracking-[0.12em] text-destructive uppercase">
                    {t("donts")}
                  </span>
                  <ul className="flex flex-col gap-1.5">
                    {brand.legal.donts.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-[12.5px] leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {brand.legal.dos && brand.legal.dos.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-[10.5px] font-medium tracking-[0.12em] text-foreground uppercase">
                    {t("dos")}
                  </span>
                  <ul className="flex flex-col gap-1.5">
                    {brand.legal.dos.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-[12.5px] leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
