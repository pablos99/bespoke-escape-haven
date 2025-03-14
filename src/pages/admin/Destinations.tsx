
import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { DestinationCard } from '@/components/admin/destinations/DestinationCard';
import { DestinationDialog } from '@/components/admin/destinations/DestinationDialog';
import { DeleteConfirmationDialog } from '@/components/admin/destinations/DeleteConfirmationDialog';
import { useDestinations } from '@/hooks/useDestinations';

const AdminDestinations = () => {
  const { t } = useTranslation();
  const {
    destinations,
    isLoading,
    isOpen,
    setIsOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedDestination,
    formData,
    handleInputChange,
    handleSwitchChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    confirmDelete,
    openNewDestinationDialog
  } = useDestinations();

  return (
    <AdminLayout title={t('admin.destinations')}>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('admin.manage_destinations')}</h1>
        <Button onClick={openNewDestinationDialog}>
          <Plus className="mr-2 h-4 w-4" /> {t('admin.add_destination')}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {destinations && destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Destination Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DestinationDialog
          formData={formData}
          onInputChange={handleInputChange}
          onSwitchChange={handleSwitchChange}
          onSubmit={handleSubmit}
          onCancel={() => setIsOpen(false)}
          isEdit={!!selectedDestination}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DeleteConfirmationDialog
          name={selectedDestination?.name || ''}
          onCancel={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
        />
      </Dialog>
    </AdminLayout>
  );
};

export default AdminDestinations;
