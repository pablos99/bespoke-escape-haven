
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
