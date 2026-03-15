const ABSOLUTE_URL_RE = /^https?:\/\//i
const DEFAULT_ASSET_BASE_URL = "https://pub-079f39a5918e4dde95387cd357e855f3.r2.dev"

const assetBaseUrl =
  process.env.NEXT_PUBLIC_ASSET_BASE_URL?.trim() ?? DEFAULT_ASSET_BASE_URL

function normalizeAssetBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, "")
}

export function assetUrl(path: string): string {
  if (!path || ABSOLUTE_URL_RE.test(path) || !assetBaseUrl) {
    return path
  }

  return `${normalizeAssetBaseUrl(assetBaseUrl)}${path}`
}
