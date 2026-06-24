import Image from "next/image"
import { useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { IconArrowRight, IconHeart } from "@tabler/icons-react"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { getAllSidebarBrands } from "@/data/brands"
import { AdvertiseSpots } from "@/components/advertise-dialog"
import CarbonAds from "@/components/carbon-ad"
import type { SidebarBrand } from "@/lib/types"

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

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <BrandsLanding brands={getAllSidebarBrands()} />
}

function BrandsLanding({ brands }: { brands: SidebarBrand[] }) {
  const t = useTranslations()

  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col items-center overflow-hidden px-6 py-12 sm:px-10 sm:py-16">
      <div className="hidden w-full max-w-4xl lg:block">
        <AdvertiseSpots />
      </div>

      <div className="absolute right-4 bottom-4 z-10 max-w-[calc(100vw-2rem)]">
        <CarbonAds />
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <section className="flex flex-col items-center gap-7 text-center">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-surface-muted">
            <Image
              src="/logo.webp"
              alt="Loftlyy"
              width={56}
              height={56}
              className="size-full rounded-2xl object-contain"
            />
          </div>

          <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-6xl">
            {t("home.headline")}
          </h1>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("home.subheadline")}
          </p>

          <div className="mt-2 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href={`/${brands[0].slug}`}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[15px] font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90 sm:w-fit"
            >
              {t("home.cta")}
              <IconArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/sponsors/preetsuthar17"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-surface-muted px-7 py-3.5 text-[15px] font-medium text-foreground transition-colors duration-150 hover:bg-accent sm:w-fit"
            >
              <IconHeart size={16} />
              {t("home.sponsor")}
            </a>
          </div>
        </section>

        <div className="relative mt-24 w-full max-w-3xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-[marquee_50s_linear_infinite] gap-12">
            {[...brands, ...brands].map((brand, i) => (
              <Link
                key={`${brand.slug}-fwd-${i}`}
                href={`/${brand.slug}`}
                className="flex h-10 w-10 shrink-0 items-center justify-center opacity-60 transition-opacity duration-150 hover:opacity-100"
              >
                <Image
                  src={brand.thumbnail.src}
                  alt={brand.name}
                  width={40}
                  height={40}
                  className="size-full object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
