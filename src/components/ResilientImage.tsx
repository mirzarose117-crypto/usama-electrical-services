import React, { useState } from 'react';
import { Zap } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'Usama Electrical Services',
  fallbackSubtitle = 'Professional Residential & Commercial Electrical Work',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200 p-8 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center mb-3 text-amber-400">
          <Zap className="w-6 h-6" />
        </div>
        <p className="font-display text-base font-semibold text-white">{fallbackTitle}</p>
        <p className="text-xs text-slate-400 mt-1">{fallbackSubtitle}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
