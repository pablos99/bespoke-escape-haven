
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { useTranslation } from '@/contexts/TranslationContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { usePropertyTranslationManagement } from '@/hooks/usePropertyTranslationManagement';

// Define the property status enum type
type PropertyStatus = 'pending' | 'active' | 'sold_out' | 'closed';

interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  country: string;
  price_per_share: number;
  total_shares: number;
  available_shares: number;
  status: PropertyStatus;
  created_at: string;
  description: string;
  zip_code: string;
  minimum_investment: number;
  total_price: number;
}

export default function AdminProperties() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<Property | null>(null);
  const [isPending, setIsPending] = useState(false);
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
    status: 'pending' as PropertyStatus,
  });

  // Fetch properties
  const { data: properties, isLoading, refetch } = useQuery({
    queryKey: ['admin-properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching properties:', error);
        toast({
          title: 'Error fetching properties',
          description: error.message,
          variant: 'destructive'
        });
        throw error;
      }
      
      console.log('Fetched properties:', data);
      return data as Property[];
    }
  });

  // Create and update property mutation
  const upsertProperty = useMutation({
    mutationFn: async (property: Partial<Property> & { id?: string }) => {
      setIsPending(true);
      console.log('Upserting property with data:', property);
      
      try {
        if (property.id) {
          // Update existing property
          const { data, error } = await supabase
            .from('properties')
            .update(property)
            .eq('id', property.id)
            .select()
            .single();
            
          if (error) {
            console.error('Error updating property:', error);
            throw error;
          }
          
          console.log('Property updated successfully:', data);
          return data;
        } else {
          // Create new property
          const { data, error } = await supabase
            .from('properties')
            .insert([property])
            .select()
            .single();
            
          if (error) {
            console.error('Error creating property:', error);
            throw error;
          }
          
          console.log('Property created successfully:', data);
          return data;
        }
      } finally {
        setIsPending(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      toast({ title: currentProperty ? 'Property updated' : 'Property created' });
      setDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  });

  // Delete property mutation
  const deleteProperty = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting property with ID:', id);
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error('Error deleting property:', error);
        throw error;
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      toast({ title: 'Property deleted' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  });

  const filteredProperties = properties?.filter(property => 
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    setFormData(prev => ({ ...prev, status: value as PropertyStatus }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        status: formData.status as PropertyStatus,
        minimum_investment: parseFloat(formData.price_per_share), // Simplified, might need adjustment
        total_price: parseFloat(formData.price_per_share) * parseInt(formData.total_shares), // Calculated
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
      
    } catch (error: any) {
      toast({ 
        title: 'Error', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(t('admin.confirm_delete'))) {
      deleteProperty.mutate(id);
    }
  };

  const statusOptions: PropertyStatus[] = ['pending', 'active', 'sold_out', 'closed'];

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
                        onClick={() => openDialog(property)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(property.id)}
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
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {currentProperty ? t('admin.edit_property') : t('admin.add_property')}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{t('admin.property_title')}</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">{t('admin.status')}</Label>
                  <Select value={formData.status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('admin.select_status')} />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">{t('admin.description')}</Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">{t('admin.address')}</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">{t('admin.city')}</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">{t('admin.state')}</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">{t('admin.country')}</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip_code">{t('admin.zip_code')}</Label>
                  <Input
                    id="zip_code"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price_per_share">{t('admin.price_per_share')}</Label>
                  <Input
                    id="price_per_share"
                    name="price_per_share"
                    type="number"
                    value={formData.price_per_share}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total_shares">{t('admin.total_shares')}</Label>
                  <Input
                    id="total_shares"
                    name="total_shares"
                    type="number"
                    value={formData.total_shares}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="available_shares">{t('admin.available_shares')}</Label>
                  <Input
                    id="available_shares"
                    name="available_shares"
                    type="number"
                    value={formData.available_shares}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} disabled={isPending}>
                {t('admin.cancel')}
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Processing...' : currentProperty ? t('admin.update') : t('admin.create')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
