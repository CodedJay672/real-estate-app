import "server-only";

import { and, count, desc, eq, gte, ilike } from "drizzle-orm";
import { after } from "next/server";
import { cache } from "react";

import { db } from "@/db/drizzle";
import { products } from "@/db/schema";
import { updateSearchCount } from "../actions/search.actions";
import { generateErrorMessage } from "../utils";
import { requireAuth } from "./users.data";

const pageSize = 25;

export const getAllProducts = cache(
  async ({
    page = 1,
    pageSize: rows = pageSize,
    ...query
  }: TFilterQuery): Promise<
    ApiResponse<paginatedData<(listings & { likes: TLikesResponse[] })[]>>
  > => {
    const normalizedDate = query?.postedOn
      ? new Date(decodeURI(query.postedOn))
      : null;

    try {
      // Build the where clause
      const whereClause = and(
        query?.name ? ilike(products.name, `%${query.name}%`) : undefined,
        query?.price ? gte(products.price, query.price) : undefined,
        query?.beds ? eq(products.bedrooms, query.beds) : undefined,
        query?.baths ? eq(products.bathrooms, query.baths) : undefined,
        query?.category ? eq(products.categoryId, query.category) : undefined,
        normalizedDate ? gte(products.createdAt, normalizedDate) : undefined,
      );

      const [totalCount, allProducts] = await Promise.all([
        db.select({ count: count() }).from(products).where(whereClause),
        db.query.products.findMany({
          where: whereClause,
          with: {
            likes: true,
          },
          orderBy: desc(products.createdAt),
          limit: +rows,
          offset: (page - 1) * rows,
        }),
      ]);

      // get the total rows
      const totalRows = totalCount[0].count;

      // run top search update in the background
      after(async () => {
        if (query && Object.values(query).length && allProducts.length > 0) {
          console.log("updating top search table", query);

          await updateSearchCount(allProducts[0].id);
        }
      });

      // return immediately
      return {
        success: true,
        message: "Admin products fetched successfully",
        data: {
          page,
          pageSize: rows,
          hasNextPage: totalRows > page * rows,
          hasPreviousPage: page > 1,
          data: allProducts,
          totalRows,
        },
      };
    } catch (error) {
      console.error("Database connection failed, falling back to mock data:", error);
      
      // Fallback using existing mock contents
      const { properties } = require("@/constants");
      
      const mockData = properties.map((p: any) => ({
        id: p.id.toString(),
        name: p.name,
        slug: p.name.toLowerCase().replace(/ /g, '-'),
        description: p.description,
        price: p.price,
        location: `${p.city}, ${p.state}`,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        size: p.squareFeet.toString(),
        imageUrl: p.images[0],
        listingStatus: p.listingStatus,
        categoryId: p.propertyType,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: []
      }));

      // Basic client-side filtering for the mock data
      let filteredMock = mockData;
      if (query?.name) filteredMock = filteredMock.filter((p: any) => p.name.toLowerCase().includes(query.name!.toLowerCase()));
      if (query?.price) filteredMock = filteredMock.filter((p: any) => p.price >= query.price!);
      if (query?.beds) filteredMock = filteredMock.filter((p: any) => p.bedrooms === query.beds!);
      if (query?.baths) filteredMock = filteredMock.filter((p: any) => p.bathrooms === query.baths!);

      return {
        success: true,
        message: "Loaded from local constants fallback",
        data: {
          page,
          pageSize: rows,
          hasNextPage: false,
          hasPreviousPage: false,
          data: filteredMock,
          totalRows: filteredMock.length,
        },
      };
    }
  },
);

export const getAdminProductsWithCategories = cache(
  async ({
    page = 1,
    pageSize: rows = pageSize,
    ...query
  }: TFilterQuery): Promise<
    ApiResponse<
      paginatedData<
        (listings & {
          category: categoryResponse | null;
          likes: TLikesResponse[];
        })[]
      >
    >
  > => {
    const normalizedDate = query?.postedOn
      ? new Date(decodeURI(query.postedOn))
      : null;

    try {
      //validate user auth and persmissions
      await requireAuth();

      // Build the where clause
      const whereClause = and(
        query.name ? ilike(products.name, `%${query.name}%`) : undefined,
        query.price ? gte(products.price, query.price) : undefined,
        query.beds ? eq(products.bedrooms, query.beds) : undefined,
        query.baths ? eq(products.bathrooms, query.baths) : undefined,
        query.category ? eq(products.categoryId, query.category) : undefined,
        normalizedDate ? gte(products.createdAt, normalizedDate) : undefined,
      );

      // Run count and data queries concurrently for better performance
      const [rowsCountResult, allProducts] = await Promise.all([
        db.select({ count: count() }).from(products).where(whereClause),
        db.query.products.findMany({
          where: whereClause,
          with: {
            category: true,
            likes: true,
          },
          orderBy: desc(products.createdAt),
          limit: +rows,
          offset: (page - 1) * rows,
        }),
      ]);

      const totalRows = rowsCountResult[0].count;
      return {
        success: true,
        message: "Admin products fetched successfully",
        data: {
          page,
          pageSize: rows,
          hasNextPage: totalRows > page * rows,
          hasPreviousPage: page > 1,
          data: allProducts,
          totalRows,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: generateErrorMessage(error),
      };
    }
  },
);

export const getAdminProductById = async (id: string) => {
  try {
    // verify auth
    await requireAuth();

    //make db request
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!product || product.length === 0) {
      return {
        success: false,
        message: `Product was not found.`,
      };
    }

    return {
      success: true,
      message: "product details fetched successfully",
      data: product[0],
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};

export const getProductBySlug = cache(
  async (slug: string): Promise<ApiResponse<listings>> => {
    if (!slug) {
      return { success: false, message: "Product id is required" };
    }

    try {
      const product = await db
        .select()
        .from(products)
        .where(eq(products.slug, decodeURIComponent(slug)))
        .limit(1);

      if (!product || product.length === 0) {
        console.log("Product not found with slug:", slug);
        return {
          success: false,
          message: `${slug} was not found.`,
        };
      }

      return {
        success: true,
        message: "product details fetched successfully",
        data: product[0],
      };
    } catch (error) {
      return {
        success: false,
        message: generateErrorMessage(error),
      };
    }
  },
);

export const getProductDetailsWithLikes = cache(
  async (
    slug: string,
  ): Promise<
    ApiResponse<
      listings & { likes: TLikesResponse[]; category: categoryResponse | null }
    >
  > => {
    if (!slug)
      return {
        success: false,
        message: "A valid product slug is required.",
      };

    try {
      // make database request to fetch product details with likes
      const response = await db.query.products.findFirst({
        where: (products, { eq }) =>
          eq(products.slug, decodeURIComponent(slug)),
        with: {
          likes: true,
          category: true,
        },
      });

      if (!response) {
        console.log("Failed to get product with likes and category.", { slug });
        return {
          success: false,
          message: "Product not found.",
        };
      }

      console.log("Product likes fetched.");
      return {
        success: true,
        message: "Product details with likes count fetched.",
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        message:
          "Something went wrong while fetching product details with like info.",
      };
    }
  },
);
