# ── Build stage ───────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy root config files needed by the mcp-server tsconfig and tsup
COPY tsconfig.json ./
COPY package.json ./

# Copy mcp-server manifest first (layer cache)
COPY mcp-server/package.json ./mcp-server/

# Install mcp-server dependencies
WORKDIR /app/mcp-server
RUN pnpm install --frozen-lockfile

# Copy source files required for bundling
WORKDIR /app
COPY data/ ./data/
COPY lib/ ./lib/
COPY mcp-server/src/ ./mcp-server/src/
COPY mcp-server/tsup.config.ts ./mcp-server/
COPY mcp-server/tsconfig.json ./mcp-server/

# Build — tsup bundles everything into dist/index.js
WORKDIR /app/mcp-server
RUN pnpm run build

# ── Production stage ───────────────────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy built artefacts and manifest
COPY --from=builder /app/mcp-server/dist ./dist
COPY mcp-server/package.json ./

# Install only production dependencies
RUN pnpm install --prod --ignore-scripts

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "dist/index.js"]
