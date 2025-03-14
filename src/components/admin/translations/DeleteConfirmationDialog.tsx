
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { useTranslation } from '@/contexts/TranslationContext';

interface DeleteConfirmationDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

export function DeleteConfirmationDialog({
  onCancel,
  onConfirm,
  isPending
}: DeleteConfirmationDialogProps) {
  const { t } = useTranslation();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t('admin.confirm_delete')}</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <p>{t('admin.delete_confirmation')}</p>
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
          {t('admin.delete')}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
