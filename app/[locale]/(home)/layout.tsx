import { HomeHeader } from "@/components/home/home-header"
import { getAllSidebarBrands } from "@/data/brands"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const sidebarBrands = getAllSidebarBrands()

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-surface focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        Skip to content
      </a>
      <HomeHeader brands={sidebarBrands} />
      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>
    </div>
  )
}
