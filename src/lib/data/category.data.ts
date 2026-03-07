import "server-only";
import { db } from "@/db/drizzle";

import { generateErrorMessage } from "../utils";
import { categoriesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "../auth";

export const getAllCategories = async (): Promise<
  ApiResponse<
    {
      id: string;
      name: string;
    }[]
  >
> => {
  try {
    const response = await db
      .select({ id: categoriesTable.id, name: categoriesTable.name })
      .from(categoriesTable);
    if (!response)
      return {
        success: false,
        message: "Failed to get categories",
      };

    return {
      success: true,
      message: "Categories fetched",
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};

export const getAllAdminCategories = async (): Promise<
  ApiResponse<categoryResponse[]>
> => {
  try {
    //veriy auth and admin role
    const session = await auth();
    if (!session?.user || session?.user.role !== "admin")
      throw new Error("Unauthorized access. Please go to the home page.");

    // make database query
    const response = await db.select().from(categoriesTable);
    if (!response)
      return {
        success: false,
        message: "Failed to get categories",
      };

    return {
      success: true,
      message: "Categories fetched",
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};

export const getCategoryById = async (
  id: string,
): Promise<ApiResponse<{ id: string; name: string }[]>> => {
  // ensure the Id is present
  if (!id) {
    console.log("Category Id is required.");
    return {
      success: false,
      message: "Category Id is required.",
    };
  }

  try {
    const response = await db
      .select({ id: categoriesTable.id, name: categoriesTable.name })
      .from(categoriesTable)
      .where(eq(categoriesTable.id, id))
      .limit(1);

    if (!response)
      return {
        success: false,
        message: "Failed to get category",
      };

    return {
      success: true,
      message: "Category fatched",
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};

export const getCategoryWithProducts = async (
  id: string,
): Promise<ApiResponse<categoryWithProductsResponse>> => {
  // ensure the Id is present
  if (!id) {
    console.log("Category Id is required.");
    return {
      success: false,
      message: "Category Id is required.",
    };
  }

  try {
    const response = await db.query.categoriesTable.findFirst({
      with: {
        products: true,
      },
      where: eq(categoriesTable.id, id),
    });

    if (!response)
      return {
        success: false,
        message: "Failed to get category",
      };

    return {
      success: true,
      message: "Category fatched",
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};
