import { useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

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
  }
}

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <BrandsLanding />
}

function BrandsLanding() {
  const t = useTranslations("brand")

  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-[13px] text-neutral-400">{t("selectBrand")}</p>
    </div>
  )
}
