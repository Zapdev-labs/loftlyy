"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

const CARBON_SRC =
  "//cdn.carbonads.com/carbon.js?serve=CWBDP23M&placement=wwwloftlyycom&format=cover"

const CarbonAds = () => {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.replaceChildren()
    document.querySelector("#carbonads")?.remove()

    const script = document.createElement("script")
    script.src = CARBON_SRC
    script.id = "_carbonads_js"
    script.async = true
    container.appendChild(script)

    return () => {
      script.remove()
      document.querySelector("#carbonads")?.remove()
    }
  }, [pathname])

  return <div id="carbon-container" ref={containerRef} />
}

export default CarbonAds
