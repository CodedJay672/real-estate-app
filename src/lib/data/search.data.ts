import "server-only";

import { count, desc, eq } from "drizzle-orm";
import { cache } from "react";

import { generateErrorMessage } from "../utils";
import { requireAuth } from "./users.data";
import { db } from "@/db/drizzle";
import { products, topSearches } from "@/db/schema";
import { getProductDetailsWithLikes } from "./products.data";

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

export const getTopSearchedProperties = cache(
  async (
    page: number = 1,
    pageSize: number = 25,
  ): Promise<
    ApiResponse<
      paginatedData<
        (listings & {
          likes: TLikesResponse[];
          category: categoryResponse | null;
        })[]
      >
    >
  > => {
    try {
      const [totalRows, searchResponse] = await Promise.all([
        db.select({ count: count() }).from(topSearches),
        db.query.topSearches.findMany({
          with: {
            product: {
              with: {
                likes: true,
                category: true,
              },
            },
          },
          orderBy: [desc(topSearches.searchCount), desc(topSearches.createdAt)],
          limit: +pageSize,
          offset: (page - 1) * pageSize,
        }),
      ]);

      const rows = totalRows[0].count;

      // Filter out any entries where product is null (though unlikely)
      const productsWithLikes = searchResponse
        .filter((item) => item.product !== null)
        .map((item) => item.product!);

      return {
        success: true,
        message: "Top searched products fetched.",
        data: {
          page,
          pageSize,
          data: productsWithLikes,
          hasNextPage: rows > page * pageSize,
          hasPreviousPage: page > 1,
          totalRows: rows,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: generateErrorMessage(error),
      };
    }
  },
);
