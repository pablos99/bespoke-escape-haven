
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Extract the Supabase URL and key from the environment or client config
const SUPABASE_URL = "https://bwxesdupbzdcnknaupuy.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3eGVzZHVwYnpkY25rbmF1cHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1ODkzODIsImV4cCI6MjA1NzE2NTM4Mn0.eRZ0inq2ZtJjbfbDQwW_G2TBeA_NDnap3lZt44as5dc";

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
            `${SUPABASE_URL}/rest/v1/properties?id=eq.${propertyId}&select=*,property_images(image_url,is_primary)`,
            {
              headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
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
