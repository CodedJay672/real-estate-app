import "server-only";

import { cache } from "react";
import { count, desc, eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { usersTable } from "@/db/schema";
import { auth } from "../auth";
import { generateErrorMessage } from "../utils";

export const getUser = cache(
  async (email: string): Promise<ApiResponse<TUserResponse | undefined>> => {
    try {
      // verify auth
      await requireAuth();

      // make request to get user
      const user = await db.query.usersTable.findFirst({
        where: (usersTable, { eq, and }) => and(eq(usersTable.email, email)),
      });

      if (!user) {
        return { success: false, message: "User not found" };
      }

      return { success: true, message: "user information fetched", data: user };
    } catch (error) {
      return {
        success: false,
        message: generateErrorMessage(error),
      };
    }
  },
);

export const getAllUsers = cache(
  async (
    page: number = 1,
    pageSize: number = 25,
  ): Promise<ApiResponse<paginatedData<TUserResponse[]>>> => {
    try {
      // verify auth
      await requireAuth();

      // where clause: non admins only
      const whereClause = eq(usersTable.role, "user");

      // make user request
      const [usersCount, allUsers] = await Promise.all([
        db.select({ count: count() }).from(usersTable).where(whereClause),
        db
          .select()
          .from(usersTable)
          .where(whereClause)
          .orderBy(desc(usersTable.createdAt), desc(usersTable.fullName))
          .limit(+pageSize)
          .offset((page - 1) * pageSize),
      ]);

      const totalUsers = usersCount[0].count;

      return {
        success: true,
        message: "All users fetched.",
        data: {
          page,
          pageSize,
          hasNextPage: totalUsers > page * pageSize,
          hasPreviousPage: page > 1,
          data: allUsers,
          totalRows: totalUsers,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: generateErrorMessage(error),
      };
    }
  },
);

export const requireAuth = async () => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin")
    throw new Error(
      "Action not allowed. unauthorized access. Please go back to home page.",
    );
};
