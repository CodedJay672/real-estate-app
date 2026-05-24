import "server-only";

import { generateErrorMessage } from "../utils";
import { requireAuth } from "./users.data";
import { db } from "@/db/drizzle";
import { notifications } from "@/db/schema";

export async function getAdminNotifications(): Promise<
  ApiResponse<TNotificationResponse[]>
> {
  try {
    // verify admin auth
    await requireAuth();

    // make db requests
    const notificationsResponse = await db.select().from(notifications);

    return {
      success: true,
      message: "Admin notifications fetched.",
      data: notificationsResponse,
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
}
