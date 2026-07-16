"use client"

import { IconMenu2, IconX, IconHeart } from "@tabler/icons-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Suspense, useState, useRef, useEffect, useCallback } from "react"

import type { SidebarBrand } from "@/lib/types"

import { LocaleSwitcher } from "./locale-switcher"
import { Link } from "@/i18n/navigation"

const BrandSidebarSearch = dynamic(
  () => import("./brand-sidebar-search").then((m) => m.BrandSidebarSearch),
  { ssr: false }
)

export function MobileSidebarToggle({ brands }: { brands: SidebarBrand[] }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const sidebarRef = useRef<HTMLElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, close])

  useEffect(() => {
    if (!open) return
    const main =
      document.querySelector("main") ?? document.getElementById("main-content")
    if (main) main.setAttribute("inert", "")
    return () => {
      main?.removeAttribute("inert")
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 hover:bg-surface-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Open sidebar"
      >
        <IconMenu2 className="h-5 w-5" />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 animate-in bg-black/20 backdrop-blur-sm duration-200 fade-in"
            onClick={close}
            aria-label="Close sidebar"
          />
          <aside
            ref={sidebarRef}
            role="dialog"
            aria-modal="true"
            aria-label="Sidebar"
            style={{ boxShadow: "var(--shadow-soft)" }}
            className="fixed inset-y-0 left-0 z-50 flex w-[300px] animate-in flex-col gap-4 overflow-hidden overscroll-y-contain rounded-r-3xl bg-sidebar pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] duration-200 slide-in-from-left"
          >
            <div className="flex shrink-0 items-center justify-between px-5 pt-5 lg:pt-0">
              <div className="flex items-center gap-2.5">
                <Link href="/" aria-label="Loftlyy home" onClick={close}>
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
                    onClick={close}
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
              <div className="flex items-center gap-2">
                <LocaleSwitcher />
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 hover:bg-surface-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Close sidebar"
                >
                  <IconX className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 px-0">
              <Suspense>
                <BrandSidebarSearch brands={brands} onNavigate={close} />
              </Suspense>
            </div>
            <div className="shrink-0 px-5 pb-5">
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
        </>
      )}
    </>
  )
}
