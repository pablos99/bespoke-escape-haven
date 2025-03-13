
import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, TreePalm } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const isMobile = useIsMobile();
  
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <span className="flex items-center gap-1">
        <TreePine className="h-6 w-6 text-primary" />
        <TreePalm className="h-6 w-6 text-primary" />
      </span>
      {!isMobile && (
        <span className="font-semibold text-xl">EcoStays</span>
      )}
    </Link>
  );
}
