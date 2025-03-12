
import React from 'react';
import { cn } from '@/lib/utils';
import { AnimatedImage } from './AnimatedImage';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: 'products' | 'activities' | 'guides';
  className?: string;
}

export function ServiceCard({
  id,
  title,
  description,
  image,
  price,
  category,
  className
}: ServiceCardProps) {
  const categoryLabels = {
    products: 'Artisan Product',
    activities: 'Bespoke Activity',
    guides: 'Local Guide'
  };

  return (
    <div 
      className={cn(
        'group magic-card flex flex-col bg-background border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg',
        className
      )}
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
        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-xs font-medium">{categoryLabels[category]}</span>
        </div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="text-lg font-medium">${price}</p>
        </div>
        
        <p className="text-muted-foreground flex-1 line-clamp-3 mb-4">{description}</p>
        
        <div className="mt-auto">
          <Button asChild className="w-full">
            <Link to={`/services/${category}/${id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
