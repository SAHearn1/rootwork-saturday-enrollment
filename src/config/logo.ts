/**
 * Logo configuration for the RootWork Framework
 * 
 * This file contains the base64-encoded logo image to ensure it persists
 * across deployments without requiring external file references.
 * 
 * INSTRUCTIONS:
 * 1. In your GitHub repo (FG2GLandingpage), view the raw HTML
 * 2. Find the line: src="data:image/webp;base64,UklGRqysAQBXRUJQVlA4...
 * 3. Copy from UklGRqysAQBXRUJQVlA4... to the closing quote "
 * 4. Paste it below where it says PASTE_BASE64_HERE
 */

// ═══════════════════════════════════════════════════════════════════════
// PASTE YOUR BASE64 STRING HERE
// ═══════════════════════════════════════════════════════════════════════
// 
// Your string should START with: UklGRqysAQBXRUJQVlA4WAoAAAAgAAAA...
// 
// DO NOT include: data:image/webp;base64,
// ONLY paste the base64 data that comes AFTER the comma
//
export const LOGO_BASE64_DATA: string =
  'UklGRqysAQBXRUJQVlA4WAoAAAAgAAAA/wMA/wMASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AAB'

// MIME type for the logo image (WEBP encoded as base64)
export const LOGO_MIME_TYPE = 'image/webp'

/**
 * Returns the complete data URI for the logo
 * If no logo data is configured, returns null
 */
export function getLogoDataUri(): string | null {
  if (
    !LOGO_BASE64_DATA ||
    LOGO_BASE64_DATA.trim() === '' ||
    LOGO_BASE64_DATA === 'PASTE_BASE64_HERE'
  ) {
    return null
  }
  return `data:${LOGO_MIME_TYPE};base64,${LOGO_BASE64_DATA}`
}

/**
 * Fallback emoji to use when logo is not configured
 */
export const LOGO_FALLBACK_EMOJI = '🌱'
