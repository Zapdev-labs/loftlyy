import { createServer } from "node:http"
import type { IncomingMessage, ServerResponse } from "node:http"
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js"
import {
  handleGetBrandPalette,
  handleHealth,
  handleListBrands,
  handleNotFound,
  handleSearch,
} from "./routes.js"
import { createMcpServer } from "../mcp/server.js"
import { getPathname, parseSearchParams } from "../utils/validation.js"

// Active MCP SSE sessions keyed by sessionId
const sessions = new Map<string, SSEServerTransport>()

function log(level: "info" | "warn" | "error", message: string): void {
  process.stdout.write(
    `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}\n`
  )
}

async function handleSseConnection(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  const transport = new SSEServerTransport("/mcp/messages", res)
  sessions.set(transport.sessionId, transport)

  req.on("close", () => {
    sessions.delete(transport.sessionId)
    log("info", `MCP session closed: ${transport.sessionId}`)
  })

  const mcpServer = createMcpServer()
  await mcpServer.connect(transport)

  log("info", `MCP session opened: ${transport.sessionId}`)
}

async function handleMcpMessage(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  const params = parseSearchParams(req.url ?? "")
  const sessionId = params.get("sessionId")

  if (!sessionId) {
    res.writeHead(400, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "Missing sessionId query parameter" }))
    return
  }

  const transport = sessions.get(sessionId)
  if (!transport) {
    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "Session not found or expired" }))
    return
  }

  await transport.handlePostMessage(req, res)
}

/**
 * MCP route prefixes used when the MCP server is mounted inside another
 * HTTP server (e.g. Next.js custom server).  All MCP-specific paths live
 * under /mcp/* so they don't collide with Next.js routes.
 */
const MCP_PATHS = {
  health: "/mcp/health",
  brands: "/mcp/brands",
  search: "/mcp/search",
  paletteRe: /^\/mcp\/brand\/([^/]+)\/palette$/,
  sse: "/mcp/sse",
  messages: "/mcp/messages",
} as const

/**
 * Returns true if this request should be handled by the MCP server.
 */
export function isMcpRoute(pathname: string): boolean {
  return pathname.startsWith("/mcp/") || pathname === "/mcp"
}

/**
 * Handle an MCP-related request.  The caller is responsible for routing
 * only requests whose pathname starts with `/mcp/` to this function.
 */
export async function handleMcpRequest(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  const method = req.method ?? "GET"
  const url = req.url ?? "/"
  const pathname = getPathname(url)

  // CORS — allow all origins (brand data is public)
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept")

  if (method === "OPTIONS") {
    res.writeHead(204)
    res.end()
    return
  }

  try {
    // ── REST endpoints ──────────────────────────────────────────────────

    if (method === "GET" && pathname === MCP_PATHS.health) {
      await handleHealth(req, res)
      return
    }

    if (method === "GET" && pathname === MCP_PATHS.brands) {
      await handleListBrands(req, res)
      return
    }

    if (method === "GET" && pathname === MCP_PATHS.search) {
      await handleSearch(req, res)
      return
    }

    const paletteMatch = MCP_PATHS.paletteRe.exec(pathname)
    if (method === "GET" && paletteMatch) {
      await handleGetBrandPalette(req, res, { slug: paletteMatch[1] })
      return
    }

    // ── MCP protocol endpoints ──────────────────────────────────────────

    if (method === "GET" && pathname === MCP_PATHS.sse) {
      await handleSseConnection(req, res)
      return
    }

    if (method === "POST" && pathname === MCP_PATHS.messages) {
      await handleMcpMessage(req, res)
      return
    }

    // ── 404 ─────────────────────────────────────────────────────────────

    await handleNotFound(req, res)
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error"
    log("error", `Unhandled error on ${method} ${pathname}: ${message}`)
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ error: "INTERNAL_ERROR", message }))
    }
  }
}

/**
 * Standalone mode — creates & listens on its own HTTP server.
 */
export function createHttpServer(port: number): void {
  const server = createServer(
    async (req: IncomingMessage, res: ServerResponse) => {
      await handleMcpRequest(req, res)
    }
  )

  server.listen(port, () => {
    log("info", `HTTP server listening on port ${port}`)
    log("info", `REST API:  http://localhost:${port}/mcp/brands`)
    log("info", `MCP SSE:   http://localhost:${port}/mcp/sse`)
    log("info", `Health:    http://localhost:${port}/mcp/health`)
  })
}
