
import { NavigationItem } from './types';

export const navigation: NavigationItem[] = [
  { 
    name: 'nav.properties', 
    href: '/properties',
    submenu: [
      { name: 'nav.featured', href: '/properties?featured=true' },
      { name: 'nav.new', href: '/properties?new=true' },
      { name: 'nav.popular', href: '/properties?popular=true' },
    ]
  },
  { 
    name: 'nav.cities', 
    href: '/destinations',
    submenu: [
      { name: 'nav.bali', href: '/destinations/bali' },
      { name: 'nav.tulum', href: '/destinations/tulum' },
    ]
  },
  { name: 'nav.services', href: '/services' },
];

// Admin navigation items - only shown to admin users
export const adminNavigation: NavigationItem[] = [
  { name: 'admin.dashboard', href: '/admin' },
  { name: 'admin.properties', href: '/admin/properties' },
  { name: 'admin.translations', href: '/admin/translations' },
  { name: 'admin.orders', href: '/admin/orders' },
];
