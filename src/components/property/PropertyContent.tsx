
import React from 'react';
import { PropertyHeader } from './PropertyHeader';
import { PropertyHighlights } from './PropertyHighlights';
import { PropertyAmenities } from './PropertyAmenities';
import { PropertyHost } from './PropertyHost';
import { PropertyBookingSidebar } from './PropertyBookingSidebar';

interface Highlight {
  title: string;
  description: string;
}

interface HostInfo {
  name: string;
  description: string;
  image: string;
}

interface PropertyContentProps {
  propertyId: string;
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

export function PropertyContent({
  propertyId,
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
}: PropertyContentProps) {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <PropertyHeader 
            name={name}
            location={location}
            price={price}
            rating={rating}
            reviewCount={reviewCount}
            t={t}
          />
          
          <PropertyHighlights highlights={highlights} />
          
          <div className="prose prose-lg max-w-none my-8">
            <p>{longDescription}</p>
          </div>
          
          <PropertyAmenities amenities={amenities} />
          
          <PropertyHost host={host} />
        </div>
        
        {/* Sidebar */}
        <PropertyBookingSidebar
          price={price}
          propertyId={propertyId}
        />
      </div>
    </section>
  );
}
