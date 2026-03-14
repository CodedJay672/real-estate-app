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
  size: number | null;
  categoryId: string | null;
  createdAt: Date;
  updatedAt?: Date;
  imageUrl?: string;
  imageId: string | null;
  description?: string;
  sharedCount: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  tags: string | null;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: Record<string, string[]>;
};

type paginatedData<T> = {
  totalRows: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  page: number;
  pageSize: number;
  data: T;
};

type TFilterQuery = {
  name?: string;
  category?: string;
  price?: number | null;
  baths?: number | null;
  beds?: number | null;
  postedOn?: Date | null;
  page?: number;
  pageSize?: number;
};

type TLikesResponse = {
  id: string;
  createdAt: Date;
  userId: string;
  productId: string | null;
};

type TabsType = { id: string; label: string; value: string };
