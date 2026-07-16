import { Link } from "@/i18n/navigation"

type BrowseGroup = {
  label: string
  links: { href: string; label: string }[]
}

export function BrandBrowseMore({
  title,
  groups,
}: {
  title: string
  groups: BrowseGroup[]
}) {
  const visibleGroups = groups.filter((group) => group.links.length > 0)

  if (visibleGroups.length === 0) return null

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="flex flex-col gap-3">
        {visibleGroups.map((group) => (
          <div key={group.label} className="flex flex-wrap items-center gap-2">
            <span className="w-28 shrink-0 text-[13px] text-muted-foreground">
              {group.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors duration-150 hover:bg-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
