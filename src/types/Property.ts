export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  lotArea: number;
  floorArea: number;
  image: string;
  images?: string[];
  latitude: number;
  longitude: number;
  type: string;
  description?: string;
}
