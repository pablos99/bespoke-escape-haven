
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarIcon } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useApp } from '@/contexts/AppContext';

type PropertyBookingCardProps = {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  locationFilter?: string;
};

export function PropertyBookingCard({ 
  id, 
  title, 
  location, 
  description, 
  image, 
  price, 
  rating,
  locationFilter
}: PropertyBookingCardProps) {
  const { t } = useApp();

  // Generate booking link that preserves location filter
  const getBookingLink = () => {
    let link = `/booking/property/${id}`;
    if (locationFilter) {
      link += `?location=${locationFilter}`;
    }
    return link;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <AspectRatio ratio={16/9}>
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 text-sm font-medium rounded">
          ${price}/{t('booking.night')}
        </div>
        {locationFilter && (
          <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground px-2 py-1 text-sm font-medium rounded capitalize">
            {locationFilter}
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
          <div className="flex items-center">
            <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={getBookingLink()}>{t('buttons.bookNow')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
