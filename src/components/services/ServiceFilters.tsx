
import React from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ServiceFiltersProps {
  activeTab: string;
  location: string;
  onTabChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}

export const ServiceFilters: React.FC<ServiceFiltersProps> = ({
  activeTab,
  location,
  onTabChange,
  onLocationChange
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full max-w-xl">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="all">All Services</TabsTrigger>
          <TabsTrigger value="products">Artisan Products</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="guides">Local Guides</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <Select value={location} onValueChange={onLocationChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          <SelectItem value="bali">Bali</SelectItem>
          <SelectItem value="tulum">Tulum</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
