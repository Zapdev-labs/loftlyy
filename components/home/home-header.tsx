"use client"

import { Suspense } from "react"
import Image from "next/image"
import { IconBrandGithub } from "@tabler/icons-react"
import { Link } from "@/i18n/navigation"
import { CommandMenu } from "@/components/command-menu"
import { ListCompanyButton } from "@/components/list-company-button"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { useBrandFilters } from "@/hooks/use-brand-filters"
import type { SidebarBrand } from "@/lib/types"

function HomeSearch({ brands }: { brands: SidebarBrand[] }) {
  const { filters, hasActiveFilters, toggleFilter, clearFilters } =
    useBrandFilters()

  return (
    <CommandMenu
      brands={brands}
      filters={filters}
      onToggleFilter={toggleFilter}
      onClearFilters={clearFilters}
      hasActiveFilters={hasActiveFilters}
      triggerClassName="h-11 items-center py-0"
    />
  )
}

export function HomeHeader({ brands }: { brands: SidebarBrand[] }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-3 bg-background px-4 sm:px-6">
      <Link
        href="/"
        aria-label="Loftlyy home"
        className="flex shrink-0 items-center gap-2.5"
      >
        <Image
          src="/logo.webp"
          alt="Loftlyy"
          width={28}
          height={28}
          className="rounded-lg"
        />
        <span className="hidden text-[15px] font-semibold tracking-tight text-foreground sm:inline">
          Loftlyy
        </span>
      </Link>

      <div className="mx-auto w-full max-w-xl flex-1">
        <Suspense>
          <HomeSearch brands={brands} />
        </Suspense>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <a
          href="https://github.com/preetsuthar17/loftlyy"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-muted text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground"
        >
          <IconBrandGithub className="size-4" />
        </a>
        <div className="hidden sm:block">
          <ListCompanyButton inline />
        </div>
        <Suspense>
          <LocaleSwitcher className="h-11 px-4 text-[13px]" />
        </Suspense>
      </div>
    </header>
  )
}
