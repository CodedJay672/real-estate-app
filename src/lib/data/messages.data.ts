import "server-only";

import { cache } from "react";

import { generateErrorMessage } from "../utils";
import { requireAuth } from "./users.data";
import { db } from "@/db/drizzle";
import { messages } from "@/db/schema";
import { count, eq } from "drizzle-orm";

const offSet = 25;

export const getAllUserMassages = cache(
  async (
    page: number = 1,
    pageSize: number = offSet,
  ): Promise<ApiResponse<paginatedData<TMessageResponse[]>>> => {
    try {
      // validate auth
      await requireAuth();

      // make database request
      const [totalCount, userMessages] = await Promise.all([
        db.select({ count: count() }).from(messages),
        db
          .select()
          .from(messages)
          .limit(pageSize)
          .offset((page - 1) * pageSize),
      ]);

      const totalRows = totalCount[0].count;

      return {
        success: true,
        message: "User messages fetched",
        data: {
          page,
          pageSize,
          hasNextPage: totalRows > page * pageSize,
          hasPreviousPage: page > 1,
          data: userMessages,
          totalRows,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: generateErrorMessage(error),
      };
    }
  },
);

export const getMessageById = cache(
  async (id: string): Promise<ApiResponse<TMessageResponse>> => {
    if (!id)
      return {
        success: false,
        message: "Message Id is required",
      };

    try {
      //validate auth
      await requireAuth();

      // make db request
      const messageInfo = await db
        .select()
        .from(messages)
        .where(eq(messages.id, id));

      // handle not found
      if (messageInfo.length === 0)
        return {
          success: false,
          message: "This message was not found. It might have been deleted",
        };

      return {
        success: true,
        message: "Messagee fetched",
        data: messageInfo[0],
      };
    } catch (error) {
      return {
        success: false,
        message: generateErrorMessage(error),
      };
    }
  },
);
