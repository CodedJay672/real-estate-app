import "server-only";
import { generateErrorMessage } from "../utils";
import { requireAuth } from "./users.data";
import { db } from "@/db/drizzle";
import { topSearches } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getTopSearches(
  limit: number,
): Promise<ApiResponse<TTopSearchResponse[]>> {
  try {
    // verify user auth and persmission
    await requireAuth();

    //make database request
    const topSearchResponse = await db
      .select()
      .from(topSearches)
      .limit(limit)
      .orderBy(desc(topSearches.searchCount));

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
