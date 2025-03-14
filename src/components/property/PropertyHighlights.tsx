
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Highlight {
  title: string;
  description: string;
  key?: string;
}

interface PropertyHighlightsProps {
  highlights: Highlight[];
}

export function PropertyHighlights({ highlights }: PropertyHighlightsProps) {
  const { t, isTranslationsLoading } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
      {highlights.map((highlight, index) => {
        // Get title and description with fallback to the original content
        const title = highlight.key ? t(`property.${highlight.key}`) : highlight.title;
        const description = highlight.key ? t(`property.${highlight.key}Desc`) : highlight.description;
        
        return (
          <div key={index} className="bg-secondary/30 p-6 rounded-xl">
            <h3 className="text-lg font-medium mb-2">
              {title}
            </h3>
            <p className="text-muted-foreground">
              {description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
