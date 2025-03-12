
import React from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  location: string;
  date: string;
  rating: number;
  content: string;
  avatar?: string;
  className?: string;
}

export function ReviewCard({
  name,
  location,
  date,
  rating,
  content,
  avatar,
  className
}: ReviewCardProps) {
  return (
    <div 
      className={cn(
        'p-6 bg-background border border-border rounded-xl transition-all duration-300 hover:shadow-md',
        className
      )}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted mr-4">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-accent text-accent-foreground font-medium text-lg">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">
          {date}
        </div>
      </div>
      
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < rating ? 'text-yellow-500' : 'text-muted'} 
            fill={i < rating ? 'currentColor' : 'none'} 
          />
        ))}
      </div>
      
      <p className="text-muted-foreground">{content}</p>
    </div>
  );
}
