
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  description: string;
  country: string;
  image_url?: string;
  featured: boolean;
  properties_count: number;
  created_at: string;
}

const AdminDestinations = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    country: '',
    image_url: '',
    featured: false,
    properties_count: 0
  });

  // Fetch destinations
  const { data: destinations, isLoading } = useQuery({
    queryKey: ['admin-destinations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data as Destination[];
    }
  });

  const addDestinationMutation = useMutation({
    mutationFn: async (newDestination: any) => {
      const { data, error } = await supabase.from('destinations').insert(newDestination);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-destinations'] });
      toast({
        title: "Success",
        description: "Destination added successfully",
      });
      resetForm();
      setIsOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add destination: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateDestinationMutation = useMutation({
    mutationFn: async ({ id, destination }: { id: string; destination: any }) => {
      const { data, error } = await supabase
        .from('destinations')
        .update(destination)
        .eq('id', id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-destinations'] });
      toast({
        title: "Success",
        description: "Destination updated successfully",
      });
      resetForm();
      setIsOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update destination: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteDestinationMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('destinations').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-destinations'] });
      toast({
        title: "Success",
        description: "Destination deleted successfully",
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete destination: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const destinationData = {
      name: formData.name,
      description: formData.description,
      country: formData.country,
      image_url: formData.image_url || null,
      featured: formData.featured,
      properties_count: parseInt(formData.properties_count.toString()) || 0
    };

    if (selectedDestination) {
      updateDestinationMutation.mutate({
        id: selectedDestination.id,
        destination: destinationData
      });
    } else {
      addDestinationMutation.mutate(destinationData);
    }
  };

  const handleEdit = (destination: Destination) => {
    setSelectedDestination(destination);
    setFormData({
      name: destination.name,
      description: destination.description,
      country: destination.country,
      image_url: destination.image_url || '',
      featured: destination.featured,
      properties_count: destination.properties_count
    });
    setIsOpen(true);
  };

  const handleDelete = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDestination) {
      deleteDestinationMutation.mutate(selectedDestination.id);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      country: '',
      image_url: '',
      featured: false,
      properties_count: 0
    });
    setSelectedDestination(null);
  };

  const openNewDestinationDialog = () => {
    resetForm();
    setIsOpen(true);
  };

  return (
    <AdminLayout title={t('admin.destinations')}>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('admin.manage_destinations')}</h1>
        <Button onClick={openNewDestinationDialog}>
          <Plus className="mr-2 h-4 w-4" /> {t('admin.add_destination')}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {destinations && destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="flex justify-between items-start">
                  <span className="text-lg">{destination.name}</span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(destination)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(destination)}>
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
          ))}
        </div>
      )}

      {/* Add/Edit Destination Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedDestination ? t('admin.edit_destination') : t('admin.add_destination')}</DialogTitle>
            <DialogDescription>
              {selectedDestination 
                ? t('admin.edit_destination_description') 
                : t('admin.add_destination_description')}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="col-span-3" 
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="country" className="text-right">Country</Label>
                <Input 
                  id="country" 
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image_url" className="text-right">Image URL</Label>
                <Input 
                  id="image_url" 
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="properties_count" className="text-right">Properties Count</Label>
                <Input 
                  id="properties_count" 
                  name="properties_count"
                  type="number"
                  value={formData.properties_count}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="featured" className="text-right">Featured</Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
                  />
                  <Label htmlFor="featured">
                    {formData.featured ? 'Yes' : 'No'}
                  </Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedDestination ? 'Update' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedDestination?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminDestinations;
