"use server";

import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { generateErrorMessage } from "../utils";
import { products } from "@/db/schema";

export async function shareProperty(
  productId: string,
  count: number,
): Promise<ApiResponse<number>> {
  if (!productId)
    return {
      success: false,
      message: "Product Id is required to share",
    };

  try {
    // make database request
    const shareCount = await db
      .update(products)
      .set({ sharedCount: count })
      .where(eq(products.id, productId))
      .returning({ count: products.sharedCount });

    if (!shareCount || shareCount.length === 0)
      return {
        success: false,
        message: "Failed to increase share",
      };

    revalidatePath("/listings/details/[slug]");
    return {
      success: true,
      message: "Property link shared successfully.",
      data: shareCount[0].count || 0,
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
}
