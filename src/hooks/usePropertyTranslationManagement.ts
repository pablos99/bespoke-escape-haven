
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PropertyTranslation {
  id?: string;
  property_id: string;
  title_en: string;
  description_en: string;
  title_es: string;
  description_es: string;
  page?: string;
}

export function usePropertyTranslationManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Fetch property translations
  const fetchPropertyTranslation = async (propertyId: string) => {
    setIsProcessing(true);
    try {
      const { data, error } = await supabase
        .from('property_translations')
        .select('*')
        .eq('property_id', propertyId)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error fetching property translation:', error);
        toast({
          title: 'Error',
          description: 'Could not load property translation data.',
          variant: 'destructive',
        });
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Exception fetching property translation:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  // Upsert property translation mutation
  const upsertPropertyTranslation = useMutation({
    mutationFn: async (translation: PropertyTranslation) => {
      console.log('Upserting property translation:', translation);
      setIsProcessing(true);
      
      // Check if translation exists
      const { data: existingData, error: checkError } = await supabase
        .from('property_translations')
        .select('id')
        .eq('property_id', translation.property_id)
        .maybeSingle();
      
      if (checkError) {
        console.error('Error checking existing translation:', checkError);
        throw checkError;
      }
      
      let result;
      
      if (existingData) {
        // Update existing translation
        const { data, error } = await supabase
          .from('property_translations')
          .update({
            title_en: translation.title_en,
            description_en: translation.description_en,
            title_es: translation.title_es,
            description_es: translation.description_es,
            page: translation.page || 'properties'
          })
          .eq('id', existingData.id)
          .select()
          .single();
        
        if (error) {
          console.error('Error updating property translation:', error);
          throw error;
        }
        
        result = data;
        console.log('Property translation updated successfully:', result);
      } else {
        // Insert new translation
        const { data, error } = await supabase
          .from('property_translations')
          .insert([{
            property_id: translation.property_id,
            title_en: translation.title_en,
            description_en: translation.description_en,
            title_es: translation.title_es,
            description_es: translation.description_es,
            page: translation.page || 'properties'
          }])
          .select()
          .single();
        
        if (error) {
          console.error('Error creating property translation:', error);
          throw error;
        }
        
        result = data;
        console.log('Property translation created successfully:', result);
      }
      
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({ title: 'Property translation saved successfully' });
      setIsProcessing(false);
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error saving property translation', 
        description: error.message,
        variant: 'destructive' 
      });
      setIsProcessing(false);
    }
  });

  return {
    fetchPropertyTranslation,
    upsertPropertyTranslation,
    isProcessing
  };
}
