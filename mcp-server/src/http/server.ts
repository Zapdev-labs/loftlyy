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
  const transport = new SSEServerTransport("/messages", res)
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

export function createHttpServer(port: number): void {
  const server = createServer(
    async (req: IncomingMessage, res: ServerResponse) => {
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

        if (method === "GET" && pathname === "/health") {
          await handleHealth(req, res)
          return
        }

        if (method === "GET" && pathname === "/api/brands") {
          await handleListBrands(req, res)
          return
        }

        if (method === "GET" && pathname === "/api/search") {
          await handleSearch(req, res)
          return
        }

        const paletteMatch = /^\/api\/brand\/([^/]+)\/palette$/.exec(pathname)
        if (method === "GET" && paletteMatch) {
          await handleGetBrandPalette(req, res, { slug: paletteMatch[1] })
          return
        }

        // ── MCP endpoints ───────────────────────────────────────────────────

        if (method === "GET" && pathname === "/sse") {
          await handleSseConnection(req, res)
          return
        }

        if (method === "POST" && pathname === "/messages") {
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
  )

  server.listen(port, () => {
    log("info", `HTTP server listening on port ${port}`)
    log("info", `REST API:  http://localhost:${port}/api/brands`)
    log("info", `MCP SSE:   http://localhost:${port}/sse`)
    log("info", `Health:    http://localhost:${port}/health`)
  })
}
