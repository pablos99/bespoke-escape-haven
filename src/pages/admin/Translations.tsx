
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { useTranslation } from '@/contexts/TranslationContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { Translation } from '@/utils/translationUtils';
import { TranslationList } from '@/components/admin/translations/TranslationList';
import { TranslationForm } from '@/components/admin/translations/TranslationForm';
import { DeleteConfirmationDialog } from '@/components/admin/translations/DeleteConfirmationDialog';
import { useTranslations } from '@/hooks/useTranslations';

export default function AdminTranslations() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState<Translation | null>(null);

  const { 
    translations, 
    isLoading, 
    createTranslation, 
    updateTranslation, 
    deleteTranslation 
  } = useTranslations();

  const openDialog = (translation?: Translation) => {
    if (translation) {
      setCurrentTranslation(translation);
    } else {
      setCurrentTranslation(null);
    }
    setDialogOpen(true);
  };

  const openDeleteDialog = (translation: Translation) => {
    setCurrentTranslation(translation);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = (data: Omit<Translation, 'id'> & { id?: string }) => {
    if (data.id) {
      // Update existing translation
      updateTranslation.mutate(data as Translation);
    } else {
      // Create new translation
      createTranslation.mutate(data);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (currentTranslation) {
      deleteTranslation.mutate(currentTranslation.id);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <AdminLayout title={t('admin.translations')}>
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('admin.search_translations')}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => openDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          {t('admin.add_translation')}
        </Button>
      </div>

      <TranslationList
        translations={translations}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onEdit={openDialog}
        onDelete={openDeleteDialog}
      />

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <TranslationForm
            translation={currentTranslation}
            onSubmit={handleFormSubmit}
            onCancel={() => setDialogOpen(false)}
            isPending={createTranslation.isPending || updateTranslation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DeleteConfirmationDialog
          onCancel={() => setDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          isPending={deleteTranslation.isPending}
          itemName={currentTranslation?.key}
          itemType="translation"
        />
      </Dialog>
    </AdminLayout>
  );
}
