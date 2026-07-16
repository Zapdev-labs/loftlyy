"use client"

import { IconArrowUpRight } from "@tabler/icons-react"

import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

const LIST_COMPANY_URL =
  "https://store.hextaui.com/checkout/buy/8491b3e3-a959-4294-8e6f-5518488f5242"

export function ListCompanyButton({ inline = false }: { inline?: boolean }) {
  return (
    <a
      href={LIST_COMPANY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({ size: inline ? "default" : "sm" }),
        inline && "h-11 text-[13px]",
        !inline && "fixed top-8 right-8 z-50"
      )}
      style={inline ? undefined : { boxShadow: "var(--shadow-soft)" }}
    >
      List your company
      <IconArrowUpRight className="size-4" />
    </a>
  )
}
