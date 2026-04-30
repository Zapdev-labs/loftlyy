import { useTranslations } from "next-intl"
import type { Brand } from "@/lib/types"

export function BrandStory({
  brand,
  translatedPhilosophy,
}: {
  brand: Brand
  translatedPhilosophy?: string
}) {
  const t = useTranslations("brand")

  const hasStory =
    brand.founded ||
    brand.headquarters ||
    brand.designer ||
    brand.lastRebranded ||
    brand.philosophy

  if (!hasStory) return null

  const meta = [
    brand.founded && { label: t("founded"), value: String(brand.founded) },
    brand.headquarters && {
      label: t("headquarters"),
      value: brand.headquarters,
    },
    brand.designer && { label: t("identityDesigner"), value: brand.designer },
    brand.lastRebranded && {
      label: t("lastRebranded"),
      value: brand.lastRebranded,
    },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-5">
      <h2 className="text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
        {t("brandStory")}
      </h2>

      {meta.length > 0 && (
        <div className="flex flex-wrap gap-x-8 gap-y-4 rounded-2xl bg-surface-muted p-5">
          {meta.map((item) => (
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
      )}

      {brand.philosophy && (
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground italic">
          &ldquo;{translatedPhilosophy ?? brand.philosophy}&rdquo;
        </p>
      )}
    </section>
  )
}
