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
  products: listings[];
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
