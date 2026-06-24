import { getAllBrands, getBrandBySlug } from "@/data/brands"
import { routing } from "@/i18n/routing"
import { brandToMarkdown } from "@/lib/brand-markdown"
import { getBuildOnlyStaticParams } from "@/lib/static-params"

export const dynamic = "force-static"

export function generateStaticParams() {
  return getBuildOnlyStaticParams(() =>
    routing.locales.flatMap((locale) =>
      getAllBrands().map((brand) => ({ locale, slug: brand.slug }))
    )
  )
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string; slug: string }> }
) {
  const { slug } = await params
  const brand = getBrandBySlug(slug)

  if (!brand) {
    return new Response("Not found", { status: 404 })
  }

  return new Response(brandToMarkdown(brand), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  })
}
