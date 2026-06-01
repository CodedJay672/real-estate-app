"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { products } from "@/db/schema";
import { requireAuth } from "../data/users.data";
import { productFormSchema, productSchema } from "../validations/schema";
import { generateErrorMessage, generateSlug } from "../utils";
import { db } from "@/db/drizzle";
import { deleteProductImage } from "./images.actions";
import z from "zod";

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

    const name = parsedData.data.name || parsedData.data.title || "Untitled Flyer/Post";
    const slug = generateSlug(name);

    const valuesToInsert = {
      name: name,
      title: parsedData.data.title || "",
      description: parsedData.data.description || "",
      price: parsedData.data.price || 0,
      location: parsedData.data.location || "",
      bedrooms: parsedData.data.bedrooms !== undefined ? parsedData.data.bedrooms : null,
      bathrooms: parsedData.data.bathrooms !== undefined ? parsedData.data.bathrooms : null,
      size: parsedData.data.size !== undefined ? parsedData.data.size : null,
      categoryId: (parsedData.data.categoryId && parsedData.data.categoryId !== "") ? parsedData.data.categoryId : null,
      listingStatus: parsedData.data.listingStatus || "selling",
      imageUrl: parsedData.data.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      imageId: parsedData.data.imageId || null,
      tags: parsedData.data.tags || "",
      slug,
    };

    // make database insert request
    const res = await db
      .insert(products)
      .values(valuesToInsert)
      .returning();
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
      error: z.treeifyError(parsedData.error).properties,
    };
  }

  try {
    // validate auth
    await requireAuth();

    const name = data.name || data.title || "Untitled Flyer/Post";
    const slug = generateSlug(name);

    const valuesToUpdate = {
      name: name,
      title: parsedData.data.title || "",
      description: parsedData.data.description || "",
      price: parsedData.data.price || 0,
      location: parsedData.data.location || "",
      bedrooms: parsedData.data.bedrooms !== undefined ? parsedData.data.bedrooms : null,
      bathrooms: parsedData.data.bathrooms !== undefined ? parsedData.data.bathrooms : null,
      size: parsedData.data.size !== undefined ? parsedData.data.size : null,
      categoryId: (parsedData.data.categoryId && parsedData.data.categoryId !== "") ? parsedData.data.categoryId : null,
      listingStatus: parsedData.data.listingStatus || "selling",
      imageUrl: parsedData.data.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      imageId: parsedData.data.imageId || null,
      tags: parsedData.data.tags || "",
      slug,
      updatedAt: new Date(),
    };

    // make database request
    const response = await db
      .update(products)
      .set(valuesToUpdate)
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
