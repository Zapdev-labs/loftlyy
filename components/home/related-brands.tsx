import { BrandCard } from "@/components/home/brand-card"
import type { HomeBrand } from "@/lib/types"

export function RelatedBrands({
  title,
  brands,
}: {
  title: string
  brands: HomeBrand[]
}) {
  if (brands.length === 0) return null

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <BrandCard key={brand.slug} brand={brand} />
        ))}
      </div>
    </section>
  )
}
