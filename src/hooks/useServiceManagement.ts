
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { adminUpdate, adminDelete, useAdminService } from '@/services/AdminService';

export interface Service {
  id?: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  category: string;
  image_url: string;
  is_featured: boolean;
  status: string;
}

export function useServiceManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const adminService = useAdminService();

  // Fetch all services
  const { 
    data: services, 
    isLoading,
    refetch 
  } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      console.log('Fetching all services');
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error loading services:', error);
        toast({
          title: 'Error loading services',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      console.log('Fetched services:', data);
      return data;
    }
  });

  // Create service mutation
  const createService = useMutation({
    mutationFn: async (serviceData: Omit<Service, 'id'>) => {
      console.log('Creating service with data:', serviceData);
      setIsProcessing(true);
      
      try {
        const { data, error } = await supabase
          .from('services')
          .insert(serviceData)
          .select()
          .maybeSingle();
        
        if (error) throw error;
        return data;
      } finally {
        setIsProcessing(false);
      }
    },
    onSuccess: () => {
      adminService.handleSuccess('created', 'Service');
      queryClient.invalidateQueries({ queryKey: ['admin-services', 'services', 'featured-services'] });
    },
    onError: (error: any) => {
      adminService.handleError('creating', 'Service', error);
    }
  });

  // Update service mutation
  const updateService = useMutation({
    mutationFn: async (serviceData: Service) => {
      console.log('Updating service:', serviceData.id, serviceData);
      setIsProcessing(true);
      
      const { id, ...data } = serviceData;
      
      if (!id) {
        throw new Error('Service ID is required for update');
      }
      
      try {
        const { data: updatedData, error } = await supabase
          .from('services')
          .update(data)
          .eq('id', id)
          .select()
          .maybeSingle();
        
        if (error) throw error;
        return updatedData;
      } finally {
        setIsProcessing(false);
      }
    },
    onSuccess: () => {
      adminService.handleSuccess('updated', 'Service');
      queryClient.invalidateQueries({ queryKey: ['admin-services', 'services', 'featured-services'] });
    },
    onError: (error: any) => {
      adminService.handleError('updating', 'Service', error);
    }
  });

  // Delete service mutation
  const deleteService = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting service:', id);
      setIsProcessing(true);
      
      try {
        const { error } = await supabase
          .from('services')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        return id;
      } finally {
        setIsProcessing(false);
      }
    },
    onSuccess: () => {
      adminService.handleSuccess('deleted', 'Service');
      queryClient.invalidateQueries({ queryKey: ['admin-services', 'services', 'featured-services'] });
    },
    onError: (error: any) => {
      adminService.handleError('deleting', 'Service', error);
    }
  });

  return {
    services,
    isLoading,
    isProcessing,
    createService,
    updateService,
    deleteService,
    refetch
  };
}
