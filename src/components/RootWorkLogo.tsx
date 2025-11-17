/** 
 * RootWork Framework Logo Component
 * 
 * Displays the RootWork Framework logo using base64-encoded image data.
 * Falls back to an emoji if no logo data is configured.
 */

import { getLogoDataUri, LOGO_FALLBACK_EMOJI } from '@/config/logo'

interface RootWorkLogoProps {
  width?: number
  height?: number
  className?: string
}

export function RootWorkLogo({ 
  width = 80, 
  height = 80,
  className = ''
}: RootWorkLogoProps) {
  const logoDataUri = getLogoDataUri()

  // If no logo is configured, show fallback emoji
  if (!logoDataUri) {
    return (
      <div 
        className={`flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span style={{ fontSize: width * 0.5 }}>
          {LOGO_FALLBACK_EMOJI}
        </span>
      </div>
    )
  }

  // Render the logo image
  return (
    <img
      src={logoDataUri}
      alt="RootWork Framework - Emblem of Knowledge and Balance"
      width={width}
      height={height}
      className={className}
    />
  )
}
