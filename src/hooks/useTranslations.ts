
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Translation } from '@/utils/translationUtils';

export function useTranslations() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
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
    mutationFn: async (data: Omit<Translation, 'id'>) => {
      console.log('Creating translation:', data);
      const { error, data: result } = await supabase
        .from('translations')
        .insert([data])
        .select()
        .single();

      if (error) {
        console.error('Error creating translation:', error);
        throw error;
      }
      
      console.log('Translation created successfully:', result);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-translations'] });
      queryClient.invalidateQueries({ queryKey: ['translations'] });
      toast({ title: 'Translation created successfully' });
    },
    onError: (error: any) => {
      console.error('Error in createTranslation mutation:', error);
      toast({ 
        title: 'Error creating translation', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  });

  // Update translation mutation
  const updateTranslation = useMutation({
    mutationFn: async ({ id, ...data }: Translation) => {
      console.log('Updating translation:', id, data);
      const { error, data: result } = await supabase
        .from('translations')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating translation:', error);
        throw error;
      }
      
      console.log('Translation updated successfully:', result);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-translations'] });
      queryClient.invalidateQueries({ queryKey: ['translations'] });
      toast({ title: 'Translation updated successfully' });
    },
    onError: (error: any) => {
      console.error('Error in updateTranslation mutation:', error);
      toast({ 
        title: 'Error updating translation', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  });

  // Delete translation mutation
  const deleteTranslation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting translation:', id);
      const { error } = await supabase
        .from('translations')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting translation:', error);
        throw error;
      }
      
      console.log('Translation deleted successfully');
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-translations'] });
      queryClient.invalidateQueries({ queryKey: ['translations'] });
      toast({ title: 'Translation deleted successfully' });
    },
    onError: (error: any) => {
      console.error('Error in deleteTranslation mutation:', error);
      toast({ 
        title: 'Error deleting translation', 
        description: error.message,
        variant: 'destructive' 
      });
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
