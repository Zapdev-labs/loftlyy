import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  dts: false,
  entry: ["src/index.ts"],
  format: ["esm"],
  outDir: "dist",
  platform: "node",
  shims: true,
  sourcemap: false,
  splitting: false,
  target: "node20",
  tsconfig: "./tsconfig.json",
  // Bundle runtime deps so dist/index.js is fully self-contained — no
  // node_modules needed at runtime, which simplifies Railway deployment.
  noExternal: ["@modelcontextprotocol/sdk", "zod"],
  // Some bundled CJS deps (depd, raw-body, http-errors) call require("path")
  // etc.  The default __require shim can't resolve Node built-ins in ESM, so
  // we create a real require() via createRequire.
  banner: {
    js: 'import { createRequire as __cr } from "module"; const require = __cr(import.meta.url);',
  },
})
