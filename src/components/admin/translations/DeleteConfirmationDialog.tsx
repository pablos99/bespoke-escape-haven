
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { useTranslation } from '@/contexts/TranslationContext';

interface DeleteConfirmationDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
  isPending: boolean;
  itemName?: string;
  itemType?: string;
}

export function DeleteConfirmationDialog({
  onCancel,
  onConfirm,
  isPending,
  itemName = '',
  itemType = 'item'
}: DeleteConfirmationDialogProps) {
  const { t } = useTranslation();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t('admin.confirm_delete')}</DialogTitle>
        <DialogDescription className="text-destructive font-medium pt-2">
          {itemName ? itemName : t('admin.delete_confirmation_generic')}
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <p>{t(`admin.delete_confirmation_specific`).replace('{itemType}', itemType)}</p>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('admin.cancel')}
        </Button>
        <Button 
          type="button" 
          variant="destructive"
          disabled={isPending}
          onClick={onConfirm}
        >
          {isPending ? t('admin.deleting') : t('admin.delete')}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
