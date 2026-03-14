"use server";

import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { auth } from "../auth";
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

    revalidatePath("/listings/details/[id]");
    return {
      success: false,
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
