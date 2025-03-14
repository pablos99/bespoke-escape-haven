
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
      <div className="flex items-center">
        <TreePine className="h-6 w-6 text-primary" />
        <TreePalm className="h-6 w-6 text-primary -ml-1" />
      </div>
      {!isMobile && (
        <span className="font-bold text-xl">Nomad Nest</span>
      )}
    </Link>
  );
}
