
import React from 'react';
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { DestinationForm } from './DestinationForm';
import { useTranslation } from '@/contexts/TranslationContext';
import { DestinationFormData } from '@/types/destination';

interface DestinationDialogProps {
  formData: DestinationFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitchChange: (name: string, checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEdit: boolean;
}

export const DestinationDialog: React.FC<DestinationDialogProps> = ({
  formData,
  onInputChange,
  onSwitchChange,
  onSubmit,
  onCancel,
  isEdit
}) => {
  const { t } = useTranslation();

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>{isEdit ? t('admin.edit_destination') : t('admin.add_destination')}</DialogTitle>
        <DialogDescription>
          {isEdit 
            ? t('admin.edit_destination_description') 
            : t('admin.add_destination_description')}
        </DialogDescription>
      </DialogHeader>
      
      <DestinationForm
        formData={formData}
        onInputChange={onInputChange}
        onSwitchChange={onSwitchChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isEdit={isEdit}
      />
    </DialogContent>
  );
};
