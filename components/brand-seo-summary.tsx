import type { SummaryItem } from "@/lib/seo"

export function BrandSeoSummary({ items }: { items: SummaryItem[] }) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className="flex max-w-3xl flex-col gap-2">
      {items.map((item) => (
        <p
          key={item.kind}
          className="text-[13px] leading-relaxed text-muted-foreground"
        >
          {item.text}
        </p>
      ))}
    </div>
  )
}
