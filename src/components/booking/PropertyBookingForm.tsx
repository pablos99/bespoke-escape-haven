
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface PropertyBookingFormProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  selectedProperty: string;
  setSelectedProperty: (property: string) => void;
  properties: {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
  }[];
  propertySelectRef: React.RefObject<HTMLDivElement>;
}

export function PropertyBookingForm({
  date,
  setDate,
  endDate,
  setEndDate,
  selectedProperty,
  setSelectedProperty,
  properties,
  propertySelectRef
}: PropertyBookingFormProps) {
  // Find the property if an ID was provided
  const selectedPropertyDetails = properties.find(p => p.id === selectedProperty);

  return (
    <div className="bg-background border border-border rounded-xl p-8">
      <h2 className="heading-md mb-6">Reservation Details</h2>
      
      <div className="space-y-6">
        <div ref={propertySelectRef}>
          <Label htmlFor="property">Choose Property</Label>
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger id="property" className="w-full">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              {properties.map(property => (
                <SelectItem key={property.id} value={property.id}>
                  {property.title} - ${property.price}/night
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedPropertyDetails && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium">{selectedPropertyDetails.title}</p>
            <p className="text-sm text-muted-foreground">${selectedPropertyDetails.price} per night</p>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label>Check-in Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex-1">
            <Label>Check-out Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="adults">Adults</Label>
            <Select>
              <SelectTrigger id="adults">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Label htmlFor="children">Children</Label>
            <Select>
              <SelectTrigger id="children">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="special-requests">Special Requests</Label>
          <Textarea 
            id="special-requests" 
            placeholder="Let us know if you have any special requirements or requests"
            className="resize-none" 
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}
