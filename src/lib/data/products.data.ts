import "server-only";

import { db } from "@/db/drizzle";
import { products } from "@/db/schema";
import { eq, ilike } from "drizzle-orm";
import { cache } from "react";
import { generateErrorMessage } from "../utils";

export const getAllProducts = cache(
  async (query?: string): Promise<ApiResponse<listings[]>> => {
    let response: listings[];

    try {
      if (query) {
        response = await db
          .select()
          .from(products)
          .where(ilike(products.name, `%${query}%`));
      } else {
        response = await db.select().from(products);
      }

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
