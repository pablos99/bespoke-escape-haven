
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

interface HostInfo {
  name: string;
  description: string;
  image: string;
}

interface PropertyHostProps {
  host: HostInfo;
}

export function PropertyHost({ host }: PropertyHostProps) {
  const { t } = useTranslation();
  
  return (
    <div className="my-12">
      <h2 className="heading-md mb-6">{t('property.meetHost')}</h2>
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-6">
          <img src={host.image} alt={host.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="text-xl font-medium">{host.name}</h3>
          <p className="text-muted-foreground">{host.description}</p>
        </div>
      </div>
    </div>
  );
}
