import "server-only";

import { cache } from "react";

import { db } from "@/db/drizzle";
import { usersTable } from "@/db/schema";
import { auth } from "../auth";
import { generateErrorMessage } from "../utils";

export const getUser = async (email: string) => {
  try {
    // verify auth
    const token = await auth();
    if (!token?.user)
      return {
        success: false,
        message: "Unauthorized",
      };

    // make request to get user
    const user = await db.query.usersTable.findFirst({
      where: (usersTable, { eq }) => eq(usersTable.email, email),
    });

    if (!user) {
      return { success: false, message: "Error fetching user" };
    }

    return { success: true, message: "user information fetched", data: user };
  } catch (error: any) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};

export const getAllUsers = async () => {
  try {
    // verify auth
    await requireAuth();

    // make user request
    const users = await db.select().from(usersTable);
    if (!users) {
      return { success: false, message: "Error fetching users" };
    }

    return { success: true, message: "All users fetched.", data: users };
  } catch (error: any) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
};

export const requireAuth = async () => {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin")
      throw new Error(
        "Action not allowed. unauthorized access. Please go back to home page.",
      );
  } catch (error) {
    throw error;
  }
};
