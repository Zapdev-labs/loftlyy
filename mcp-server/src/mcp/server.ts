import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { getBrand, getBrands, getSlugs } from "../data/loader.js"

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex)
  if (!result) return null
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "loftlyy-brands",
    version: "1.0.0",
  })

  // Tool: get_brand_palette
  server.tool(
    "get_brand_palette",
    "Retrieve the full color palette for a brand by its slug. Returns all brand colors with hex values, RGB values, and usage descriptions.",
    {
      brand_slug: z
        .string()
        .describe(
          "The brand slug identifier (e.g. 'apple', 'meta', 'google', 'stripe')"
        ),
      include_usage: z
        .boolean()
        .optional()
        .default(true)
        .describe(
          "Whether to include usage descriptions for each color (default: true)"
        ),
    },
    async ({ brand_slug, include_usage = true }) => {
      const brand = getBrand(brand_slug)

      if (!brand) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify({
                error: "BRAND_NOT_FOUND",
                message: `No brand found with slug '${brand_slug}'`,
                availableBrands: getSlugs(),
              }),
            },
          ],
          isError: true,
        }
      }

      const palette = brand.colors.map((color) => ({
        name: color.name,
        hex: color.hex,
        ...(include_usage && color.usage ? { usage: color.usage } : {}),
        rgb: hexToRgb(color.hex),
      }))

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                brand: {
                  slug: brand.slug,
                  name: brand.name,
                  industry: brand.industry,
                  url: brand.url,
                },
                palette,
                colorCount: palette.length,
              },
              null,
              2
            ),
          },
        ],
      }
    }
  )

  // Tool: list_brands
  server.tool(
    "list_brands",
    "List all available brands with their basic metadata and primary colors.",
    {
      industry: z
        .string()
        .optional()
        .describe(
          "Filter brands by industry (e.g. 'technology', 'food', 'fashion')"
        ),
      limit: z
        .number()
        .optional()
        .default(50)
        .describe("Maximum number of brands to return (max 100, default 50)"),
    },
    async ({ industry, limit = 50 }) => {
      let filtered = getBrands()

      if (industry) {
        filtered = filtered.filter(
          (b) => b.industry.toLowerCase() === industry.toLowerCase()
        )
      }

      const capped = Math.min(limit, 100)
      const result = filtered.slice(0, capped)

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                brands: result.map((brand) => ({
                  slug: brand.slug,
                  name: brand.name,
                  industry: brand.industry,
                  colorCount: brand.colors.length,
                  primaryColor: brand.colors[0]?.hex,
                  primaryColors: brand.colors.slice(0, 3).map((c) => c.hex),
                })),
                total: filtered.length,
                returned: result.length,
              },
              null,
              2
            ),
          },
        ],
      }
    }
  )

  // Tool: search_brands
  server.tool(
    "search_brands",
    "Search brands by name, description, industry, tags, or hex color value.",
    {
      query: z
        .string()
        .optional()
        .default("")
        .describe("Text search query (brand name, industry, tags, description)"),
      hex: z
        .string()
        .optional()
        .describe("Search by hex color value (e.g. '#FF0000' or 'FF0000')"),
      limit: z
        .number()
        .optional()
        .default(20)
        .describe("Maximum number of results to return (max 50, default 20)"),
    },
    async ({ query = "", hex, limit = 20 }) => {
      if (!query && !hex) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify({
                error: "MISSING_QUERY",
                message: "Provide at least one of: query (text) or hex (color)",
              }),
            },
          ],
          isError: true,
        }
      }

      const capped = Math.min(limit, 50)
      const results = getBrands()
        .filter((brand) => {
          const q = query.toLowerCase().trim()
          const hexQ = hex?.toLowerCase().replace("#", "").trim()

          const matchesText =
            !q ||
            brand.name.toLowerCase().includes(q) ||
            brand.description.toLowerCase().includes(q) ||
            brand.industry.toLowerCase().includes(q) ||
            brand.tags?.some((tag) => tag.toLowerCase().includes(q))

          const matchesHex =
            !hexQ ||
            brand.colors.some((color) =>
              color.hex.toLowerCase().replace("#", "").includes(hexQ)
            )

          return matchesText && matchesHex
        })
        .slice(0, capped)

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                results: results.map((brand) => ({
                  slug: brand.slug,
                  name: brand.name,
                  industry: brand.industry,
                  colorCount: brand.colors.length,
                  primaryColors: brand.colors.slice(0, 3).map((c) => c.hex),
                })),
                count: results.length,
                query: query || undefined,
                hex,
              },
              null,
              2
            ),
          },
        ],
      }
    }
  )

  return server
}
