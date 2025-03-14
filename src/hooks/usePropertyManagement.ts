
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { adminUpdate, adminDelete, useAdminService } from '@/services/AdminService';

export interface Property {
  id?: string;
  title: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  price_per_share: number;
  total_shares: number;
  available_shares: number;
  status: 'pending' | 'active' | 'sold_out' | 'closed';
  description: string;
  minimum_investment?: number;
  total_price?: number;
}

export function usePropertyManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);
  const adminService = useAdminService();

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
      return data;
    }
  });

  // Upsert property mutation
  const upsertProperty = useMutation({
    mutationFn: async (property: Partial<Property> & { id?: string }) => {
      setIsPending(true);
      console.log('Upserting property with data:', property);
      
      try {
        const { id, ...data } = property;
        
        // Calculate total_price and minimum_investment if not provided
        if (!data.total_price && data.price_per_share && data.total_shares) {
          data.total_price = data.price_per_share * data.total_shares;
        }
        if (!data.minimum_investment && data.price_per_share) {
          data.minimum_investment = data.price_per_share;
        }
        
        const result = await adminUpdate(
          'properties',
          data,
          id,
          queryClient,
          ['admin-properties']
        );
        
        if (result.error) throw result.error;
        return result.data;
      } finally {
        setIsPending(false);
      }
    },
    onSuccess: (data) => {
      const action = data.id ? 'updated' : 'created';
      adminService.handleSuccess(action, 'Property');
    },
    onError: (error: any) => {
      adminService.handleError('saving', 'Property', error);
    }
  });

  // Delete property mutation
  const deleteProperty = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting property with ID:', id);
      
      const result = await adminDelete(
        'properties',
        id,
        queryClient,
        ['admin-properties']
      );
      
      if (result.error) throw result.error;
      return id;
    },
    onSuccess: () => {
      adminService.handleSuccess('deleted', 'Property');
    },
    onError: (error: any) => {
      adminService.handleError('deleting', 'Property', error);
    }
  });

  return {
    properties,
    isLoading,
    isPending,
    upsertProperty,
    deleteProperty,
    refetch
  };
}
