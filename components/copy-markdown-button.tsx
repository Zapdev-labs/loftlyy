"use client"

import { useEffect, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { IconCheck, IconMarkdown } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export function CopyMarkdownButton({
  slug,
  className,
}: {
  slug: string
  className?: string
}) {
  const t = useTranslations("brand")
  const locale = useLocale()
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
  const href = `/${locale}/${slug}.md`

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    []
  )

  async function copyMarkdown() {
    const response = await fetch(href)
    const markdown = await response.text()
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={() => copyMarkdown()}
      aria-label={t("copyMarkdown")}
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-surface-muted px-2.5 py-1 transition-colors duration-150 hover:bg-accent hover:text-foreground",
        className
      )}
    >
      {copied ? (
        <IconCheck className="size-3" />
      ) : (
        <IconMarkdown className="size-3" />
      )}
      <span>{copied ? t("copied") : t("copyMarkdown")}</span>
    </button>
  )
}
