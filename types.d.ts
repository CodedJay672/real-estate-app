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

type categoryResponse = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

type categoryWithProductsResponse = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  products: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    location: string;
    listingStatus: "selling" | "sold out" | "reopened";
    description: string;
    imageUrl: string;
    categoryId: string | null;
    bedrooms: number | null;
    bathrooms: number | null;
    price: number;
  }[];
};

type listings = {
  id: string;
  name: string;
  title: string;
  price: number;
  location: string;
  listingStatus: "selling" | "sold out" | "reopened";
  type: string;
  size: number | null;
  categoryId: string | null;
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

type TFilterQuery = {
  name?: string;
  category?: string;
  price?: number | null;
  baths?: number | null;
  beds?: number | null;
  postedOn?: Date | null;
  cursor?: {
    id: string;
    name: string;
  };
};

type TabsType = { id: string; label: string; value: string };
