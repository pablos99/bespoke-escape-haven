
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { AnimatedImage } from './AnimatedImage';
import { MapPin, Star } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/contexts/TranslationContext';
import { BookingCTA } from './BookingCTA';

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  className?: string;
  style?: React.CSSProperties;
  viewDetailsLink?: string;
}

export function PropertyCard({
  id,
  title,
  location,
  description,
  image,
  rating,
  price,
  className,
  style,
  viewDetailsLink
}: PropertyCardProps) {
  const { language } = useApp();
  const { t } = useTranslation();
  
  // Default links if not provided
  const detailsLink = viewDetailsLink || `/property/${id}`;
  
  return (
    <div 
      className={cn(
        'group magic-card flex flex-col bg-background border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg',
        className
      )}
      style={style}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0">
          <AnimatedImage
            src={image}
            alt={title}
            className="h-full w-full"
            hoverEffect="zoom"
          />
        </div>
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <Star size={16} className="text-yellow-500" />
          <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-medium text-foreground">{title}</h3>
          <p className="text-lg font-medium text-foreground">${price}<span className="text-sm text-foreground/70">/{t('booking.night')}</span></p>
        </div>
        
        <div className="flex items-center text-foreground/70 mb-4">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        <p className="text-foreground/80 flex-1 line-clamp-3 mb-4">{description}</p>
        
        <div className="mt-auto flex justify-between items-center">
          <Link 
            to={detailsLink} 
            className="text-sm font-medium text-primary hover:underline transition-colors z-10"
          >
            {t('buttons.viewDetails')}
          </Link>
          <BookingCTA propertyId={id} />
        </div>
      </div>
    </div>
  );
}
