import "server-only";

import { and, asc, count, desc, eq, gte, ilike } from "drizzle-orm";
import { cache } from "react";

import { db } from "@/db/drizzle";
import { products } from "@/db/schema";
import { generateErrorMessage } from "../utils";
import { requireAuth } from "./users.data";

const pageSize = 25;

export const getAllProducts = async (
  query?: TFilterQuery,
): Promise<ApiResponse<(listings & { likes: TLikesResponse[] })[]>> => {
  try {
    const response = await db.query.products.findMany({
      where: and(
        query?.name ? ilike(products.name, `%${query.name}%`) : undefined,
        query?.price ? gte(products.price, query.price) : undefined,
        query?.beds ? eq(products.bedrooms, query.beds) : undefined,
        query?.baths ? eq(products.bathrooms, query.baths) : undefined,
        query?.category ? eq(products.categoryId, query.category) : undefined,
        query?.postedOn ? gte(products.createdAt, query.postedOn) : undefined,
      ),
      with: {
        likes: true,
      },
      orderBy: asc(products.createdAt),
    });

    if (!response || response.length === 0)
      return {
        success: false,
        message: "Failed to get all products",
      };

    return {
      success: true,
      message: "Success fetching all products.",
      data: response,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};

export const getAdminProductsWithCategories = async (
  page: number = 1,
  pagesize: number = pageSize,
): Promise<
  ApiResponse<
    paginatedData<
      (listings & {
        category: categoryResponse | null;
        likes: TLikesResponse[];
      })[]
    >
  >
> => {
  try {
    //validate user auth and persmissions
    await requireAuth();

    // Run count and data queries concurrently for better performance
    const [rowsCountResult, response] = await Promise.all([
      db.select({ count: count() }).from(products),
      db.query.products.findMany({
        with: {
          category: true,
          likes: true,
        },
        orderBy: desc(products.createdAt),
        limit: pagesize,
        offset: (page - 1) * pagesize,
      }),
    ]);

    const totalRows = rowsCountResult[0].count;

    return {
      success: true,
      message: "Admin products fetched successfully",
      data: {
        page,
        pageSize: pagesize,
        hasNextPage: totalRows > page * pagesize,
        hasPreviousPage: page > 1,
        data: response,
        totalRows,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};

export const getProductById = cache(
  async (id: string): Promise<ApiResponse<listings>> => {
    if (!id) {
      return { success: false, message: "Product id is required" };
    }

    try {
      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, id))
        .limit(1);

      if (!product || product.length === 0) {
        return {
          success: false,
          message: `Product with id ${id} was not found.`,
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
    id: string,
  ): Promise<
    ApiResponse<
      listings & { likes: TLikesResponse[]; category: categoryResponse | null }
    >
  > => {
    if (!id)
      return {
        success: false,
        message: "A valid product Id is required.",
      };

    try {
      // make database request to fetch product details with likes
      const response = await db.query.products.findFirst({
        where: (products, { eq }) => eq(products.id, id),
        with: {
          likes: true,
          category: true,
        },
      });

      if (!response) {
        console.log("Something went wrong.");
        return {
          success: false,
          message: "Failed to get products with likes count",
        };
      }

      console.log("Product likes fetched.");
      return {
        success: false,
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
