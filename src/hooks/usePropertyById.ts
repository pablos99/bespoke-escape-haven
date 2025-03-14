
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const usePropertyById = (propertyId: string | undefined) => {
  const { toast } = useToast();
  
  return useQuery({
    queryKey: ['property', propertyId],
    queryFn: async () => {
      if (!propertyId) {
        return null;
      }
      
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*, property_images(image_url, is_primary)')
          .eq('id', propertyId)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching property:', error);
          toast({
            title: 'Error loading property',
            description: 'There was a problem loading the property details.',
            variant: 'destructive',
          });
          throw error;
        }
        
        return data;
      } catch (error: any) {
        console.error('Exception in fetchProperty:', error);
        toast({
          title: 'Error loading property',
          description: error.message || 'An unexpected error occurred',
          variant: 'destructive',
        });
        throw error;
      }
    },
    enabled: !!propertyId,
  });
};
