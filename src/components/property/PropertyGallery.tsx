
import React from 'react';
import { AnimatedImage } from '@/components/ui/AnimatedImage';

interface PropertyGalleryProps {
  images: string[];
  propertyName: string;
}

export function PropertyGallery({ images, propertyName }: PropertyGalleryProps) {
  // Ensure we always have at least 5 images, filling with placeholders if needed
  const normalizedImages = [...images];
  while (normalizedImages.length < 5) {
    normalizedImages.push("/placeholder.svg");
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="aspect-[4/3] rounded-xl overflow-hidden">
          <AnimatedImage
            src={normalizedImages[0]}
            alt={propertyName}
            className="h-full w-full"
            hoverEffect="zoom"
            priority={true} // Load the main image with priority
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {normalizedImages.slice(1, 5).map((image, index) => (
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
