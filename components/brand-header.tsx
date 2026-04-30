import Image from "next/image"
import { useTranslations } from "next-intl"
import { IconArrowsShuffle2, IconExternalLink } from "@tabler/icons-react"
import { Link } from "@/i18n/navigation"
import { buildUtmUrl } from "@/lib/utils"
import type { Brand } from "@/lib/types"

export function BrandHeader({
  brand,
  translatedDescription,
  translatedIndustry,
  translatedTags,
}: {
  brand: Brand
  translatedDescription: string
  translatedIndustry: string
  translatedTags: Record<string, string>
}) {
  const t = useTranslations("brand")

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-start gap-5">
        <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-surface-muted">
          <Image
            src={brand.thumbnail.src}
            alt={`${brand.name} logo`}
            width={56}
            height={56}
            className="h-full w-full object-contain p-3"
            priority
          />
        </div>
        <div className="flex min-w-0 flex-col gap-1 pt-1">
          <h1 className="text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
            {brand.name}
          </h1>
          <span className="text-[13px] text-muted-foreground">
            {translatedIndustry}
          </span>
        </div>
      </div>

      <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        {translatedDescription}
      </p>

      <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-muted-foreground">
        {brand.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-surface-muted px-2.5 py-1 text-foreground"
          >
            {translatedTags[tag] ?? tag}
          </span>
        ))}
        {brand.url && (
          <a
            href={buildUtmUrl(brand.url, brand.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1 text-background transition-opacity duration-150 hover:opacity-90"
          >
            {t("visitWebsite")}
            <IconExternalLink className="size-3" />
          </a>
        )}
        <Link
          href={`/compare?brands=${brand.slug}`}
          className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-2.5 py-1 transition-colors duration-150 hover:bg-accent hover:text-foreground"
        >
          <IconArrowsShuffle2 className="size-3" />
          <span>{t("compareBrand")}</span>
        </Link>
      </div>
    </section>
  )
}
