import { LOGO_FALLBACK_EMOJI, getLogoDataUri } from '@/config/logo'

export const ROOTWORK_LOGO_ALT = 'RootWork Framework Logo'
export const ROOTWORK_LOGO_SRC = getLogoDataUri()
export const ROOTWORK_LOGO_FALLBACK = LOGO_FALLBACK_EMOJI

// Centralized logo constants to keep component imports stable
export const ROOTWORK_LOGO = {
  alt: ROOTWORK_LOGO_ALT,
  src: ROOTWORK_LOGO_SRC,
  fallback: ROOTWORK_LOGO_FALLBACK,
} as const
