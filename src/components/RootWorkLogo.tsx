import React from 'react'
import {
  ROOTWORK_LOGO_ALT,
  ROOTWORK_LOGO_FALLBACK,
  ROOTWORK_LOGO_SRC,
} from '@/constants/logo'

interface RootWorkLogoProps {
  width?: number
  height?: number
  className?: string
}

export const RootWorkLogo: React.FC<RootWorkLogoProps> = ({
  width = 80,
  height = 80,
  className = '',
}) => {
  if (!ROOTWORK_LOGO_SRC) {
    return (
      <div
        className={`flex items-center justify-center text-3xl ${className}`}
        style={{ width, height }}
        aria-label={ROOTWORK_LOGO_ALT}
      >
        {ROOTWORK_LOGO_FALLBACK}
      </div>
    )
  }

  return (
    <img
      src={ROOTWORK_LOGO_SRC}
      alt={ROOTWORK_LOGO_ALT}
      width={width}
      height={height}
      className={className}
    />
  )
}
