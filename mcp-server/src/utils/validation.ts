const SLUG_RE = /^[a-z0-9-]+$/

export function isValidSlug(slug: string): boolean {
  return SLUG_RE.test(slug) && slug.length > 0 && slug.length <= 64
}

export function parseLimit(
  value: string | null,
  defaultVal = 20,
  max = 100
): number {
  if (!value) return defaultVal
  const n = parseInt(value, 10)
  if (Number.isNaN(n) || n < 1) return defaultVal
  return Math.min(n, max)
}

export function parseOffset(value: string | null): number {
  if (!value) return 0
  const n = parseInt(value, 10)
  if (Number.isNaN(n) || n < 0) return 0
  return n
}

export function parseSearchParams(url: string): URLSearchParams {
  const qIndex = url.indexOf("?")
  return new URLSearchParams(qIndex === -1 ? "" : url.slice(qIndex + 1))
}

export function getPathname(url: string): string {
  const qIndex = url.indexOf("?")
  return qIndex === -1 ? url : url.slice(0, qIndex)
}
