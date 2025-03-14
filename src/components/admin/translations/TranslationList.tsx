
import React from 'react';
import { Translation } from '@/utils/translationUtils';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash } from 'lucide-react';

interface TranslationListProps {
  translations: Translation[] | undefined;
  isLoading: boolean;
  searchQuery: string;
  onEdit: (translation: Translation) => void;
  onDelete: (translation: Translation) => void;
}

export function TranslationList({
  translations,
  isLoading,
  searchQuery,
  onEdit,
  onDelete
}: TranslationListProps) {
  const { t } = useTranslation();

  const filteredTranslations = translations?.filter(translation => 
    translation.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    translation.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
    translation.es.toLowerCase().includes(searchQuery.toLowerCase()) ||
    translation.page.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('admin.key')}</TableHead>
            <TableHead>{t('admin.english')}</TableHead>
            <TableHead>{t('admin.spanish')}</TableHead>
            <TableHead>{t('admin.page')}</TableHead>
            <TableHead className="text-right">{t('admin.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTranslations?.length ? (
            filteredTranslations.map((translation) => (
              <TableRow key={translation.id}>
                <TableCell className="font-medium">{translation.key}</TableCell>
                <TableCell>{translation.en}</TableCell>
                <TableCell>{translation.es}</TableCell>
                <TableCell>{translation.page}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onEdit(translation)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onDelete(translation)}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                {searchQuery 
                  ? t('admin.no_translations_found')
                  : t('admin.no_translations')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
