import { LOGO_FALLBACK_EMOJI, getLogoDataUri } from '@/config/logo'

const ROOTWORK_LOGO_ALT_TEXT = 'RootWork Framework Logo'

// Centralized logo constants to keep component imports stable
export const ROOTWORK_LOGO = {
  alt: ROOTWORK_LOGO_ALT_TEXT,
  src: getLogoDataUri(),
  fallback: LOGO_FALLBACK_EMOJI,
} as const

export const ROOTWORK_LOGO_ALT = ROOTWORK_LOGO.alt
export const ROOTWORK_LOGO_SRC = ROOTWORK_LOGO.src
export const ROOTWORK_LOGO_FALLBACK = ROOTWORK_LOGO.fallback
