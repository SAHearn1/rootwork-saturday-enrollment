import React from 'react';
import { ROOTWORK_LOGO_BASE64, ROOTWORK_LOGO_ALT } from '@/constants/logo';

interface RootWorkLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const RootWorkLogo: React.FC<RootWorkLogoProps> = ({ 
  width = 80, 
  height = 80, 
  className = "" 
}) => {
  return (
    <img 
      src={ROOTWORK_LOGO_BASE64}
      alt={ROOTWORK_LOGO_ALT}
      width={width}
      height={height}
      className={className}
    />
  );
};
