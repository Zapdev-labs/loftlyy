import { Suspense } from "react"
import Image from "next/image"
import { IconHeart } from "@tabler/icons-react"
import { Link } from "@/i18n/navigation"
import { getAllSidebarBrands } from "@/data/brands"
import { LocaleSwitcher } from "./locale-switcher"
import { BrandSidebarSearch } from "./brand-sidebar-search"

export function BrandSidebar() {
  const brands = getAllSidebarBrands()

  return (
    <aside
      className="hidden h-full w-[280px] shrink-0 flex-col bg-sidebar lg:flex"
      id="brand-sidebar"
    >
      {/* Header — fixed top */}
      <div className="shrink-0 px-5 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link href="/" aria-label="Loftlyy home">
              <Image
                src="/logo.webp"
                alt="Loftlyy"
                width={32}
                height={32}
                className="rounded-xl"
              />
            </Link>
            <div className="flex flex-col">
              <Link
                href="/"
                className="text-[15px] font-semibold tracking-tight text-foreground"
              >
                Loftlyy
              </Link>
              <a
                href="https://hanoa.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                by Hanoa Studio
              </a>
            </div>
          </div>

          <LocaleSwitcher />
        </div>
      </div>

      {/* Brand list — scrollable middle */}
      <div className="min-h-0 flex-1 pt-5">
        <Suspense>
          <BrandSidebarSearch brands={brands} />
        </Suspense>
      </div>

      {/* Sponsor — fixed bottom */}
      <div className="shrink-0 px-5 pt-2 pb-5">
        <a
          href="https://github.com/sponsors/preetsuthar17"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-surface-muted px-4 py-2.5 text-[13px] font-medium text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground"
        >
          <IconHeart size={15} />
          Support us
        </a>
      </div>
    </aside>
  )
}
