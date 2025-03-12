
import { NavigationItem } from './types';

export const navigation: NavigationItem[] = [
  { name: 'nav.home', href: '/' },
  { name: 'nav.properties', href: '/properties' },
  { 
    name: 'nav.cities', 
    href: '/cities',
    submenu: [
      { name: 'nav.bali', href: '/cities/bali' },
      { name: 'nav.tulum', href: '/cities/tulum' },
    ]
  },
  { name: 'nav.services', href: '/services' },
  { name: 'nav.booking', href: '/booking' },
  { name: 'nav.about', href: '/about' },
];
