import "server-only";
import { and, count, gte, lt } from "drizzle-orm";

import { generateErrorMessage } from "../utils";
import { requireAuth } from "./users.data";
import { db } from "@/db/drizzle";
import { products, usersTable } from "@/db/schema";

export async function getDashboardMetrics(): Promise<
  ApiResponse<TAverageUsersResponse>
> {
  try {
    // verify auth
    await requireAuth();

    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    // Use week starting on Monday
    const dayOfWeek = today.getDay();
    const daysSinceMonday = (dayOfWeek + 6) % 7;
    const startOfThisWeek = new Date(today);
    startOfThisWeek.setDate(today.getDate() - daysSinceMonday);

    const startOfPreviousWeek = new Date(startOfThisWeek);
    startOfPreviousWeek.setDate(startOfThisWeek.getDate() - 7);

    const [thisWeekResult, previousWeekResult, totalProducts] =
      await Promise.all([
        db
          .select({ count: count() })
          .from(usersTable)
          .where(gte(usersTable.createdAt, startOfThisWeek)),
        db
          .select({ count: count() })
          .from(usersTable)
          .where(
            and(
              gte(usersTable.createdAt, startOfPreviousWeek),
              lt(usersTable.createdAt, startOfThisWeek),
            ),
          ),
        db.select({ count: count() }).from(products),
      ]);

    const thisWeekCount = Number(thisWeekResult[0]?.count ?? 0);
    const previousWeekCount = Number(previousWeekResult[0]?.count ?? 0);

    const averageWeeklyUsers = Number((thisWeekCount / 7).toFixed(2));

    const percentageChange =
      previousWeekCount === 0
        ? thisWeekCount === 0
          ? 0
          : 100
        : Number(
            (
              ((thisWeekCount - previousWeekCount) / previousWeekCount) *
              100
            ).toFixed(2),
          );

    // total products
    const totalListings = totalProducts[0].count;

    return {
      success: true,
      message: "Average weekly user growth calculated.",
      data: {
        averageWeeklyUsers,
        thisWeekCount,
        previousWeekCount,
        percentageChange,
        totalListings,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
}
