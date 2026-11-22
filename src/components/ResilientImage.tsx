import { useState, useEffect } from 'react';
import { mediaAssets } from '../config/media';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  loading = 'lazy',
}: ResilientImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || mediaAssets.heroCopperCables);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    setCurrentSrc(src || mediaAssets.heroCopperCables);
    setUsedFallback(false);
  }, [src]);

  const handleError = () => {
    if (!usedFallback && currentSrc !== mediaAssets.heroCopperCables) {
      setUsedFallback(true);
      setCurrentSrc(mediaAssets.heroCopperCables);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={handleError}
      className={className}
    />
  );
}
