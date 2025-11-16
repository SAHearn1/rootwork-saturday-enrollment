/**
 * Logo configuration for the RootWork Framework
 * 
 * This file contains the base64-encoded logo image to ensure it persists
 * across deployments without requiring external file references.
 * 
 * To update the logo:
 * 1. Convert your logo image to base64:
 *    base64 -w 0 your-logo.png > logo_base64.txt
 * 2. Copy the entire contents of logo_base64.txt
 * 3. Paste it as the value of LOGO_BASE64_DATA below (between the quotes)
 * 4. Update the LOGO_MIME_TYPE if using a different image format
 * 
 * Example of what it should look like when configured:
 * export const LOGO_BASE64_DATA: string = 'iVBORw0KGgoAAAANSUhEUgAA...(thousands more characters)...CYII='
 */

// TODO: Replace this empty string with the complete base64 string from your logo conversion
// The partial string from the conversion was:
// UklGRqysAQBXRUJQVlA4WAoAAAAgAAAA/wMA/wMASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AAB...
// (approximately 146,332 characters total)
export const LOGO_BASE64_DATA: string = ''

// MIME type for the logo image (webp based on the header in the base64)
export const LOGO_MIME_TYPE = 'image/webp'

/**
 * Returns the complete data URI for the logo
 * If no logo data is configured, returns null
 */
export function getLogoDataUri(): string | null {
  if (!LOGO_BASE64_DATA || LOGO_BASE64_DATA.trim() === '') {
    return null
  }
  return `data:${LOGO_MIME_TYPE};base64,${LOGO_BASE64_DATA}`
}

/**
 * Fallback emoji to use when logo is not configured
 */
export const LOGO_FALLBACK_EMOJI = '🌱'
