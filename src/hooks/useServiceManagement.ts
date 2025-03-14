
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
      
      const { data, error } = await supabase
        .from('services')
        .insert([serviceData])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating service:', error);
        throw error;
      }
      
      console.log('Service created successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: 'Service created successfully' });
      setIsProcessing(false);
    },
    onError: (error: any) => {
      console.error('Error in createService mutation:', error);
      toast({ 
        title: 'Error creating service', 
        description: error.message,
        variant: 'destructive' 
      });
      setIsProcessing(false);
    }
  });

  // Update service mutation
  const updateService = useMutation({
    mutationFn: async ({ id, ...serviceData }: Service) => {
      console.log('Updating service:', id, serviceData);
      setIsProcessing(true);
      
      const { data, error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating service:', error);
        throw error;
      }
      
      console.log('Service updated successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: 'Service updated successfully' });
      setIsProcessing(false);
    },
    onError: (error: any) => {
      console.error('Error in updateService mutation:', error);
      toast({ 
        title: 'Error updating service', 
        description: error.message,
        variant: 'destructive' 
      });
      setIsProcessing(false);
    }
  });

  // Delete service mutation
  const deleteService = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting service:', id);
      setIsProcessing(true);
      
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting service:', error);
        throw error;
      }
      
      console.log('Service deleted successfully');
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: 'Service deleted successfully' });
      setIsProcessing(false);
    },
    onError: (error: any) => {
      console.error('Error in deleteService mutation:', error);
      toast({ 
        title: 'Error deleting service', 
        description: error.message,
        variant: 'destructive' 
      });
      setIsProcessing(false);
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
