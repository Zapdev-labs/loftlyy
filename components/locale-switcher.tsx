"use client"

import { useSearchParams } from "next/navigation"
import { useLocale } from "next-intl"
import { localeMetadata } from "@/i18n/locales"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { searchParamsToQuery } from "@/lib/utils"

export function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function onLocaleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.replace(
      {
        pathname,
        query: searchParamsToQuery(searchParams),
      },
      {
        locale: e.target.value,
      }
    )
  }

  return (
    <select
      value={locale}
      onChange={onLocaleChange}
      name="locale"
      aria-label="Language"
      className="h-7 appearance-none rounded-full bg-surface-muted px-3 text-[11px] font-medium text-muted-foreground transition-colors duration-150 outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
    >
      {routing.locales.map((l) => (
        <option key={l} value={l}>
          {localeMetadata[l].shortLabel}
        </option>
      ))}
    </select>
  )
}
