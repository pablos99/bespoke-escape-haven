
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonProps } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';

interface BookingCTAProps extends Omit<ButtonProps, 'asChild'> {
  propertyId: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function BookingCTA({ 
  propertyId, 
  variant = 'default', 
  size = 'default',
  className,
  ...props 
}: BookingCTAProps) {
  const { t } = useTranslation();
  
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      <Link to={`/booking/property/${propertyId}`}>
        {t('buttons.bookNow')}
      </Link>
    </Button>
  );
}
