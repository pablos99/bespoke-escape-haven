
import React from 'react';
import { useApp } from '@/contexts/AppContext';

interface Highlight {
  title: string;
  description: string;
  key?: string;
}

interface PropertyHighlightsProps {
  highlights: Highlight[];
}

export function PropertyHighlights({ highlights }: PropertyHighlightsProps) {
  const { t } = useApp();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
      {highlights.map((highlight, index) => (
        <div key={index} className="bg-secondary/30 p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-2">
            {highlight.key ? t(highlight.key) : highlight.title}
          </h3>
          <p className="text-muted-foreground">
            {highlight.key ? t(`${highlight.key}Desc`) : highlight.description}
          </p>
        </div>
      ))}
    </div>
  );
}
