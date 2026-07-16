import { Suspense } from "react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { getAllHomeBrands, getAllSidebarBrands } from "@/data/brands"
import { HomeGrid } from "@/components/home/home-grid"

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

  return (
    <Suspense>
      <HomeGrid
        brands={getAllHomeBrands()}
        sidebarBrands={getAllSidebarBrands()}
      />
    </Suspense>
  )
}
