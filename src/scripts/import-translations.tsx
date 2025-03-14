
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';
import { processTranslations } from '@/utils/translationUtils';

/**
 * This component can be used to import all translations from the JSON files to Supabase.
 * It's meant to be used once to set up the initial database of translations.
 */
export function ImportTranslations() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: number;
    errors: number;
    messages: string[];
  }>({ success: 0, errors: 0, messages: [] });

  const flattenTranslations = () => {
    // Process the translation JSON files
    const enResult = processTranslations(enTranslations, '', {});
    const esResult = processTranslations(esTranslations, '', {});
    
    // Create an array of translation objects ready for database insertion
    const translationsToInsert: any[] = [];
    
    // Iterate through all English translations
    Object.keys(enResult).forEach(key => {
      // Get the page from the key (first segment before dot)
      const page = key.split('.')[0] || 'common';
      
      translationsToInsert.push({
        key,
        en: enResult[key].en || '',
        es: esResult[key]?.en || '',
        page
      });
    });
    
    return translationsToInsert;
  };

  const importTranslations = async () => {
    setIsLoading(true);
    const messages: string[] = [];
    let successCount = 0;
    let errorCount = 0;
    
    try {
      const translations = flattenTranslations();
      console.log(`Prepared ${translations.length} translations for import`);
      
      // Import in batches of 100 to avoid request size limitations
      const BATCH_SIZE = 100;
      for (let i = 0; i < translations.length; i += BATCH_SIZE) {
        const batch = translations.slice(i, i + BATCH_SIZE);
        
        // Use upsert to avoid duplicates
        const { data, error } = await supabase
          .from('translations')
          .upsert(batch, { onConflict: 'key' });
        
        if (error) {
          console.error('Error importing batch:', error);
          messages.push(`Batch ${i/BATCH_SIZE + 1} error: ${error.message}`);
          errorCount += batch.length;
        } else {
          successCount += batch.length;
          messages.push(`Batch ${i/BATCH_SIZE + 1} imported successfully (${batch.length} items)`);
        }
      }
      
      setResult({
        success: successCount,
        errors: errorCount,
        messages
      });
    } catch (error) {
      console.error('Import failed:', error);
      messages.push(`Import failed: ${error}`);
      setResult({
        success: successCount,
        errors: errorCount + 1,
        messages
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Import Translations</h1>
      
      <div className="mb-6">
        <p className="mb-4">This tool will import all translations from the JSON files to the Supabase database.</p>
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={importTranslations}
          disabled={isLoading}
        >
          {isLoading ? 'Importing...' : 'Start Import'}
        </button>
      </div>
      
      {result.messages.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          <p className="mb-2">
            Successfully imported {result.success} translations.
            {result.errors > 0 && ` Failed to import ${result.errors} translations.`}
          </p>
          
          <div className="border rounded p-4 bg-gray-50 max-h-96 overflow-y-auto">
            <h3 className="font-medium mb-2">Messages:</h3>
            <ul className="list-disc pl-5">
              {result.messages.map((msg, idx) => (
                <li key={idx} className={msg.includes('error') ? 'text-red-600' : ''}>{msg}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImportTranslations;
