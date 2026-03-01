import "server-only";

import { cache } from "react";
import { db } from "@/db/drizzle";
import { products } from "@/db/schema";
import { generateErrorMessage } from "../utils";
import { eq } from "drizzle-orm";

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
