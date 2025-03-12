
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { AnimatedImage } from './AnimatedImage';
import { MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  style
}: PropertyCardProps) {
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
        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <Star size={16} className="text-yellow-500" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="text-lg font-medium">${price}<span className="text-sm text-muted-foreground">/night</span></p>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        <p className="text-muted-foreground flex-1 line-clamp-3 mb-4">{description}</p>
        
        <div className="mt-auto flex justify-between items-center">
          <Link to={`/property/${id}`} className="text-sm font-medium text-primary hover:text-accent-foreground transition-colors">
            View Details
          </Link>
          <Button asChild>
            <Link to={`/booking?property=${id}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
