import { defineConfig } from "tsup"

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
})
