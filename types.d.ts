type TProperties = {
  id: number;
  name: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  country: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize: number;
  yearBuilt: number;
  listingStatus: string;
  listingDate: string;
  images: string[];
  amenities: string[];
};

type listings = {
  id: string;
  name: string;
  title: string;
  price: number;
  location: string;
  listingStatus: string;
  type: string;
  size: number | null;
  createdAt: Date;
  updatedAt?: Date;
  imageUrl?: string;
  description?: string;
  bedrooms: number | null;
  bathrooms: number | null;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: Record<string, string[]>;
};
