import { db } from "@/db/drizzle";
import { likes } from "@/db/schema";
import { eq } from "drizzle-orm";
import "server-only";
import { generateErrorMessage } from "../utils";

export const getProductLikes = async (
  productId: string,
): Promise<
  ApiResponse<
    {
      id: string;
      userId: string;
      productId: string | null;
      createdAt: Date;
    }[]
  >
> => {
  // confirm product Id
  if (!productId) return { success: false, message: "Product Id is required" };

  try {
    // get all likes with product id
    const productLikes = await db
      .select()
      .from(likes)
      .where(eq(likes.productId, productId));

    return {
      success: true,
      message: "Product likes fetched",
      data: productLikes,
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};
