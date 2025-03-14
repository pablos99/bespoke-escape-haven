
import React from 'react';

interface PropertyHeaderProps {
  name: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  t: (key: string) => string;
}

export function PropertyHeader({
  name,
  location,
  price,
  rating,
  reviewCount,
  t
}: PropertyHeaderProps) {
  return (
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
  );
}
