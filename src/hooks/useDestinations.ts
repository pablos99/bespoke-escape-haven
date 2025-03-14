import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Destination, DestinationFormData } from '@/types/destination';
import { adminUpdate, adminDelete, useAdminService } from '@/services/AdminService';

export function useDestinations() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const adminService = useAdminService();
  const [formData, setFormData] = useState<DestinationFormData>({
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
    mutationFn: async (newDestination: Omit<Destination, 'id' | 'created_at'>) => {
      const result = await adminUpdate(
        'destinations', 
        newDestination, 
        undefined, 
        queryClient, 
        ['admin-destinations']
      );
      
      if (result.error) throw result.error;
      return result.data;
    },
    onSuccess: () => {
      adminService.handleSuccess('created', 'Destination');
      resetForm();
      setIsOpen(false);
    },
    onError: (error) => {
      adminService.handleError('creating', 'Destination', error);
    },
  });

  const updateDestinationMutation = useMutation({
    mutationFn: async ({ id, destination }: { id: string; destination: Omit<Destination, 'id' | 'created_at'> }) => {
      const result = await adminUpdate(
        'destinations', 
        destination, 
        id, 
        queryClient, 
        ['admin-destinations']
      );
      
      if (result.error) throw result.error;
      return result.data;
    },
    onSuccess: () => {
      adminService.handleSuccess('updated', 'Destination');
      resetForm();
      setIsOpen(false);
    },
    onError: (error) => {
      adminService.handleError('updating', 'Destination', error);
    },
  });

  const deleteDestinationMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await adminDelete(
        'destinations', 
        id, 
        queryClient, 
        ['admin-destinations']
      );
      
      if (result.error) throw result.error;
      return id;
    },
    onSuccess: () => {
      adminService.handleSuccess('deleted', 'Destination');
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      adminService.handleError('deleting', 'Destination', error);
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

  return {
    destinations,
    isLoading,
    isOpen,
    setIsOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedDestination,
    formData,
    handleInputChange,
    handleSwitchChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    confirmDelete,
    openNewDestinationDialog
  };
}
