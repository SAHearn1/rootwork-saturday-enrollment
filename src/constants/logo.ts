// RootWork Framework Logo - Base64 Data URL
// This file contains the logo embedded as a base64 data URL for instant loading

import { getLogoDataUri, LOGO_FALLBACK_EMOJI } from '@/config/logo'

// Base64-encoded RootWork Framework logo
export const ROOTWORK_LOGO_BASE64: string | null = getLogoDataUri()

// Alt text for accessibility
export const ROOTWORK_LOGO_ALT = 'RootWork Framework Logo'

// Construct the data URI at runtime so it always mirrors the active logo config
export const ROOTWORK_LOGO_SRC = ROOTWORK_LOGO_BASE64
export const ROOTWORK_LOGO_FALLBACK = LOGO_FALLBACK_EMOJI
