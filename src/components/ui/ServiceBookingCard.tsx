import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useTranslation } from '@/contexts/TranslationContext';

type ServiceBookingCardProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: 'product' | 'guide' | 'activity';
  location?: string;
};

export function ServiceBookingCard({ 
  id, 
  title, 
  description, 
  image, 
  price, 
  category,
  location
}: ServiceBookingCardProps) {
  const { t } = useTranslation();
  
  const getBookingLink = () => {
    let link = '';
    switch (category) {
      case 'product':
        link = `/booking/product/${id}`;
        break;
      case 'guide':
        link = `/booking/guide/${id}`;
        break;
      case 'activity':
        link = `/booking/activity/${id}`;
        break;
      default:
        link = '/booking';
    }
    
    // Add location as a query parameter if available
    if (location) {
      link += `?location=${location}`;
    }
    
    return link;
  };
  
  const getButtonText = () => {
    switch (category) {
      case 'product':
        return t('buttons.purchase');
      case 'guide':
      case 'activity':
        return t('buttons.book');
      default:
        return t('buttons.bookNow');
    }
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
          ${price}{category !== 'product' ? `/${category === 'guide' ? t('booking.perSession') : t('booking.perActivity')}` : ''}
        </div>
        {location && (
          <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground px-2 py-1 text-sm font-medium rounded capitalize">
            {location}
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <CardFooter className="pt-2">
        <Button asChild className="w-full">
          <Link to={getBookingLink()}>{getButtonText()}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
