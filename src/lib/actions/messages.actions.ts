"use server";

import { after } from "next/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db/drizzle";
import { auth } from "../auth";
import { generateErrorMessage } from "../utils";
import { contactSchema, equiriesFormInputType } from "../validations/schema";
import { messages } from "@/db/schema";
import { sendNotification } from "./notifications.actions";
import { requireAuth } from "../data/users.data";

export async function sendMessage(
  data: equiriesFormInputType,
): Promise<ApiResponse<TMessageResponse>> {
  // sanitize inputs
  const parsedData = contactSchema.safeParse(data);
  if (!parsedData.success)
    return {
      success: false,
      message: "Failed to validate input",
      error: parsedData.error.flatten().fieldErrors,
    };

  try {
    // verify user auth
    const session = await auth();
    if (!session?.user)
      return {
        success: false,
        message: "Unathorized. Please login to make enquiries",
      };

    // make database request
    const messageResponse = await db
      .insert(messages)
      .values({
        senderName: parsedData.data.name,
        senderEmail: parsedData.data.email,
        message: parsedData.data.message,
      })
      .returning();

    // send notification to admin
    after(async () => {
      if (messageResponse.length > 0) {
        console.log("Sending notification to admin", {
          title: "New Enquiry Request",
          content: "You have received a new enquiry request.",
          isRead: false,
          type: "enquiries",
          url: `/admin/messages?messageId=${messageResponse[0].id}`,
        });

        await sendNotification({
          title: "New Enquiry Request",
          content: "You have received a new enquiry request.",
          isRead: false,
          type: "enquiries",
          url: `/admin/messages?messageId=${messageResponse[0].id}`,
        });
      }
    });

    return {
      success: true,
      message: "Message sent successfully.",
      data: messageResponse[0],
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
}

export async function deleteMessage(
  id: string,
): Promise<ApiResponse<undefined>> {
  try {
    //validate auth
    await requireAuth();

    // make database request
    await db.delete(messages).where(eq(messages.id, id));
    revalidatePath("/admin/messages");
    return {
      success: true,
      message: "Message deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
}
