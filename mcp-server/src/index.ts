// Re-export the handler for use in the combined server (server.mjs)
export { handleMcpRequest, isMcpRoute } from "./http/server.js"

// Standalone mode — only starts when run directly (not imported)
import { createHttpServer } from "./http/server.js"

const isDirectRun =
  typeof process !== "undefined" &&
  process.argv[1] &&
  (process.argv[1].endsWith("index.js") ||
    process.argv[1].endsWith("index.ts"))

if (isDirectRun) {
  const PORT = parseInt(process.env.PORT ?? "3001", 10)
  createHttpServer(PORT)
}
