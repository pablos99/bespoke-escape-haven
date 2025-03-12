
import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function MobileMenuButton({ isOpen, setIsOpen }: MobileMenuButtonProps) {
  return (
    <button
      className="relative z-50 text-primary"
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-label="Toggle menu"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
}
