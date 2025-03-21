
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { QueryClient } from '@tanstack/react-query';

// Using a string literal type instead of referencing the complex Database type
type TableNames = 'translations' | 'destinations' | 'services' | 'properties' | 'property_translations';

/**
 * Generic update function for admin operations
 * @param tableName - The Supabase table name
 * @param data - The data to update/insert
 * @param id - The ID of the existing record (if updating)
 * @param queryClient - The queryClient for invalidating queries
 * @param queryKeysToInvalidate - Array of query keys to invalidate after successful operation
 * @returns The result of the operation
 */
export async function adminUpdate(
  tableName: TableNames,
  data: Record<string, any>,
  id: string | undefined,
  queryClient: QueryClient,
  queryKeysToInvalidate: string[] = []
) {
  console.log(`AdminService: ${id ? 'Updating' : 'Creating'} ${tableName} with data:`, data);
  
  try {
    let result;
    
    if (id) {
      // Update existing record
      const { data: updatedData, error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id)
        .select()
        .maybeSingle(); // Changed from single() to maybeSingle()
        
      if (error) throw error;
      result = updatedData;
      console.log(`AdminService: Successfully updated ${tableName}:`, updatedData);
    } else {
      // Create new record
      const { data: newData, error } = await supabase
        .from(tableName)
        .insert(data)
        .select()
        .maybeSingle(); // Changed from single() to maybeSingle()
        
      if (error) throw error;
      result = newData;
      console.log(`AdminService: Successfully created ${tableName}:`, newData);
    }
    
    // Invalidate queries
    queryKeysToInvalidate.forEach(key => {
      queryClient.invalidateQueries({ queryKey: [key] });
      // Also invalidate any specific property queries
      if (tableName === 'properties' && id) {
        queryClient.invalidateQueries({ queryKey: ['property', id] });
      }
    });
    
    return { data: result, error: null };
  } catch (error) {
    console.error(`AdminService: Error ${id ? 'updating' : 'creating'} ${tableName}:`, error);
    return { data: null, error };
  }
}

/**
 * Generic delete function for admin operations
 * @param tableName - The Supabase table name
 * @param id - The ID of the record to delete
 * @param queryClient - The queryClient for invalidating queries
 * @param queryKeysToInvalidate - Array of query keys to invalidate after successful operation
 * @returns The result of the operation
 */
export async function adminDelete(
  tableName: TableNames,
  id: string,
  queryClient: QueryClient,
  queryKeysToInvalidate: string[] = []
) {
  console.log(`AdminService: Deleting ${tableName} with ID:`, id);
  
  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    console.log(`AdminService: Successfully deleted ${tableName} with ID:`, id);
    
    // Invalidate queries
    queryKeysToInvalidate.forEach(key => {
      queryClient.invalidateQueries({ queryKey: [key] });
    });
    
    // Also invalidate any specific property queries
    if (tableName === 'properties') {
      queryClient.invalidateQueries({ queryKey: ['property', id] });
    }
    
    return { success: true, error: null };
  } catch (error) {
    console.error(`AdminService: Error deleting ${tableName}:`, error);
    return { success: false, error };
  }
}

// Hook to use the admin service with proper toasts
export function useAdminService() {
  const { toast } = useToast();
  
  const handleSuccess = (action: string, resource: string) => {
    toast({
      title: `${resource} ${action} successful`,
      description: `The ${resource.toLowerCase()} has been ${action.toLowerCase()} successfully.`
    });
  };
  
  const handleError = (action: string, resource: string, error: any) => {
    toast({
      title: `Error ${action.toLowerCase()} ${resource.toLowerCase()}`,
      description: error.message || `There was an error ${action.toLowerCase()} the ${resource.toLowerCase()}.`,
      variant: 'destructive'
    });
  };
  
  return {
    handleSuccess,
    handleError
  };
}

/**
 * Fetch a single property by ID with proper error handling
 */
export async function getPropertyById(propertyId: string) {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*, property_images(image_url, is_primary)')
      .eq('id', propertyId)
      .maybeSingle();
      
    if (error) {
      console.error('Error fetching property by ID:', error);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Exception in getPropertyById:', error);
    return { data: null, error };
  }
}
