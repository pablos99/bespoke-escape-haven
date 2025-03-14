
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { QueryClient } from '@tanstack/react-query';
import { Database } from '@/integrations/supabase/types';

/**
 * Generic update function for admin operations
 * @param tableName - The Supabase table name
 * @param data - The data to update/insert
 * @param id - The ID of the existing record (if updating)
 * @param queryClient - The queryClient for invalidating queries
 * @param queryKeysToInvalidate - Array of query keys to invalidate after successful operation
 * @returns The result of the operation
 */
export async function adminUpdate<T extends object>(
  tableName: keyof Database['public']['Tables'],
  data: T,
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
        .single();
        
      if (error) throw error;
      result = updatedData;
      console.log(`AdminService: Successfully updated ${tableName}:`, updatedData);
    } else {
      // Create new record
      const { data: newData, error } = await supabase
        .from(tableName)
        .insert(data)
        .select()
        .single();
        
      if (error) throw error;
      result = newData;
      console.log(`AdminService: Successfully created ${tableName}:`, newData);
    }
    
    // Invalidate queries
    queryKeysToInvalidate.forEach(key => {
      queryClient.invalidateQueries({ queryKey: [key] });
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
  tableName: keyof Database['public']['Tables'],
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
