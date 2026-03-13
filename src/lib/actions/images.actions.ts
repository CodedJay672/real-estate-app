"use server";

import { revalidatePath } from "next/cache";
import config from "../config";
import { generateErrorMessage, safeFetch } from "../utils";
import { requireAuth } from "../data/users.data";
import { db } from "@/db/drizzle";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

const encodedKey = Buffer.from(`${config.env.imagekit.privateKey}:`).toString(
  "base64",
);

export async function deleteProductImage(
  fileId: string,
  productId?: string | null,
) {
  // unique name is required
  if (!fileId)
    return {
      success: false,
      message: "Image name is required.",
    };

  try {
    //validate user auth and permission
    await requireAuth();

    // make delete request
    const deleteResponse = await safeFetch(
      `https://api.imagekit.io/v1/files/${fileId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${encodedKey}`,
        },
      },
    );

    // handle delete error
    if (!deleteResponse.ok) {
      console.log(deleteResponse);
      let message = "Failed to delete product image";
      try {
        const body = await deleteResponse.json();
        if (body?.message) message = body.message;
      } catch (_) {}
      return {
        success: false,
        message,
      };
    }

    // remove the image url and image Id from the product table
    if (productId) {
      const productUpdate = await db
        .update(products)
        .set({ imageId: null, imageUrl: "" })
        .where(eq(products.id, productId))
        .returning();

      // handle errors
      if (!productUpdate) throw new Error("Failed to update product info");
    }

    // revalidate the product form
    revalidatePath("/admin/listings/add-new");
    return {
      success: true,
      message: "Image deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
}
