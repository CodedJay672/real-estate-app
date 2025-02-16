"use server";

import { db } from "@/db/drizzle";
import {
  productSchema,
  productType,
  signInSchema,
  signUpSchema,
} from "../validations/schema";
import { productsTable, usersTable } from "@/db/schema";
import bcryptjs from "bcryptjs";
import { auth, signIn, signOut } from "@/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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
    throw new Error(error.message);
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

export const uploadProducts = async (data: productType) => {
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
      .insert(productsTable)
      .values({ ...data, createdBy: userId });

    if (!res) {
      return { success: false, message: "Error uploading product" };
    }

    return { success: true, message: "Product uploaded successfully" };
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
    const response = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id));

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
    const products = await db.select().from(productsTable);

    if (!products) {
      return { success: false, message: "Error fetching products" };
    }

    return { success: true, data: products };
  } catch (error: any) {
    throw new Error(`something went wrong: ${error.message}`);
  }
};

export const getUser = async (email: string) => {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

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
