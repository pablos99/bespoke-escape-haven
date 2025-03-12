
export interface NavigationSubItem {
  name: string;
  href: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  submenu?: NavigationSubItem[];
}
