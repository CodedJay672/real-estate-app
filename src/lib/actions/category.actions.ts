"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { requireAuth } from "../data/users.data";
import { generateErrorMessage } from "../utils";
import { categoriesTable } from "@/db/schema";
import { getCategoryWithProducts } from "../data/category.data";

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
