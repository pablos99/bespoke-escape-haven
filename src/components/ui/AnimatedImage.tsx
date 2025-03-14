
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  hoverEffect?: 'zoom' | 'glow' | 'none';
}

export function AnimatedImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  hoverEffect = 'zoom'
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const fallbackSrc = "/placeholder.svg"; // Using placeholder from public directory

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setHasError(true);
    setIsLoaded(true); // Consider the image "loaded" even though it's the fallback
  };

  const getHoverClass = () => {
    switch (hoverEffect) {
      case 'zoom':
        return 'group-hover:scale-105';
      case 'glow':
        return 'group-hover:animate-image-glow';
      default:
        return '';
    }
  };

  return (
    <div className={cn('overflow-hidden group', className)}>
      <div
        className={cn(
          'relative w-full h-full bg-sand-light/50',
          isLoaded ? '' : 'animate-pulse'
        )}
      >
        <img
          ref={imgRef}
          src={hasError ? fallbackSrc : src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          className={cn(
            'w-full h-full object-cover transition-all duration-700 ease-in-out',
            getHoverClass(),
            isLoaded ? 'opacity-100' : 'opacity-0',
            isInView && !isLoaded ? 'blur-sm' : 'blur-0'
          )}
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    </div>
  );
}
