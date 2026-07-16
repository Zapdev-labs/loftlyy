import type { Brand } from "@/lib/types"
import { toAbsoluteUrl } from "@/lib/seo"

function toJsonLdHtml(data: unknown): string {
  return JSON.stringify(data)
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
}

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: toJsonLdHtml(data) }}
      type="application/ld+json"
    />
  )
}

export function SiteStructuredData({
  siteName,
  siteDescription,
  url,
}: {
  siteName: string
  siteDescription: string
  url: string
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    description: siteDescription,
    url,
  }

  return <JsonLd data={jsonLd} />
}

export function BrandStructuredData({ brand }: { brand: Brand }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: brand.url,
    logo: toAbsoluteUrl(brand.thumbnail.src),
    description: brand.description,
    industry: brand.industry,
    sameAs: brand.url ? [brand.url] : undefined,
  }

  return <JsonLd data={jsonLd} />
}

export function BrandPageStructuredData({
  name,
  description,
  url,
  locale,
  about,
  images,
}: {
  name: string
  description: string
  url: string
  locale: string
  about: { name: string; url?: string; logo?: string }
  images: string[]
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    inLanguage: locale,
    about: {
      "@type": "Organization",
      name: about.name,
      url: about.url,
      logo: about.logo,
    },
    ...(images.length > 0 && {
      image: images,
      primaryImageOfPage: images[0],
    }),
  }

  return <JsonLd data={jsonLd} />
}

export function CategoryStructuredData({
  categoryName,
  categoryDescription,
  brands,
  locale,
}: {
  categoryName: string
  categoryDescription: string
  brands: Brand[]
  locale: string
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: categoryName,
    description: categoryDescription,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: brands.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `/${locale}/${b.slug}`,
        name: b.name,
      })),
    },
  }

  return <JsonLd data={jsonLd} />
}

export function ListingStructuredData({
  name,
  description,
  brands,
  locale,
}: {
  name: string
  description: string
  brands: Brand[]
  locale: string
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: brands.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `/${locale}/${b.slug}`,
        name: b.name,
      })),
    },
  }

  return <JsonLd data={jsonLd} />
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <JsonLd data={jsonLd} />
}

export function FAQStructuredData({
  questions,
}: {
  questions: { question: string; answer: string }[]
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }

  return <JsonLd data={jsonLd} />
}
