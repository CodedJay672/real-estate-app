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
import { sendLeadFollowUpEmail, sendAgentNotificationEmail } from "../email";

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
        phone: parsedData.data.phone || null,
        leadType: parsedData.data.leadType || "buyer",
        status: "inquiry",
        propertyName: parsedData.data.propertyName || null,
        message: parsedData.data.message,
      })
      .returning();

    // send notification to admin & trigger email automation
    after(async () => {
      if (messageResponse.length > 0) {
        console.log("Sending notification to admin and triggering email automation", {
          title: "New Enquiry Request",
          content: "You have received a new enquiry request.",
          isRead: false,
          type: "enquiries",
          url: `/admin/messages?messageId=${messageResponse[0].id}`,
        });

        // Trigger email automation via Brevo
        try {
          await sendLeadFollowUpEmail({
            clientName: parsedData.data.name,
            clientEmail: parsedData.data.email,
            propertyName: parsedData.data.propertyName || "",
            leadType: parsedData.data.leadType,
          });

          await sendAgentNotificationEmail({
            clientName: parsedData.data.name,
            clientEmail: parsedData.data.email,
            clientPhone: parsedData.data.phone || "",
            propertyName: parsedData.data.propertyName || "",
            leadType: parsedData.data.leadType,
            message: parsedData.data.message,
          });
        } catch (emailError) {
          console.error("Email automation failed:", emailError);
        }

        await sendNotification({
          title: "New Enquiry Request",
          content: `New ${parsedData.data.leadType} lead for ${parsedData.data.propertyName || "General"} from ${parsedData.data.name}`,
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

export async function updateMessageStatus(
  id: string,
  status: string,
): Promise<ApiResponse<undefined>> {
  try {
    //validate auth
    await requireAuth();

    // make database request
    await db
      .update(messages)
      .set({ status })
      .where(eq(messages.id, id));

    revalidatePath("/admin/crm");
    revalidatePath("/admin/messages");
    return {
      success: true,
      message: "Lead status updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
}
