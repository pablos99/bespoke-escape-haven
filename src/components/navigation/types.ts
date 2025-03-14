
export interface NavigationItem {
  name: string;
  href: string;
  submenu?: NavigationItem[];
  icon?: string;
}
