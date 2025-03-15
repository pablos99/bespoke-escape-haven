
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Translation } from '@/utils/translationUtils';
import { adminUpdate, adminDelete, useAdminService } from '@/services/AdminService';

export function useTranslations() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const adminService = useAdminService();
  
  // Fetch translations
  const { 
    data: translations, 
    isLoading,
    refetch 
  } = useQuery({
    queryKey: ['admin-translations'],
    queryFn: async () => {
      console.log('Fetching all translations');
      const { data, error } = await supabase
        .from('translations')
        .select('*')
        .order('key');
      
      if (error) {
        console.error('Error loading translations:', error);
        toast({
          title: 'Error loading translations',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      console.log('Fetched translations:', data?.length);
      return data as Translation[];
    }
  });

  // Create translation mutation
  const createTranslation = useMutation({
    mutationFn: async (data: Omit<Translation, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('Creating translation:', data);
      
      const result = await adminUpdate(
        'translations', 
        data, 
        undefined, 
        queryClient, 
        ['admin-translations', 'translations']
      );
      
      if (result.error) throw result.error;
      return result.data;
    },
    onSuccess: () => {
      adminService.handleSuccess('created', 'Translation');
      queryClient.invalidateQueries({ queryKey: ['translations'] });
    },
    onError: (error: any) => {
      adminService.handleError('creating', 'Translation', error);
    }
  });

  // Update translation mutation
  const updateTranslation = useMutation({
    mutationFn: async ({ id, ...data }: Translation) => {
      console.log('Updating translation:', id, data);
      
      const result = await adminUpdate(
        'translations', 
        data, 
        id, 
        queryClient, 
        ['admin-translations', 'translations']
      );
      
      if (result.error) throw result.error;
      return result.data;
    },
    onSuccess: () => {
      adminService.handleSuccess('updated', 'Translation');
      queryClient.invalidateQueries({ queryKey: ['translations'] });
    },
    onError: (error: any) => {
      adminService.handleError('updating', 'Translation', error);
    }
  });

  // Delete translation mutation
  const deleteTranslation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting translation:', id);
      
      const result = await adminDelete(
        'translations', 
        id, 
        queryClient, 
        ['admin-translations', 'translations']
      );
      
      if (result.error) throw result.error;
      return id;
    },
    onSuccess: () => {
      adminService.handleSuccess('deleted', 'Translation');
      queryClient.invalidateQueries({ queryKey: ['translations'] });
    },
    onError: (error: any) => {
      adminService.handleError('deleting', 'Translation', error);
    }
  });

  return {
    translations,
    isLoading,
    createTranslation,
    updateTranslation,
    deleteTranslation,
    refetch
  };
}
