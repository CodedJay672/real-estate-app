"use server";

import { eq, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db/drizzle";
import { requireAuth } from "../data/users.data";
import { generateErrorMessage } from "../utils";
import { categoriesTable } from "@/db/schema";
import { getCategoryWithProducts } from "../data/category.data";
import { categorySchema } from "../validations/schema";

export const createCategory = async (data: {
  name: string;
  description?: string;
}): Promise<ApiResponse<categoryResponse>> => {
  // sanitize form inputs
  const parsedData = categorySchema.safeParse(data);
  if (!parsedData.success) {
    return { success: false, message: parsedData.error.errors[0].message };
  }

  try {
    // validate user permissions
    await requireAuth();

    // check if the category already exists
    const res = await db
      .select()
      .from(categoriesTable)
      .where(ilike(categoriesTable?.name, data.name))
      .limit(1);

    if (res.length > 0) {
      return {
        success: false,
        message: `${res?.[0].name} already exists!`,
      };
    }

    // add the new category
    const response = await db
      .insert(categoriesTable)
      .values({
        name: parsedData.data.name,
        description: parsedData.data.description ?? "",
      })
      .returning();

    if (!response) {
      return {
        success: false,
        message: "Cannot create that category",
      };
    }

    // clear cache and fetch new categories
    revalidatePath("/admin/listings");

    return {
      success: true,
      message: "Category created!",
      data: response[0],
    };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const updateCategory = async (
  categoryId: string,
  data: {
    name: string;
    description?: string;
  },
): Promise<ApiResponse<categoryResponse>> => {
  // sanitize form inputs
  const parsedData = categorySchema.safeParse(data);
  if (!parsedData.success) {
    return { success: false, message: parsedData.error.errors[0].message };
  }

  try {
    // validate user permissions
    await requireAuth();

    // check if the category already exists
    const res = await db
      .select()
      .from(categoriesTable)
      .where(ilike(categoriesTable?.name, data.name))
      .limit(1);

    if (res.length > 0) {
      return {
        success: false,
        message: `${res?.[0].name} already exists!`,
      };
    }

    // udpate the category with the category ID
    const response = await db
      .update(categoriesTable)
      .set({
        name: parsedData.data.name,
        description: parsedData.data.description ?? "",
      })
      .where(eq(categoriesTable.id, categoryId))
      .returning();

    // handle errors
    if (response.length === 0) {
      return {
        success: false,
        message: "Cannot create that category",
      };
    }

    // clear cache and fetch new categories
    revalidatePath("/admin/categories/[id]");

    return {
      success: true,
      message: "Category created!",
      data: response[0],
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};

export const deleteCategoryById = async (id: string) => {
  try {
    //validate user auth and role
    await requireAuth();

    // check number of products in the category
    const categoryInfo = await getCategoryWithProducts(id);
    if (!categoryInfo.success) return categoryInfo;

    if (categoryInfo.success && categoryInfo.data?.products.length)
      return {
        success: false,
        message:
          "Some products belong to this category. Only categories without products can be deleted",
      };

    // make delete request
    await db.delete(categoriesTable).where(eq(categoriesTable.id, id));

    //revalidate category cache and fetch new data
    revalidatePath("/admin/listings");
    return {
      success: true,
      message: "deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};
