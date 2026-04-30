import type { SummaryItem } from "@/lib/seo"

export function BrandSeoSummary({
  title,
  items,
}: {
  title: string
  items: SummaryItem[]
}) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className="flex max-w-3xl flex-col gap-3">
      <h2 className="text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
        {title}
      </h2>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item.kind}
            className="text-[14px] leading-relaxed text-muted-foreground"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </section>
  )
}
