
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import { Destination } from '@/types/destination';

interface DestinationCardProps {
  destination: Destination;
  onEdit: (destination: Destination) => void;
  onDelete: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onEdit,
  onDelete
}) => {
  return (
    <Card key={destination.id} className="overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="flex justify-between items-start">
          <span className="text-lg">{destination.name}</span>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(destination)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(destination)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
        <CardDescription>{destination.country}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground mb-2">{destination.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
            {destination.properties_count} Properties
          </span>
          {destination.featured && (
            <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
              Featured
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
