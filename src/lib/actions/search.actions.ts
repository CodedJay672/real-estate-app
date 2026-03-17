"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { generateErrorMessage } from "../utils";
import { topSearches } from "@/db/schema";

export async function updateSearchCount(
  productId: string,
): Promise<ApiResponse<undefined>> {
  if (!productId)
    return {
      success: false,
      message: "ProductId is required.",
    };

  try {
    // check if product has been searched recently
    const isRecorded = await db
      .select({ id: topSearches.productId, count: topSearches.searchCount })
      .from(topSearches)
      .where(eq(topSearches.productId, productId));

    // add a new search entry if product has not been searched
    if (!isRecorded || isRecorded.length === 0) {
      await db.insert(topSearches).values({ productId, searchCount: 1 });

      return {
        success: true,
        message: "New search record created successfully.",
      };
    }

    // update the product count
    await db
      .update(topSearches)
      .set({
        searchCount: (isRecorded[0].count || 0) + 1,
        updatedAt: new Date(),
      })
      .where(eq(topSearches.productId, productId));

    return {
      success: false,
      message: `new search entry for Id: ${productId}`,
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
}
