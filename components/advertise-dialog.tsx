"use client"

import Image from "next/image"
import {
  IconExternalLink,
  IconEye,
  IconSpeakerphone,
  IconUsers,
  IconBolt,
} from "@tabler/icons-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Ad {
  name: string
  description: string
  url: string
  favicon: string
}

const ads: Ad[] = []

const TOTAL_SPOTS = 4
const SPOTS_TAKEN = ads.length
const SPOTS_LEFT = TOTAL_SPOTS - SPOTS_TAKEN

const stats = [
  {
    icon: IconUsers,
    value: "15K+",
    label: "Monthly visitors",
  },
  {
    icon: IconEye,
    value: "High-intent",
    label: "Designers, devs & founders",
  },
  {
    icon: IconBolt,
    value: `${SPOTS_LEFT}/${TOTAL_SPOTS}`,
    label: "Spots left",
    highlight: true,
  },
]

function AdvertiseDialogBody() {
  return (
    <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Advertise on Loftlyy</DialogTitle>
        <DialogDescription>
          Get your product in front of designers, developers, and founders every
          month.
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-2xl p-3",
              stat.highlight ? "bg-destructive/15" : "bg-surface-muted"
            )}
          >
            <stat.icon
              size={18}
              className={cn(
                "shrink-0",
                stat.highlight ? "text-destructive" : "text-muted-foreground"
              )}
            />
            <span
              className={cn(
                "text-sm font-semibold",
                stat.highlight ? "text-destructive" : "text-foreground"
              )}
            >
              {stat.value}
            </span>
            <span className="text-center text-[10px] leading-tight text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium text-foreground">How it works</h4>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Your product appears in the sponsor slots on the Loftlyy homepage,
          visible to every visitor across all pages. Spots are limited to ensure
          maximum visibility for each advertiser.
        </p>
      </div>

      <div className="rounded-2xl bg-surface-muted p-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground">Pricing</p>
          <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-semibold text-background">
            60% OFF
          </span>
        </div>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-foreground">$199</span>
          <span className="text-sm text-muted-foreground line-through">
            $499
          </span>
          <span className="text-sm text-muted-foreground">/month</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {SPOTS_LEFT} spots available now. Cancel anytime.
        </p>
      </div>

      <DialogFooter className="!flex-col gap-3">
        <a
          href="https://store.hextaui.com/checkout/buy/0fadcc42-8038-46e7-b0f8-5e3cae5d8935"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90"
        >
          Get started ($199/mo)
          <IconExternalLink size={14} />
        </a>
        <p className="text-center text-xs text-muted-foreground">
          Use code{" "}
          <span className="font-semibold text-foreground">LAUNCH20</span> for
          20% off — only for the first 4 sponsors.
        </p>
      </DialogFooter>
    </DialogContent>
  )
}

export function AdvertiseMarquee() {
  const items = [
    ...ads.map((ad) => ({ type: "ad" as const, ad })),
    ...Array.from({ length: SPOTS_LEFT }, (_, i) => ({
      type: "empty" as const,
      index: i,
    })),
  ]
  const doubled = [...items, ...items]

  return (
    <Dialog>
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-[marquee_20s_linear_infinite] gap-3">
          {doubled.map((item, i) =>
            item.type === "ad" ? (
              <a
                key={`marquee-ad-${i}`}
                href={`${item.ad.url}?ref=loftlyy&utm_source=loftlyy&utm_medium=sponsorship&utm_campaign=ad_spot`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 flex-col items-center gap-2.5 rounded-2xl bg-surface-muted px-3.5 py-2.5 transition-colors duration-150 hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={item.ad.favicon}
                    alt={item.ad.name}
                    width={20}
                    height={20}
                    className="rounded-md"
                    unoptimized
                  />
                  <span className="text-xs font-medium whitespace-nowrap text-foreground">
                    {item.ad.name}
                  </span>
                </div>
                <span className="hidden text-[10px] whitespace-nowrap text-muted-foreground sm:inline">
                  {item.ad.description}
                </span>
              </a>
            ) : (
              <DialogTrigger
                key={`marquee-empty-${i}`}
                className="flex shrink-0 cursor-pointer items-center gap-2 rounded-2xl bg-surface-muted px-3.5 py-2.5 text-muted-foreground opacity-70 transition-all duration-150 hover:bg-accent hover:opacity-100"
              >
                <IconSpeakerphone size={16} />
                <span className="text-xs font-medium whitespace-nowrap">
                  Advertise
                </span>
              </DialogTrigger>
            )
          )}
        </div>
      </div>

      <AdvertiseDialogBody />
    </Dialog>
  )
}

export function AdvertiseSpots({
  className,
  compact,
}: {
  className?: string
  compact?: boolean
}) {
  return (
    <Dialog>
      <section
        className={
          className ?? "grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
        }
      >
        {ads.map((ad) => (
          <a
            key={ad.name}
            href={`${ad.url}?ref=loftlyy&utm_source=loftlyy&utm_medium=sponsorship&utm_campaign=ad_spot`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-surface-muted transition-colors duration-150 hover:bg-accent",
              compact ? "px-3 py-4" : "aspect-[4/3]"
            )}
          >
            <Image
              src={ad.favicon}
              alt={ad.name}
              width={28}
              height={28}
              className="rounded-md"
              unoptimized
            />
            <span className="text-sm font-medium text-foreground">
              {ad.name}
            </span>
            <span className="line-clamp-2 max-w-[90%] text-center text-[10px] leading-tight text-muted-foreground">
              {ad.description}
            </span>
          </a>
        ))}
        {Array.from({ length: SPOTS_LEFT }).map((_, i) => (
          <DialogTrigger
            key={`ad-spot-${i}`}
            className={cn(
              "group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-surface-muted text-muted-foreground opacity-70 transition-all duration-150 hover:bg-accent hover:opacity-100",
              compact ? "px-3 py-4" : "aspect-[4/3]"
            )}
          >
            <IconSpeakerphone size={24} />
            <span className="text-sm font-medium">Advertise</span>
            <span className="text-xs">
              {SPOTS_LEFT}/{TOTAL_SPOTS} spots left
            </span>
          </DialogTrigger>
        ))}
      </section>

      <AdvertiseDialogBody />
    </Dialog>
  )
}
