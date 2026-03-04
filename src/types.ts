export type PropertyType = 'House' | 'Apartment' | 'Land' | 'Commercial';
export type ListingType = 'Rent' | 'Sale';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: PropertyType;
  listingType: ListingType;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  images: string[];
  features: string[];
  agent: {
    name: string;
    phone: string;
    image: string;
  };
}

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyName: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export type UserRole = 'Client' | 'Agent' | 'Owner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
}

export interface FilterState {
  search: string;
  type: PropertyType | 'All';
  listingType: ListingType | 'All';
  minPrice: number;
  maxPrice: number;
}
