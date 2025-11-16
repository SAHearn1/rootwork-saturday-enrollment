import { LOGO_FALLBACK_EMOJI, getLogoDataUri } from '@/config/logo'

export const ROOTWORK_LOGO_ALT = 'RootWork Framework Logo'

// Construct the data URI at runtime so it always mirrors the active logo config
export const ROOTWORK_LOGO_SRC = getLogoDataUri()
export const ROOTWORK_LOGO_FALLBACK = LOGO_FALLBACK_EMOJI
