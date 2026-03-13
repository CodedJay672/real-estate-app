"use server";

import { db } from "@/db/drizzle";
import { likes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { generateErrorMessage } from "../utils";

export const likeProduct = async (userId: string, productId: string) => {
  if (!productId) {
    return { success: false, message: "A valid product ID is required." };
  }

  try {
    // verify auth
    const token = await auth();
    if (!token?.user)
      return {
        success: false,
        message: "Unauthorized",
      };

    // make database request
    const product = await db
      .select()
      .from(likes)
      .where(eq(likes.userId, userId));

    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    const hasLiked = product.find((item) => item.productId === productId);

    // remove like if already liked else, add like
    if (hasLiked) {
      await db.delete(likes).where(eq(likes.productId, hasLiked.productId!));
    } else {
      await db.insert(likes).values({
        userId,
        productId,
        createdAt: new Date(),
      });
    }

    revalidatePath("/");
    revalidatePath("/listings");
    return {
      success: true,
      message: `${hasLiked ? "Removed from Likes" : "Added to likes"}`,
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};
