import type { IncomingMessage, ServerResponse } from "node:http"
import {
  getBrand,
  getBrandCount,
  getBrands,
  getSlugs,
  searchBrands,
} from "../data/loader.js"
import {
  isValidSlug,
  parseLimit,
  parseOffset,
  parseSearchParams,
} from "../utils/validation.js"

const SERVER_VERSION = "1.0.0"

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex)
  if (!result) return null
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

function sendJson(res: ServerResponse, status: number, data: unknown): void {
  const body = JSON.stringify(data)
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  })
  res.end(body)
}

export async function handleHealth(
  _req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  sendJson(res, 200, {
    status: "ok",
    version: SERVER_VERSION,
    brandsLoaded: getBrandCount(),
    timestamp: new Date().toISOString(),
  })
}

export async function handleGetBrandPalette(
  _req: IncomingMessage,
  res: ServerResponse,
  params: { slug: string }
): Promise<void> {
  const { slug } = params

  if (!isValidSlug(slug)) {
    sendJson(res, 400, {
      error: "INVALID_SLUG",
      message:
        "Brand slug must contain only lowercase letters, numbers, and hyphens",
    })
    return
  }

  const brand = getBrand(slug)
  if (!brand) {
    sendJson(res, 404, {
      error: "BRAND_NOT_FOUND",
      message: `No brand found with slug '${slug}'`,
      availableBrands: getSlugs().slice(0, 20),
    })
    return
  }

  sendJson(res, 200, {
    slug: brand.slug,
    name: brand.name,
    description: brand.description,
    industry: brand.industry,
    url: brand.url,
    colors: brand.colors.map((color) => ({
      name: color.name,
      hex: color.hex,
      usage: color.usage,
      rgb: hexToRgb(color.hex),
    })),
    timestamp: new Date().toISOString(),
  })
}

export async function handleListBrands(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  const params = parseSearchParams(req.url ?? "")
  const industry = params.get("industry")
  const limit = parseLimit(params.get("limit"))
  const offset = parseOffset(params.get("offset"))

  let brands = getBrands()
  if (industry) {
    brands = brands.filter(
      (b) => b.industry.toLowerCase() === industry.toLowerCase()
    )
  }

  const total = brands.length
  const paginated = brands.slice(offset, offset + limit)

  sendJson(res, 200, {
    brands: paginated.map((brand) => ({
      slug: brand.slug,
      name: brand.name,
      industry: brand.industry,
      description: brand.description,
      url: brand.url,
      colorCount: brand.colors.length,
      primaryColors: brand.colors.slice(0, 3).map((c) => ({
        name: c.name,
        hex: c.hex,
      })),
    })),
    total,
    limit,
    offset,
  })
}

export async function handleSearch(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  const params = parseSearchParams(req.url ?? "")
  const query = params.get("q") ?? ""
  const hex = params.get("hex") ?? undefined
  const limit = parseLimit(params.get("limit"))

  if (!query && !hex) {
    sendJson(res, 400, {
      error: "MISSING_QUERY",
      message:
        "Provide at least one of: 'q' (text query) or 'hex' (color hex value)",
    })
    return
  }

  const results = searchBrands(query, hex).slice(0, limit)

  sendJson(res, 200, {
    results: results.map((brand) => ({
      slug: brand.slug,
      name: brand.name,
      industry: brand.industry,
      colorCount: brand.colors.length,
      primaryColors: brand.colors.slice(0, 3).map((c) => ({
        name: c.name,
        hex: c.hex,
      })),
    })),
    count: results.length,
    query: query || undefined,
    hex,
  })
}

export async function handleNotFound(
  _req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  sendJson(res, 404, {
    error: "NOT_FOUND",
    message: "Endpoint not found",
    endpoints: [
      "GET /health",
      "GET /api/brands",
      "GET /api/brand/:slug/palette",
      "GET /api/search",
      "GET /sse  (MCP — SSE connection)",
      "POST /messages  (MCP — send message)",
    ],
  })
}
