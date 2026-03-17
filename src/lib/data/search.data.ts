import "server-only";

import { desc, eq } from "drizzle-orm";

import { generateErrorMessage } from "../utils";
import { requireAuth } from "./users.data";
import { db } from "@/db/drizzle";
import { products, topSearches } from "@/db/schema";

export async function getAdminTopSearches(
  limit: number,
): Promise<
  ApiResponse<{ products: listings | null; searches: TTopSearchResponse }[]>
> {
  try {
    // verify user auth and persmission
    await requireAuth();

    //make database request
    const topSearchResponse = await db
      .select()
      .from(topSearches)
      .leftJoin(products, eq(topSearches.productId, products.id))
      .orderBy(desc(topSearches.searchCount), desc(topSearches.searchCount))
      .limit(limit);

    return {
      success: true,
      message: "top searches fetched",
      data: topSearchResponse,
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
}
