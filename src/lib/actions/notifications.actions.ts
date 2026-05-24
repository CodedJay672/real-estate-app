"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { auth } from "../auth";
import { notifications } from "@/db/schema";
import {
  notificationInputType,
  notificationSchema,
} from "../validations/schema";
import { generateErrorMessage } from "../utils";
import { requireAuth } from "../data/users.data";

export async function sendNotification(
  data: notificationInputType,
): Promise<ApiResponse<TNotificationResponse>> {
  // verify notification inputs
  const parsedData = notificationSchema.safeParse(data);
  if (!parsedData.success)
    return {
      success: false,
      message: "Failed to validate notification inputs",
      error: parsedData.error.flatten().fieldErrors,
    };

  try {
    // verify authentication
    const session = await auth();
    if (!session?.user)
      return {
        success: false,
        message: "Failed to send notification to admin",
      };

    // send notification
    const notificationResponse = await db
      .insert(notifications)
      .values(data)
      .returning();

    return {
      success: false,
      message: "Notifications sent to admin",
      data: notificationResponse[0],
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
}

export async function readNotification(
  id: string,
): Promise<ApiResponse<{ isRead: boolean }>> {
  try {
    // verify auth
    await requireAuth();

    // make database request
    const response = await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id))
      .returning();

    revalidatePath("/admin", "layout");
    return {
      success: true,
      message: "Notification has been read",
      data: {
        isRead: response[0].isRead ?? true,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
}
