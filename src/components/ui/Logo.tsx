
import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, TreePalm } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <TreePine className="text-primary h-6 w-6" />
        <TreePalm className="text-primary h-6 w-6 absolute -bottom-1 -right-1" />
      </div>
      <span className="text-xl font-light tracking-tight text-primary">Jungle Properties</span>
    </Link>
  );
}
