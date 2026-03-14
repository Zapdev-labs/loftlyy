import Image from "next/image"
import { notFound } from "next/navigation"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { getAllCategories, getCategoryBySlug } from "@/data/categories"
import { getBrandsByCategory } from "@/data/brands"
import { routing } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import { Badge } from "@/components/ui/badge"
import { CategoryStructuredData } from "@/components/structured-data"

export async function generateStaticParams() {
  const categories = getAllCategories()
  return routing.locales.flatMap((locale) =>
    categories.map((cat) => ({ locale, "category-slug": cat.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; "category-slug": string }>
}) {
  const { locale, "category-slug": categorySlug } = await params
  const category = getCategoryBySlug(categorySlug)
  if (!category) return {}

  const brands = getBrandsByCategory(categorySlug)
  const [t, tCat] = await Promise.all([
    getTranslations({ locale, namespace: "seo" }),
    getTranslations({ locale, namespace: "categories" }),
  ])

  const categoryName = tCat(categorySlug)

  const title = t("categoryTitle", { category: categoryName })
  const description = t("categoryDescription", {
    count: brands.length,
    category: categoryName,
  })

  return {
    title,
    description,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/category/${categorySlug}`])
      ),
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; "category-slug": string }>
}) {
  const { locale, "category-slug": categorySlug } = await params
  setRequestLocale(locale)

  const category = getCategoryBySlug(categorySlug)
  if (!category) notFound()

  const brands = getBrandsByCategory(categorySlug)
  const [t, tCat] = await Promise.all([
    getTranslations({ locale, namespace: "category" }),
    getTranslations({ locale, namespace: "categories" }),
  ])

  const categoryName = tCat(categorySlug)

  return (
    <main className="flex flex-col gap-8 p-8">
      <CategoryStructuredData
        categoryName={categoryName}
        categoryDescription={t("description", {
          count: brands.length,
          category: categoryName,
        })}
        brands={brands}
        locale={locale}
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-pretty">
          {t("title", { category: categoryName })}
        </h1>
        <p className="text-muted-foreground">
          {t("description", { count: brands.length, category: categoryName })}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/${brand.slug}`}
            className="group flex flex-col gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
          >
            <div className="flex h-20 items-center justify-center rounded-md bg-background p-3">
              <Image
                src={brand.thumbnail.src}
                alt={brand.name}
                width={brand.thumbnail.width}
                height={brand.thumbnail.height}
                className="max-h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 className="font-semibold">{brand.name}</h2>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {brand.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary">{brand.industry}</Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {brands.length === 0 && (
        <p className="text-center text-muted-foreground">
          {t("noBrandsInCategory")}
        </p>
      )}
    </main>
  )
}
