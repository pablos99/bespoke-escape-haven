
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Property } from '@/hooks/usePropertyManagement';
import { useTranslation } from '@/contexts/TranslationContext';
import { PropertyForm } from './PropertyForm';

interface PropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    title: string;
    description: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
    price_per_share: string;
    total_shares: string;
    available_shares: string;
    status: Property['status'];
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  currentProperty: Property | null;
}

export const PropertyDialog: React.FC<PropertyDialogProps> = ({
  open,
  onOpenChange,
  formData,
  onInputChange,
  onStatusChange,
  onSubmit,
  isPending,
  currentProperty
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            {currentProperty ? t('admin.edit_property') : t('admin.add_property')}
          </DialogTitle>
        </DialogHeader>
        <PropertyForm
          formData={formData}
          onInputChange={onInputChange}
          onStatusChange={onStatusChange}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isPending={isPending}
          isEditMode={!!currentProperty}
        />
      </DialogContent>
    </Dialog>
  );
};
