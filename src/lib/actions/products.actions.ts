"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { products } from "@/db/schema";
import { requireAuth } from "../data/users.data";
import { productFormSchema, productSchema } from "../validations/schema";
import { generateErrorMessage } from "../utils";
import { db } from "@/db/drizzle";
import { deleteProductImage } from "./images.actions";

export const uploadProducts = async (
  data: productFormSchema,
): Promise<ApiResponse<listings>> => {
  // sanitize product input data
  const parsedData = productSchema.safeParse(data);
  if (!parsedData.success) {
    return {
      success: false,
      message: "Input validation failed",
      error: parsedData.error.flatten().fieldErrors,
    };
  }

  try {
    // verify user auth
    await requireAuth();

    // console log for debugging
    console.log("New product data.", parsedData.data);

    // make database insert request
    const res = await db.insert(products).values(data).returning();
    if (!res || res.length === 0) {
      return { success: false, message: "Error uploading product" };
    }

    revalidatePath("/admin/categories/[id]");
    return {
      success: true,
      message: `${res?.[0].name} uploaded successfully`,
      data: res[0],
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    // verify auth
    await requireAuth();

    // check if the product has an imageId
    const productImageId = await db
      .select({ imgId: products.imageId })
      .from(products)
      .where(eq(products.id, id));

    // delete image if present
    if (productImageId.length > 0 && productImageId?.[0].imgId) {
      const deleteImageResponse = await deleteProductImage(
        productImageId[0].imgId,
      );

      if (!deleteImageResponse.success)
        throw new Error("Something went wrong while deleting product image.");
    }

    // make delete request
    const response = await db.delete(products).where(eq(products.id, id));

    if (!response) {
      return { success: false, message: "Error deleting product" };
    }

    revalidatePath("/admin/listings");
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};

export const updateProductById = async (
  id: string,
  data: productFormSchema,
) => {
  //validate input
  const parsedData = productSchema.safeParse(data);
  if (!parsedData.success) {
    return {
      success: false,
      message: "failed to validate inputs",
      error: parsedData.error.flatten().fieldErrors,
    };
  }

  try {
    // validate auth
    await requireAuth();

    // make database request
    const response = await db
      .update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();

    if (!response) {
      return { success: false, message: "Error updating product" };
    }

    return {
      success: true,
      message: `${response?.[0].name} updated successfully`,
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};
