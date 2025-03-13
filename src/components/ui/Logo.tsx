
import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, TreePalm } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface LogoProps {
  className?: string;
  hideText?: boolean;
}

export function Logo({ className, hideText = false }: LogoProps) {
  const isMobile = useIsMobile();
  
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      {isMobile && (
        <div className="relative">
          <TreePine className="text-primary h-6 w-6" />
          <TreePalm className="text-primary h-6 w-6 absolute -bottom-1 -right-1" />
        </div>
      )}
    </Link>
  );
}
