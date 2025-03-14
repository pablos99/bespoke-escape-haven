
import React from 'react';
import { Property } from '@/hooks/usePropertyManagement';
import { useTranslation } from '@/contexts/TranslationContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface PropertyListProps {
  properties: Property[] | null;
  searchQuery: string;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

export const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  searchQuery,
  onEdit,
  onDelete
}) => {
  const { t } = useTranslation();

  const filteredProperties = properties?.filter(property => 
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('admin.property_title')}</TableHead>
            <TableHead>{t('admin.location')}</TableHead>
            <TableHead>{t('admin.price_per_share')}</TableHead>
            <TableHead>{t('admin.available_shares')}</TableHead>
            <TableHead>{t('admin.status')}</TableHead>
            <TableHead className="text-right">{t('admin.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProperties?.length ? (
            filteredProperties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.title}</TableCell>
                <TableCell>{`${property.city}, ${property.country}`}</TableCell>
                <TableCell>${property.price_per_share.toLocaleString()}</TableCell>
                <TableCell>
                  {property.available_shares} / {property.total_shares}
                </TableCell>
                <TableCell>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs ${
                      property.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : property.status === 'sold_out' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {property.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEdit(property)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDelete(property.id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                {searchQuery 
                  ? t('admin.no_properties_found') 
                  : t('admin.no_properties')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
