"use server";

import { db } from "@/db/drizzle";
import {
  categoriesTable,
  likes,
  products,
  usersTable,
  watchlistInfo,
} from "@/db/schema";
import bcryptjs from "bcryptjs";
import { eq, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";
import { auth } from "../auth";
import { generateErrorMessage } from "../utils";
import {
  categorySchema,
  productSchema,
  signUpSchema,
} from "../validations/schema";

export const signUp = async ({
  email,
  password,
  fullName,
  role,
}: {
  email: string;
  password: string;
  fullName: string;
  role: "admin" | "user";
}): Promise<
  ApiResponse<{
    fullName: string;
    email: string;
    role: "admin" | "user";
  }>
> => {
  const parsed = signUpSchema.safeParse({
    email,
    password,
    fullName,
    role,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "invalid input",
      error: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    // check if user already exists
    const user = await db
      .select({ email: usersTable.email, id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (user.length > 0) {
      return {
        success: false,
        message: "User already exists. Sign in to continue.",
      };
    }

    //encrypt password
    const hashedPwd = bcryptjs.hashSync(password, 10);

    //insert user into db
    const data = await db
      .insert(usersTable)
      .values({ fullName, email, password: hashedPwd })
      .returning();

    return {
      success: true,
      message: "User created successfully",
      data: {
        fullName: data[0].fullName,
        email: data[0].email,
        role: data[0].role,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};

export const uploadProducts = async (data: any) => {
  const parsedData = productSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: parsedData.error.errors[0].message };
  }

  try {
    // verify user auth
    const session = await auth();
    if (!session) {
      return { success: false, message: "User not authenticated" };
    }

    const res = await db
      .insert(products)
      .values({
        ...data,
      })
      .returning();

    if (!res || res.length === 0) {
      return { success: false, message: "Error uploading product" };
    }

    return { success: true, message: `${res?.[0].name} uploaded successfully` };
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
    const session = await auth();

    if (!session) {
      return { success: false, message: "User not authenticated" };
    }

    // make delete request
    const response = await db.delete(products).where(eq(products.id, id));

    if (!response) {
      return { success: false, message: "Error deleting product" };
    }

    revalidatePath("/admin");
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};

export const updateProductById = async (id: string, data: any) => {
  const parsedData = productSchema.safeParse(data);
  if (!parsedData.success) {
    return { success: false, message: parsedData.error.errors[0].message };
  }

  try {
    // validate auth
    const token = await auth();
    if (!token?.user)
      return {
        success: false,
        message: "Unauthorized",
      };

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

export const likeProduct = cache(async (userId: string, productId: string) => {
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
});

export const getLikedProducts = cache(async (query?: string) => {
  try {
    let response;
    if (query) {
      response = await db.query.products.findMany({
        with: {
          likes: true,
        },
        where: (products, { ilike }) => ilike(products.name, `%${query}%`),
      });
    } else {
      response = await db.query.products.findMany({
        with: {
          likes: true,
        },
      });
    }

    if (!response)
      return {
        success: false,
        message: "Failed to get products.",
      };

    console.log("All product likes fetched!");

    return {
      success: true,
      message: "Liked products fetched",
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
});

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

export const getLikedProductsById = cache(async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "A valid product Id is required.",
    };

  try {
    const response = await db.query.products.findFirst({
      with: {
        likes: true,
      },
      where: (products, { eq }) => eq(products.id, id),
    });

    if (!response) console.log("Cannot fetch product likes!");

    console.log("Product likes fetched.");
    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
});

export const getUserLikes = async (userId: string) => {
  try {
    const userLikes = await db.query.usersTable.findMany({
      with: {
        likes: true,
      },
      where: (usersTable, { eq }) => eq(usersTable.id, userId),
    });

    if (!userLikes) return notFound();

    console.log("user likes fetched...");
    return userLikes;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getAllLikes = async () => {
  try {
    const response = await db.select().from(likes);

    if (!response) return notFound();
    console.log("Likes fetched");
    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getAllCategories = async () => {
  try {
    const response = await db.select().from(categoriesTable);

    if (!response) console.log("No categories found");

    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getAllCategoriesWithProducts = cache(async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      success: false,
      message: "Please sign In as an admin",
    };
  }

  try {
    const response = await db.query.categoriesTable.findMany({
      with: {
        products: true,
      },
    });

    if (!response) notFound();

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
});

export const createCategory = async (data: {
  name: string;
  description: string;
}) => {
  try {
    const parsedData = categorySchema.safeParse(data);

    if (!parsedData.success) {
      return { success: false, message: parsedData.error.errors[0].message };
    }

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
        ...data,
      })
      .returning();

    if (!response) {
      return {
        success: false,
        message: "Cannot create that category",
      };
    }

    // clear cache and fetch new categories
    revalidatePath("/admin/categories");

    return {
      success: true,
      message: "Category created!",
    };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const addToWatchlist = cache(
  async (productId: string, userId: string) => {
    try {
      //first check if the product is already in the watchlist
      const res = await db
        .select()
        .from(watchlistInfo)
        .where(eq(watchlistInfo.userId, userId));

      // Remove the product if already in the watchlist
      if (res.length > 0) {
        const response = await db
          .delete(watchlistInfo)
          .where(eq(watchlistInfo.propertyId, productId))
          .returning();

        if (response.length > 0) {
          // revalidate the path when product is removed from the watchlist
          revalidatePath("/");

          return {
            success: true,
            messsage: "Removed from watchlist",
          };
        }
      }

      // Add to watchlist if non-exist
      const response = await db
        .insert(watchlistInfo)
        .values({
          propertyId: productId,
          userId,
        })
        .returning();

      if (!response) {
        return {
          success: false,
          message: "something went wroong",
        };
      }

      revalidatePath("/");

      return {
        success: true,
        message: `Added successfully to watchlist`,
      };
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
);

export const removeFromWatchlist = async (productId: string) => {
  try {
    const response = await db
      .delete(watchlistInfo)
      .where(eq(watchlistInfo.propertyId, productId))
      .returning();

    if (!response) {
      throw new Error(`Something went wrong.`);
    }

    revalidatePath("/");
    return {
      success: true,
      message: "Removed from watchList",
    };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getProductsWithWatchlists = cache(async () => {
  try {
    const response = await db.query.products.findMany({
      columns: {
        id: true,
        name: true,
        location: true,
        title: true,
      },
      with: {
        watchlist: {
          columns: {
            id: true,
            userId: true,
            propertyId: true,
          },
        },
      },
    });

    if (!response) {
      throw new Error(`Error: Failed to fetch watchlists`);
    }

    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
});

export const getUserWatchlist = cache(async (userId: string) => {
  if (!userId) return null;

  try {
    const response = await db.query.usersTable.findFirst({
      columns: {
        id: true,
        fullName: true,
        email: true,
      },
      with: {
        watchList: {
          columns: {
            id: true,
            userId: true,
            propertyId: true,
          },
          where: (watchlistInfo, { eq }) => eq(watchlistInfo.userId, userId),
        },
      },
    });

    if (!response) throw new Error("Failed to fetch watchlist");

    return response;
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
});
