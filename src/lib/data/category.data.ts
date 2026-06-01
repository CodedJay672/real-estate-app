import "server-only";
import { db } from "@/db/drizzle";

import { generateErrorMessage } from "../utils";
import { categoriesTable } from "@/db/schema";
import { eq, ilike } from "drizzle-orm";
import { auth } from "../auth";
import { requireAuth } from "./users.data";
import { cache } from "react";

export const getAllCategories = async (): Promise<
  ApiResponse<
    {
      id: string;
      name: string;
    }[]
  >
> => {
  try {
    //make database request
    const response = await db
      .select({ id: categoriesTable.id, name: categoriesTable.name })
      .from(categoriesTable);
    if (!response)
      return {
        success: false,
        message: "Failed to get categories",
      };

    const hasPosting = response.some(c => c.name.toLowerCase() === "posting");
    if (!hasPosting) {
      try {
        const inserted = await db.insert(categoriesTable).values({
          name: "Posting",
          description: "General social media flyer posts with title, description, and image only."
        }).returning({ id: categoriesTable.id, name: categoriesTable.name });
        if (inserted && inserted.length > 0) {
          response.push(inserted[0]);
        }
      } catch (err) {
        console.error("Failed to auto-create Posting category:", err);
      }
    }

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

export const getAllAdminCategories = cache(
  async (name?: string): Promise<ApiResponse<categoryResponse[]>> => {
    try {
      //veriy auth and admin role
      await requireAuth();

      // make database query
      const response = await db.query.categoriesTable.findMany({
        where: name ? ilike(categoriesTable.name, `%${name}%`) : undefined,
      });
      if (!response)
        return {
          success: false,
          message: "Failed to get categories",
        };

      const hasPosting = response.some(c => c.name.toLowerCase() === "posting");
      if (!hasPosting) {
        try {
          const inserted = await db.insert(categoriesTable).values({
            name: "Posting",
            description: "General social media flyer posts with title, description, and image only."
          }).returning();
          if (inserted && inserted.length > 0) {
            response.push(inserted[0]);
          }
        } catch (err) {
          console.error("Failed to auto-create Posting category:", err);
        }
      }

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
  },
);

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
    // validate user auth and permissions
    await requireAuth();

    // make database request
    const response = await db.query.categoriesTable.findFirst({
      with: {
        products: true,
      },
      where: eq(categoriesTable.id, id),
    });

    // error handling
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
