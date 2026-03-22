# @loftlyy/mcp-server

Standalone Node.js server that exposes Loftlyy brand color palettes via:

- **HTTP REST API** — consumable by any HTTP client
- **MCP protocol** (HTTP + SSE) — consumable by Claude agents and other MCP clients

No API keys required. Brand data is bundled at build time from `/data/brands/`.

---

## Endpoints

### REST

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/brands` | List all brands (`?industry=&limit=&offset=`) |
| `GET` | `/api/brand/:slug/palette` | Full color palette for a brand |
| `GET` | `/api/search` | Search brands (`?q=&hex=&limit=`) |

### MCP (SSE)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/sse` | Open MCP SSE connection |
| `POST` | `/messages?sessionId=` | Send MCP messages |

---

## MCP Tools

### `get_brand_palette`

Retrieve the full color palette for a brand.

```json
{
  "brand_slug": "apple",
  "include_usage": true
}
```

### `list_brands`

List all brands with optional industry filter.

```json
{
  "industry": "technology",
  "limit": 20
}
```

### `search_brands`

Search brands by text or hex color.

```json
{
  "query": "social media",
  "hex": "#1DA1F2"
}
```

---

## Development

```bash
# From repo root
pnpm mcp:dev        # Run with tsx (hot reload via tsx watch)
pnpm mcp:typecheck  # TypeScript type checking
pnpm mcp:build      # Production build
```

Or from this directory:

```bash
pnpm dev            # tsx src/index.ts
pnpm build          # tsup bundle → dist/
pnpm start          # node dist/index.js
```

---

## Docker

```bash
# Build (run from repo root — Docker context must include /data and /lib)
docker build -f mcp-server/Dockerfile -t loftlyy-mcp:latest .

# Run
docker run -p 3001:3001 loftlyy-mcp:latest
```

---

## Railway Deployment

1. Create a new Railway service and connect to this GitHub repo
2. Set **Root Directory** to `/` (the repo root — needed for `/data` and `/lib`)
3. Set **Build Command**: `cd mcp-server && pnpm install && pnpm run build`
4. Set **Start Command**: `node mcp-server/dist/index.js`
5. Set **Port**: `3001`

Environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | HTTP listen port |
| `NODE_ENV` | `development` | Set to `production` in Railway |

---

## Quick test

```bash
# Health
curl http://localhost:3001/health

# Brand palette
curl http://localhost:3001/api/brand/apple/palette

# List brands (technology)
curl 'http://localhost:3001/api/brands?industry=technology&limit=10'

# Search
curl 'http://localhost:3001/api/search?q=social'
curl 'http://localhost:3001/api/search?hex=%23FF0000'
```
