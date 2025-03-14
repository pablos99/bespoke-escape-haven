
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PropertyFiltersProps = {
  location: string;
  setLocation: (location: string) => void;
};

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({ 
  location, 
  setLocation 
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const handleLocationChange = (value: string) => {
    setLocation(value);
    if (value === "all") {
      searchParams.delete("location");
    } else {
      searchParams.set("location", value);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex justify-end mb-8">
      <Select value={location} onValueChange={handleLocationChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t('properties.filterByLocation')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('properties.allLocations')}</SelectItem>
          <SelectItem value="bali">Bali</SelectItem>
          <SelectItem value="tulum">Tulum</SelectItem>
          <SelectItem value="costa-rica">Costa Rica</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
