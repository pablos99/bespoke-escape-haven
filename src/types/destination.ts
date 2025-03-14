
export interface Destination {
  id: string;
  name: string;
  description: string;
  country: string;
  image_url?: string;
  featured: boolean;
  properties_count: number;
  created_at: string;
}

export interface DestinationFormData {
  name: string;
  description: string;
  country: string;
  image_url: string;
  featured: boolean;
  properties_count: number;
}
