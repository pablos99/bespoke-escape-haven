
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { BookingCTA } from '@/components/ui/BookingCTA';

interface PropertyBookingSidebarProps {
  price: number;
  propertyId: string;
}

export function PropertyBookingSidebar({ price, propertyId }: PropertyBookingSidebarProps) {
  const { t } = useTranslation();
  
  return (
    <div className="lg:col-span-1">
      <div className="bg-background border border-border rounded-xl p-6 sticky top-24">
        <h3 className="text-xl font-medium mb-6">{t('property.bookStay')}</h3>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">{t('property.checkIn')}</label>
          <input type="date" className="w-full border border-border rounded-md p-2" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">{t('property.checkOut')}</label>
          <input type="date" className="w-full border border-border rounded-md p-2" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">{t('property.guests')}</label>
          <select className="w-full border border-border rounded-md p-2">
            <option>1 {t('property.guest')}</option>
            <option>2 {t('property.guests')}</option>
            <option>3 {t('property.guests')}</option>
            <option>4 {t('property.guests')}</option>
            <option>5+ {t('property.guests')}</option>
          </select>
        </div>
        <BookingCTA propertyId={propertyId} className="w-full mb-4" />
        <p className="text-center text-sm text-muted-foreground">{t('property.noChargeYet')}</p>
        
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex justify-between mb-2">
            <span>${price} × 5 {t('property.nights')}</span>
            <span>${price * 5}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>{t('property.cleaningFee')}</span>
            <span>$75</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>{t('property.serviceFee')}</span>
            <span>$120</span>
          </div>
          <div className="flex justify-between font-semibold pt-4 border-t border-border mt-4">
            <span>{t('property.total')}</span>
            <span>${price * 5 + 75 + 120}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
