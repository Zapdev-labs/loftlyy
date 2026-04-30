import Image from "next/image"
import { Link } from "@/i18n/navigation"
import type { Brand } from "@/lib/types"

export function BrandListingCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/${brand.slug}`}
      className="group flex flex-col gap-4 rounded-2xl bg-surface p-5 transition-colors duration-150 hover:bg-surface-muted"
    >
      <div className="flex h-28 items-center justify-center rounded-xl bg-surface-muted p-5 transition-colors duration-150 group-hover:bg-accent">
        <Image
          src={brand.thumbnail.src}
          alt={brand.name}
          width={brand.thumbnail.width}
          height={brand.thumbnail.height}
          className="max-h-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
          {brand.name}
        </h2>
        <p className="line-clamp-2 text-[13.5px] leading-relaxed text-muted-foreground">
          {brand.description}
        </p>
        <span className="mt-1 text-[11.5px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
          {brand.industry}
        </span>
      </div>
    </Link>
  )
}
