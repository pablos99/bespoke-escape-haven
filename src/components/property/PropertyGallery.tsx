
import React from 'react';
import { AnimatedImage } from '@/components/ui/AnimatedImage';

interface PropertyGalleryProps {
  images: string[];
  propertyName: string;
}

export function PropertyGallery({ images, propertyName }: PropertyGalleryProps) {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="aspect-[4/3] rounded-xl overflow-hidden">
          <AnimatedImage
            src={images[0]}
            alt={propertyName}
            className="h-full w-full"
            hoverEffect="zoom"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {images.slice(1, 5).map((image, index) => (
            <div key={index} className="aspect-[4/3] rounded-xl overflow-hidden">
              <AnimatedImage
                src={image}
                alt={`${propertyName} - View ${index + 2}`}
                className="h-full w-full"
                hoverEffect="zoom"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
