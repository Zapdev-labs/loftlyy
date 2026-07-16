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

  if (!brand.philosophy) return null

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {t("brandStory")}
      </h2>
      <blockquote className="max-w-3xl text-lg leading-relaxed text-foreground sm:text-xl">
        {translatedPhilosophy ?? brand.philosophy}
      </blockquote>
    </section>
  )
}
