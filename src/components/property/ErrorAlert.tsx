
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorAlertProps {
  hasError: boolean;
  propertyError?: any;
}

export function ErrorAlert({ hasError, propertyError }: ErrorAlertProps) {
  if (!hasError && !propertyError) return null;
  
  return (
    <Alert variant="destructive" className="max-w-4xl mx-auto my-4">
      <AlertDescription>
        {propertyError ? 'Could not load property data.' : 'Could not load property translations.'} Showing default content.
      </AlertDescription>
    </Alert>
  );
}
