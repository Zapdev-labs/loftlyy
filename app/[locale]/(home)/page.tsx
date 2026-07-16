import { useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { getAllHomeBrands } from "@/data/brands"
import { BrandCard } from "@/components/home/brand-card"
import type { HomeBrand } from "@/lib/types"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    title: `${t("siteName")} — ${t("siteDescription")}`,
    description: `${t("siteDescription")}. Brand identity of brands for inspiration.`,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <HomeGrid brands={getAllHomeBrands()} />
}

function HomeGrid({ brands }: { brands: HomeBrand[] }) {
  const t = useTranslations("home")

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-1 px-4 pt-8 pb-6 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
          {t("headline")}
        </h1>
        <p className="text-[13.5px] text-muted-foreground">
          {t("brandCount", { count: brands.length })}
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-x-6 gap-y-10 px-4 pb-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {brands.map((brand, index) => (
          <BrandCard key={brand.slug} brand={brand} index={index} />
        ))}
      </div>
    </div>
  )
}
