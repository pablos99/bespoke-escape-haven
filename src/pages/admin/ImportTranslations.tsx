
import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import ImportTranslations from '@/scripts/import-translations';

export default function AdminImportTranslationsPage() {
  return (
    <AdminLayout title="Import Translations">
      <ImportTranslations />
    </AdminLayout>
  );
}
