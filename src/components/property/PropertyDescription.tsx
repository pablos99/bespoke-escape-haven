
import React from 'react';

interface PropertyDescriptionProps {
  description: string;
}

export function PropertyDescription({ description }: PropertyDescriptionProps) {
  return (
    <div className="prose prose-lg max-w-none my-8">
      <p>{description}</p>
    </div>
  );
}
