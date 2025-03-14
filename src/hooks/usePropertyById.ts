
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const usePropertyById = (propertyId: string | undefined) => {
  const { toast } = useToast();
  
  return useQuery({
    queryKey: ['property', propertyId],
    queryFn: async () => {
      if (!propertyId) {
        console.log('No property ID provided');
        return null;
      }
      
      console.log(`Fetching property with ID: ${propertyId}`);
      
      try {
        // First attempt: using select() with explicit headers
        console.log('Attempt 1: Using select with explicit headers');
        const { data, error } = await supabase
          .from('properties')
          .select('*, property_images(image_url, is_primary)')
          .eq('id', propertyId)
          .maybeSingle();
        
        if (error) {
          console.error('Error in attempt 1:', error);
          
          // Second attempt: using REST client directly
          console.log('Attempt 2: Using direct REST endpoint');
          const restResponse = await fetch(
            `${supabase.supabaseUrl}/rest/v1/properties?id=eq.${propertyId}&select=*,property_images(image_url,is_primary)`,
            {
              headers: {
                'apikey': supabase.supabaseKey,
                'Authorization': `Bearer ${supabase.supabaseKey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Prefer': 'return=representation'
              }
            }
          );
          
          if (!restResponse.ok) {
            console.error('REST response not OK:', restResponse.status, restResponse.statusText);
            throw new Error(`REST API error: ${restResponse.status} ${restResponse.statusText}`);
          }
          
          const restData = await restResponse.json();
          console.log('REST data:', restData);
          return restData[0] || null;
        }
        
        console.log('Supabase data:', data);
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
