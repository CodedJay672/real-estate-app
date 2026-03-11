import "server-only";

import { cache } from "react";
import { and, eq, gte, ilike } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { products } from "@/db/schema";
import { generateErrorMessage } from "../utils";
import { requireAuth } from "./users.data";

const pageSize = 24;

export const getAllProducts = cache(
  async (query?: TFilterQuery): Promise<ApiResponse<listings[]>> => {
    try {
      const response = await db
        .select()
        .from(products)
        .where(
          and(
            query?.name ? ilike(products.name, `%${query.name}%`) : undefined,
            query?.price ? gte(products.price, query.price) : undefined,
            query?.beds ? eq(products.bedrooms, query.beds) : undefined,
            query?.baths ? eq(products.bathrooms, query.baths) : undefined,
            query?.category
              ? eq(products.categoryId, query.category)
              : undefined,
            query?.postedOn
              ? gte(products.createdAt, query.postedOn)
              : undefined,
            query?.cursor
              ? and(
                  eq(products.name, query?.cursor?.name),
                  eq(products.id, query?.cursor.id),
                )
              : undefined,
          ),
        )
        .limit(pageSize);

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
  },
);

export const getAdminProductsWithCategories = cache(
  async (): Promise<
    ApiResponse<
      (listings & {
        category: {
          id: string;
          name: string;
          createdAt: Date;
          updatedAt: Date;
          description: string;
        } | null;
      })[]
    >
  > => {
    try {
      //validate user auth and persmissions
      await requireAuth();

      // make request to the database
      const response = await db.query.products.findMany({
        with: {
          category: true,
        },
        limit: pageSize,
      });

      return {
        success: true,
        message: "Admin products fetched successfully",
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        message: generateErrorMessage(error),
      };
    }
  },
);

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

export const getLikedProducts = cache(async (query?: TFilterQuery) => {
  try {
    let response;

    if (query) {
      response = await db.query.products.findMany({
        with: {
          likes: true,
        },
        where: (products, { ilike }) => ilike(products.name, `%${query}%`),
      });
    } else {
      response = await db.query.products.findMany({
        with: {
          likes: true,
        },
      });
    }

    if (!response)
      return {
        success: false,
        message: "Failed to get products.",
      };

    console.log("All product likes fetched!");

    return {
      success: true,
      message: "Liked products fetched",
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
});
