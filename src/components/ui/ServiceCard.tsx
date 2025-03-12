
import React from 'react';
import { cn } from '@/lib/utils';
import { AnimatedImage } from './AnimatedImage';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: 'products' | 'activities' | 'guides';
  location?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ServiceCard({
  id,
  title,
  description,
  image,
  price,
  category,
  location,
  className,
  style
}: ServiceCardProps) {
  const categoryLabels = {
    products: 'Artisan Product',
    activities: 'Bespoke Activity',
    guides: 'Local Guide'
  };

  // Generate the appropriate booking link based on category and include location if available
  const getBookingLink = () => {
    const baseLink = `/booking`;
    const productType = category === 'products' ? 'product' : 
                        category === 'guides' ? 'guide' : 'activity';
    
    let link = `${baseLink}/${productType}/${id}`;
    
    // Add location query parameter if available
    if (location) {
      link += `?location=${location}`;
    }
    
    return link;
  };

  return (
    <div 
      className={cn(
        'group magic-card flex flex-col bg-background border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg',
        className
      )}
      style={style}
    >
      <div className="relative h-56 w-full overflow-hidden">
        <div className="absolute inset-0">
          <AnimatedImage
            src={image}
            alt={title}
            className="h-full w-full"
            hoverEffect="zoom"
          />
        </div>
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-xs font-medium text-foreground">{categoryLabels[category]}</span>
        </div>
        {location && (
          <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground rounded-full px-3 py-1">
            <span className="text-xs font-medium capitalize">{location}</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-medium text-foreground">{title}</h3>
          <p className="text-lg font-medium text-foreground">${price}</p>
        </div>
        
        <p className="text-foreground/80 flex-1 line-clamp-3 mb-4">{description}</p>
        
        <div className="mt-auto">
          <Button asChild className="w-full">
            <Link to={getBookingLink()}>
              {category === 'products' ? 'Purchase Now' : 'Book Now'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
