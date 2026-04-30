import { Link } from "@/i18n/navigation"

export function BrowseBySection({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string; count?: number }[]
}) {
  if (links.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
        {title}
      </h2>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors duration-150 hover:bg-accent"
          >
            {link.label}
            {link.count !== undefined && (
              <span className="text-muted-foreground">({link.count})</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
