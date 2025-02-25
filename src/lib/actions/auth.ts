"use server";

import { db } from "@/db/drizzle";
import {
  productSchema,
  signInSchema,
  signUpSchema,
  categorySchema,
} from "../validations/schema";
import { categoriesTable, likes, products, usersTable } from "@/db/schema";
import bcryptjs from "bcryptjs";
import { auth, signIn, signOut } from "@/auth";
import { eq, isNotNull, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { notFound } from "next/navigation";

export const signInWithCreds = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  //validate email and password
  const parsed = signInSchema.safeParse({ email, password });

  if (!parsed.success) {
    return { success: false, message: parsed.error.errors[0].message };
  }

  try {
    const user = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    return { success: true, message: "User signed in successfully" };
  } catch (error: any) {
    throw new Error(`Error signing in: ${error.message}`);
  }
};

export const signUp = async ({
  email,
  password,
  fullName,
}: {
  email: string;
  password: string;
  fullName: string;
}) => {
  const parsed = signUpSchema.safeParse({
    email,
    password,
    fullName,
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.errors[0].message };
  }

  // check if user already exists
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (user.length > 0) {
    return { success: false, message: "User already exists" };
  }

  //encrypt password
  const hashedPwd = bcryptjs.hashSync(password, 10);

  try {
    //insert user into db
    await db
      .insert(usersTable)
      .values({ fullName, email, password: hashedPwd });

    await signInWithCreds({ email, password });

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logOut = async () => {
  await signOut();
};

export const uploadProducts = async (data: any) => {
  const session = await auth();

  if (!session) {
    return { success: false, message: "User not authenticated" };
  }

  try {
    const parsedData = productSchema.safeParse(data);

    if (!parsedData.success) {
      return { success: false, message: parsedData.error.errors[0].message };
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session?.user?.email?.toString()!))
      .limit(1);

    if (user.length === 0) {
      return { success: false, message: "User not found" };
    } else if (user[0].role !== "admin") {
      return { success: false, message: "User not authorized" };
    }

    const userId = user[0].id;

    const res = await db
      .insert(products)
      .values({
        ...data,
      })
      .returning();

    if (!res) {
      return { success: false, message: "Error uploading product" };
    }

    return { success: true, message: `${res?.[0].name} uploaded successfully` };
  } catch (error: any) {
    throw new Error(`Error uploading product: ${error.message}`);
  }
};

export const deleteProduct = async (id: string) => {
  const session = await auth();

  if (!session) {
    return { success: false, message: "User not authenticated" };
  }

  try {
    const response = await db.delete(products).where(eq(products.id, id));

    if (!response) {
      return { success: false, message: "Error deleting product" };
    }

    revalidatePath("/admin");

    return { success: true, message: "Product deleted successfully" };
  } catch (error: any) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
};

export const getAllProducts = async () => {
  try {
    const response = await db.select().from(products);

    if (!response) return notFound();

    return {
      success: true,
      message: "Success fetching all products.",
      data: response,
    };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getUser = async (email: string) => {
  try {
    const user = await db.query.usersTable.findFirst({
      with: {
        watchList: true,
      },
    });

    if (!user) {
      return { success: false, message: "Error fetching user" };
    }

    return { success: true, data: user };
  } catch (error: any) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

export const getAllUsers = async () => {
  try {
    const users = await db.select().from(usersTable);

    if (!users) {
      return { success: false, message: "Error fetching users" };
    }

    return { success: true, data: users };
  } catch (error: any) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

export const getProductById = cache(async (id: string) => {
  if (!id) {
    return { success: false, message: "Create a new listing" };
  }

  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!product) {
      return { success: false, message: "Error fetching product" };
    }

    return { success: true, data: product };
  } catch (error) {
    throw new Error(`Error fetching product: ${error}`);
  }
});

export const updateProductById = async (id: string, data: any) => {
  try {
    const parsedData = productSchema.safeParse(data);
    if (!parsedData.success) {
      return { success: false, message: parsedData.error.errors[0].message };
    }

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
    throw new Error(`Error updating product: ${error}`);
  }
};

export const likeProduct = async (userId: string, productId: string) => {
  try {
    if (!userId || !productId) {
      return { success: false, message: "Sign in to like products." };
    }

    const product = await db
      .select()
      .from(likes)
      .where(eq(likes.userId, userId))
      .limit(1);

    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    const hasLiked = product.find((item) => item.productId === productId);

    if (hasLiked) {
      await db.delete(likes).where(eq(likes.productId, hasLiked.productId!));
    } else {
      await db.insert(likes).values({
        productId,
        userId,
      });
    }

    return {
      success: true,
      message: `${hasLiked ? "Removed from Likes" : "Added to likes"}`,
    };
  } catch (error) {
    throw new Error(`Error liking product: ${error}`);
  }
};

export const getAllCategories = async () => {
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
};

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
      .where(eq(categoriesTable?.name, data.name))
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

    return {
      success: true,
      message: "Category created!",
    };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
