
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  category: string;
  is_featured: boolean;
  status: string;
  created_at: string;
}

const AdminServices = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    location: '',
    category: 'tour',
    is_featured: false,
    status: 'active',
  });

  // Fetch services
  const { data: services, isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Service[];
    }
  });

  const addServiceMutation = useMutation({
    mutationFn: async (newService: any) => {
      const { data, error } = await supabase.from('services').insert(newService);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      toast({
        title: "Success",
        description: "Service added successfully",
      });
      resetForm();
      setIsOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add service: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateServiceMutation = useMutation({
    mutationFn: async ({ id, service }: { id: string; service: any }) => {
      const { data, error } = await supabase
        .from('services')
        .update(service)
        .eq('id', id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      toast({
        title: "Success",
        description: "Service updated successfully",
      });
      resetForm();
      setIsOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update service: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteServiceMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete service: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const serviceData = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      duration: formData.duration,
      location: formData.location,
      category: formData.category,
      is_featured: formData.is_featured,
      status: formData.status
    };

    if (selectedService) {
      updateServiceMutation.mutate({
        id: selectedService.id,
        service: serviceData
      });
    } else {
      addServiceMutation.mutate(serviceData);
    }
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration,
      location: service.location,
      category: service.category,
      is_featured: service.is_featured,
      status: service.status
    });
    setIsOpen(true);
  };

  const handleDelete = (service: Service) => {
    setSelectedService(service);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedService) {
      deleteServiceMutation.mutate(selectedService.id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      location: '',
      category: 'tour',
      is_featured: false,
      status: 'active'
    });
    setSelectedService(null);
  };

  const openNewServiceDialog = () => {
    resetForm();
    setIsOpen(true);
  };

  return (
    <AdminLayout title={t('admin.services')}>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('admin.manage_services')}</h1>
        <Button onClick={openNewServiceDialog}>
          <Plus className="mr-2 h-4 w-4" /> {t('admin.add_service')}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services && services.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="flex justify-between items-start">
                  <span className="text-lg">{service.title}</span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(service)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>${service.price} - {service.duration}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                    {service.category}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {service.location}
                  </span>
                  {service.is_featured && (
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

      {/* Add/Edit Service Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedService ? t('admin.edit_service') : t('admin.add_service')}</DialogTitle>
            <DialogDescription>
              {selectedService 
                ? t('admin.edit_service_description') 
                : t('admin.add_service_description')}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input 
                  id="title" 
                  name="title"
                  value={formData.title}
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
                <Label htmlFor="price" className="text-right">Price</Label>
                <Input 
                  id="price" 
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">Duration</Label>
                <Input 
                  id="duration" 
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">Location</Label>
                <Input 
                  id="location" 
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tour">Tour</SelectItem>
                    <SelectItem value="wellness">Wellness</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="is_featured" className="text-right">Featured</Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => handleSwitchChange('is_featured', checked)}
                  />
                  <Label htmlFor="is_featured">
                    {formData.is_featured ? 'Yes' : 'No'}
                  </Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedService ? 'Update' : 'Save'}
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
              Are you sure you want to delete "{selectedService?.title}"? This action cannot be undone.
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

export default AdminServices;
