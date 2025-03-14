
import React from 'react';
import { PropertyHighlights } from './PropertyHighlights';
import { PropertyAmenities } from './PropertyAmenities';
import { PropertyHost } from './PropertyHost';
import { PropertyDescription } from './PropertyDescription';

interface Highlight {
  title: string;
  description: string;
}

interface HostInfo {
  name: string;
  description: string;
  image: string;
}

interface PropertyDetailsProps {
  name: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  longDescription: string;
  highlights: Highlight[];
  amenities: string[];
  host: HostInfo;
  t: (key: string) => string;
}

export function PropertyDetails({
  name,
  location,
  price,
  rating,
  reviewCount,
  longDescription,
  highlights,
  amenities,
  host,
  t
}: PropertyDetailsProps) {
  return (
    <div className="lg:col-span-2">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="heading-lg">{name}</h1>
          <p className="text-muted-foreground">{location}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold">${price}<span className="text-sm text-muted-foreground">/{t('booking.night')}</span></p>
          <div className="flex items-center justify-end mt-1">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{rating}</span>
            <span className="mx-1">·</span>
            <span className="text-muted-foreground">{reviewCount} {t('property.reviews')}</span>
          </div>
        </div>
      </div>
      
      <PropertyHighlights highlights={highlights} />
      
      <PropertyDescription description={longDescription} />
      
      <PropertyAmenities amenities={amenities} />
      
      <PropertyHost host={host} />
    </div>
  );
}
