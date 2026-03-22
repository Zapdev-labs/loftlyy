import { defineConfig } from "tsup"
import path from "node:path"

export default defineConfig({
  clean: true,
  dts: false,
  entry: ["src/index.ts"],
  format: ["esm"],
  outDir: "dist",
  platform: "node",
  sourcemap: false,
  splitting: false,
  target: "node20",
  tsconfig: "./tsconfig.json",
  // Bundle runtime deps so dist/index.js is fully self-contained — no
  // node_modules needed at runtime, which simplifies Railway deployment.
  noExternal: ["@modelcontextprotocol/sdk", "zod"],
  // Resolve TypeScript path aliases (@/*) to the parent directory (repo root)
  esbuildOptions(options) {
    options.alias = {
      "@/*": path.resolve("../*"),
    }
  },
})
