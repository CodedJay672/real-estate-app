"use server";

import bcryptjs from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { usersTable } from "@/db/schema";
import { generateErrorMessage } from "../utils";
import { signUpSchema } from "../validations/schema";

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
