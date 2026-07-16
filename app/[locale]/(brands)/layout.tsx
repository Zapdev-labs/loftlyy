import { BrandSidebar } from "@/components/brand-sidebar"
import { MobileSidebarToggle } from "@/components/mobile-sidebar-toggle"
import { getAllSidebarBrands } from "@/data/brands"

export default function BrandsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const sidebarBrands = getAllSidebarBrands()

  return (
    <div className="flex h-dvh bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-surface focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        Skip to content
      </a>
      <BrandSidebar />
      <div className="flex min-w-0 flex-1 flex-col p-2 sm:p-3 lg:py-4 lg:pr-4 lg:pl-0">
        <header className="flex shrink-0 items-center pb-2 lg:hidden">
          <MobileSidebarToggle brands={sidebarBrands} />
        </header>
        <main
          id="main-content"
          className="flex flex-1 flex-col overflow-y-auto rounded-3xl bg-surface"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
