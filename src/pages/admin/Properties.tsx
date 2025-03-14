
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { PropertyList } from '@/components/admin/properties/PropertyList';
import { PropertyDialog } from '@/components/admin/properties/PropertyDialog';
import { usePropertyManagement, Property } from '@/hooks/usePropertyManagement';

export default function AdminProperties() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<Property | null>(null);
  const { properties, isLoading, isPending, upsertProperty, deleteProperty } = usePropertyManagement();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    price_per_share: '',
    total_shares: '',
    available_shares: '',
    status: 'pending' as Property['status'],
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zip_code: '',
      price_per_share: '',
      total_shares: '',
      available_shares: '',
      status: 'pending',
    });
    setCurrentProperty(null);
  };

  const openDialog = (property?: Property) => {
    if (property) {
      setCurrentProperty(property);
      setFormData({
        title: property.title,
        description: property.description,
        address: property.address,
        city: property.city,
        state: property.state,
        country: property.country,
        zip_code: property.zip_code || '',
        price_per_share: property.price_per_share.toString(),
        total_shares: property.total_shares.toString(),
        available_shares: property.available_shares.toString(),
        status: property.status,
      });
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value as Property['status'] }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const propertyData = {
        title: formData.title,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zip_code: formData.zip_code,
        price_per_share: parseFloat(formData.price_per_share),
        total_shares: parseInt(formData.total_shares),
        available_shares: parseInt(formData.available_shares),
        status: formData.status,
      };
      
      if (currentProperty) {
        // Update existing property
        upsertProperty.mutate({ 
          id: currentProperty.id,
          ...propertyData
        });
      } else {
        // Create new property
        upsertProperty.mutate(propertyData);
      }
      
      setDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error("Submit error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(t('admin.confirm_delete'))) {
      deleteProperty.mutate(id);
    }
  };

  return (
    <AdminLayout title={t('admin.properties')}>
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('admin.search_properties')}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => openDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          {t('admin.add_property')}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <PropertyList
          properties={properties}
          searchQuery={searchQuery}
          onEdit={openDialog}
          onDelete={handleDelete}
        />
      )}

      <PropertyDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        formData={formData}
        onInputChange={handleInputChange}
        onStatusChange={handleStatusChange}
        onSubmit={handleSubmit}
        isPending={isPending}
        currentProperty={currentProperty}
      />
    </AdminLayout>
  );
}
