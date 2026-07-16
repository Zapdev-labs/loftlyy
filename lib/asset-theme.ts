export const LIGHT_ASSET_RE = /ivory|white|light/i
export const DARK_ASSET_RE = /black|dark|slate|navy/i

export function needsDarkBg(label: string): boolean {
  return LIGHT_ASSET_RE.test(label)
}

export function needsLightBg(label: string): boolean {
  return DARK_ASSET_RE.test(label)
}
