import Image from "next/image"
import { useTranslations } from "next-intl"
import { IconArrowsShuffle2, IconExternalLink } from "@tabler/icons-react"
import { Link } from "@/i18n/navigation"
import { cn, buildUtmUrl } from "@/lib/utils"
import type { Brand } from "@/lib/types"
import { CopyMarkdownButton } from "@/components/copy-markdown-button"

export function BrandHeader({
  brand,
  translatedDescription,
  translatedIndustry,
  translatedCategories,
}: {
  brand: Brand
  translatedDescription: string
  translatedIndustry: string
  translatedCategories: string[]
}) {
  const t = useTranslations("brand")

  const metaColumns = [
    { label: t("industry"), value: translatedIndustry },
    translatedCategories.length > 0 && {
      label: t("categories"),
      value: translatedCategories.join(", "),
    },
    brand.founded && { label: t("founded"), value: String(brand.founded) },
    brand.headquarters && {
      label: t("headquarters"),
      value: brand.headquarters,
    },
    brand.designer && {
      label: t("identityDesigner"),
      value: brand.designer,
    },
    brand.lastRebranded && {
      label: t("lastRebranded"),
      value: brand.lastRebranded,
    },
  ].filter(Boolean) as { label: string; value: string }[]

  const pillClassName =
    "inline-flex h-11 items-center gap-1.5 rounded-full px-5 text-[13.5px] font-medium transition-colors duration-150"

  return (
    <section className="flex flex-col gap-6">
      <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-surface-muted p-5 sm:size-28">
        <Image
          src={brand.thumbnail.src}
          alt={`${brand.name} logo`}
          width={brand.thumbnail.width}
          height={brand.thumbnail.height}
          className={cn(
            "h-auto max-h-full w-auto max-w-full object-contain",
            brand.thumbnailDark && "dark:hidden"
          )}
          priority
        />
        {brand.thumbnailDark && (
          <Image
            src={brand.thumbnailDark.src}
            alt={`${brand.name} logo`}
            width={brand.thumbnailDark.width}
            height={brand.thumbnailDark.height}
            className="hidden h-auto max-h-full w-auto max-w-full object-contain dark:block"
            priority
          />
        )}
      </div>

      <h1 className="text-3xl leading-[1.1] font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-5xl">
        {brand.name}
      </h1>

      <div className="flex flex-wrap gap-x-12 gap-y-4">
        {metaColumns.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <span className="text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
              {item.label}
            </span>
            <span className="text-[14px] font-medium text-foreground">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {brand.url && (
          <a
            href={buildUtmUrl(brand.url, brand.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              pillClassName,
              "bg-foreground text-background hover:opacity-90"
            )}
          >
            {t("visitWebsite")}
            <IconExternalLink className="size-3.5" />
          </a>
        )}
        <Link
          href={`/compare?brands=${brand.slug}`}
          className={cn(
            pillClassName,
            "bg-surface-muted text-foreground hover:bg-accent"
          )}
        >
          <IconArrowsShuffle2 className="size-3.5" />
          <span>{t("compareBrand")}</span>
        </Link>
        <CopyMarkdownButton slug={brand.slug} className={pillClassName} />
      </div>

      <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
        {translatedDescription}
      </p>
    </section>
  )
}
