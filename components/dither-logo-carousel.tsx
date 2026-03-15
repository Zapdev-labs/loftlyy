"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import {
  createDitherProgram,
  loadTexture,
  draw,
  dispose,
} from "@/lib/webgl/dither-program"
import type { DitherProgram } from "@/lib/webgl/dither-program"

interface CarouselBrand {
  slug: string
  name: string
  thumbnailSrc: string
}

interface DitherLogoCarouselProps {
  brands: CarouselBrand[]
  interval?: number
  transitionDuration?: number
  ditherScale?: number
  className?: string
}

const RASTER_SIZE = 256
const RASTER_SCALE = 2

function rasterizeSvg(src: string): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const size = RASTER_SIZE * RASTER_SCALE
      const canvas = document.createElement("canvas")
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Failed to get 2d context"))
        return
      }

      // Center the image maintaining aspect ratio with padding
      const aspect = img.naturalWidth / img.naturalHeight
      const padding = size * 0.15
      const available = size - padding * 2
      let drawW: number
      let drawH: number
      if (aspect > 1) {
        drawW = available
        drawH = drawW / aspect
      } else {
        drawH = available
        drawW = drawH * aspect
      }
      const x = (size - drawW) / 2
      const y = (size - drawH) / 2
      ctx.drawImage(img, x, y, drawW, drawH)
      resolve(canvas)
    }
    img.onerror = () => reject(new Error(`Failed to load: ${src}`))
    img.src = src
  })
}

export function DitherLogoCarousel({
  brands,
  interval = 3000,
  transitionDuration = 800,
  ditherScale = 3,
  className,
}: DitherLogoCarouselProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef = useRef<WebGL2RenderingContext | null>(null)
  const programRef = useRef<DitherProgram | null>(null)
  const texturesRef = useRef<WebGLTexture[]>([])
  const rafRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const indexRef = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [noWebGL, setNoWebGL] = useState(false)
  const [fallbackIndex, setFallbackIndex] = useState(0)
  const reducedMotionRef = useRef(false)
  const pausedRef = useRef(false)

  const brandCount = brands.length

  const drawStatic = useCallback(
    (idx: number) => {
      const gl = glRef.current
      const prog = programRef.current
      const textures = texturesRef.current
      if (!gl || !prog || textures.length === 0) return
      const tex = textures[idx % textures.length]
      draw(gl, prog, tex, tex, 0, ditherScale)
    },
    [ditherScale]
  )

  const startTransition = useCallback(
    (fromIdx: number, toIdx: number) => {
      const gl = glRef.current
      const prog = programRef.current
      const textures = texturesRef.current
      if (!gl || !prog || textures.length < 2) return

      const texFrom = textures[fromIdx % textures.length]
      const texTo = textures[toIdx % textures.length]
      const start = performance.now()

      const animate = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(1, elapsed / transitionDuration)

        draw(gl, prog, texFrom, texTo, progress, ditherScale)

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate)
        } else {
          indexRef.current = toIdx
          setCurrentIndex(toIdx)
          scheduleNext()
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transitionDuration, ditherScale]
  )

  const scheduleNext = useCallback(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (pausedRef.current) return
      const from = indexRef.current
      const to = (from + 1) % brandCount

      if (reducedMotionRef.current) {
        const gl = glRef.current
        const prog = programRef.current
        const textures = texturesRef.current
        if (gl && prog && textures.length > 0) {
          indexRef.current = to
          setCurrentIndex(to)
          drawStatic(to)
          scheduleNext()
        }
      } else {
        startTransition(from, to)
      }
    }, interval)
  }, [interval, brandCount, drawStatic, startTransition])

  useEffect(() => {
    if (brands.length < 2) return

    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
    })
    if (!gl) {
      setNoWebGL(true)
      return
    }

    glRef.current = gl
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    // Reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    reducedMotionRef.current = mq.matches
    const onMqChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches
    }
    mq.addEventListener("change", onMqChange)

    // Visibility
    const onVisibility = () => {
      pausedRef.current = document.hidden
      if (!document.hidden) {
        drawStatic(indexRef.current)
        scheduleNext()
      }
    }
    document.addEventListener("visibilitychange", onVisibility)

    // Resize
    const dpr = window.devicePixelRatio || 1
    const resizeCanvas = () => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
      drawStatic(indexRef.current)
    }
    const ro = new ResizeObserver(resizeCanvas)
    ro.observe(canvas)

    // Context loss
    const onLost = (e: Event) => {
      e.preventDefault()
      cancelAnimationFrame(rafRef.current)
      clearTimeout(timerRef.current)
    }
    const onRestored = () => {
      try {
        programRef.current = createDitherProgram(gl)
      } catch {
        // If restoration fails, fall back
      }
    }
    canvas.addEventListener("webglcontextlost", onLost)
    canvas.addEventListener("webglcontextrestored", onRestored)

    // Init
    let disposed = false
    try {
      programRef.current = createDitherProgram(gl)
    } catch {
      setNoWebGL(true)
      return
    }

    // Load textures
    const loadAll = async () => {
      const textures: WebGLTexture[] = []
      for (const brand of brands) {
        if (disposed) return
        try {
          const raster = await rasterizeSvg(brand.thumbnailSrc)
          const tex = loadTexture(gl, raster)
          textures.push(tex)
        } catch {
          // Skip failed textures
        }
      }
      if (disposed || textures.length === 0) return
      texturesRef.current = textures
      resizeCanvas()
      drawStatic(0)
      scheduleNext()
    }

    loadAll()

    return () => {
      disposed = true
      cancelAnimationFrame(rafRef.current)
      clearTimeout(timerRef.current)
      mq.removeEventListener("change", onMqChange)
      document.removeEventListener("visibilitychange", onVisibility)
      canvas.removeEventListener("webglcontextlost", onLost)
      canvas.removeEventListener("webglcontextrestored", onRestored)
      ro.disconnect()
      for (const tex of texturesRef.current) {
        gl.deleteTexture(tex)
      }
      if (programRef.current) {
        dispose(gl, programRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brands])

  // Fallback: CSS crossfade for no-WebGL
  useEffect(() => {
    if (!noWebGL || brands.length < 2) return
    const id = setInterval(() => {
      setFallbackIndex((prev) => (prev + 1) % brands.length)
    }, interval)
    return () => clearInterval(id)
  }, [noWebGL, brands.length, interval])

  const activeBrand = brands[currentIndex] ?? brands[0]

  if (noWebGL) {
    return (
      <Link
        href={`/${activeBrand.slug}`}
        aria-label={activeBrand.name}
        className={className}
      >
        <div className="relative size-full">
          {brands.map((brand, i) => (
            <div
              key={brand.slug}
              className="absolute inset-0 flex items-center justify-center p-3 transition-opacity duration-700"
              style={{ opacity: i === fallbackIndex ? 1 : 0 }}
            >
              <Image
                src={brand.thumbnailSrc}
                alt={brand.name}
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/${activeBrand.slug}`}
      aria-label={activeBrand.name}
      className={className}
    >
      <canvas
        ref={canvasRef}
        className="size-full"
        role="img"
        aria-label={activeBrand.name}
      />
    </Link>
  )
}
