/**
 * Combined HTTP server — serves both the Next.js app and the MCP server
 * on a single port.  MCP routes live under /mcp/*, everything else is
 * handled by Next.js.
 *
 * Build:  pnpm run mcp:build && pnpm exec next build
 * Start:  NODE_ENV=production node server.mjs
 */
import { createServer } from "node:http"
import next from "next"

// Import the MCP handler from the pre-built bundle
const { handleMcpRequest, isMcpRoute } = await import(
  "./mcp-server/dist/index.js"
)

const dev = process.env.NODE_ENV !== "production"
const port = parseInt(process.env.PORT || "3000", 10)

const app = next({ dev })
const handle = app.getRequestHandler()

await app.prepare()

const server = createServer(async (req, res) => {
  const url = req.url ?? "/"
  const qIndex = url.indexOf("?")
  const pathname = qIndex === -1 ? url : url.slice(0, qIndex)

  // Route /mcp/* requests to the MCP server
  if (isMcpRoute(pathname)) {
    await handleMcpRequest(req, res)
    return
  }

  // Everything else → Next.js
  const parsedUrl = new URL(url, `http://${req.headers.host || "localhost"}`)
  await handle(req, res, {
    pathname: parsedUrl.pathname,
    query: Object.fromEntries(parsedUrl.searchParams),
  })
})

server.listen(port, () => {
  const mode = dev ? "development" : "production"
  console.log(`[server] ${mode} server listening on http://localhost:${port}`)
  console.log(`[server] Next.js app → http://localhost:${port}`)
  console.log(`[server] MCP API    → http://localhost:${port}/mcp/brands`)
  console.log(`[server] MCP SSE    → http://localhost:${port}/mcp/sse`)
  console.log(`[server] MCP Health → http://localhost:${port}/mcp/health`)
})
