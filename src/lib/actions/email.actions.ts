"use server";

import { requireAuth } from "../data/users.data";
import { sendEmail } from "../email";
import { generateErrorMessage } from "../utils";

export async function sendTestEmailAction(toEmail: string) {
  try {
    await requireAuth();

    if (!toEmail || !toEmail.includes("@")) {
      return { success: false, message: "Please enter a valid email address." };
    }

    const response = await sendEmail({
      toEmail,
      toName: "Test Recipient",
      subject: "Clean Beautiful Properties: Brevo Test Email",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0F172A; text-align: center;">Brevo Email Integration Test</h2>
          <p>Hello,</p>
          <p>This is a test email from your Clean Beautiful Properties admin panel to verify your Brevo SMTP API settings.</p>
          <p style="background-color: #f1f5f9; padding: 15px; border-radius: 4px; text-align: center; font-weight: bold; color: #10b981; margin: 20px 0;">
            ✓ Your Brevo API Key is configured and working successfully!
          </p>
          <p>Best regards,<br/>Clean Beautiful Properties Dev Team</p>
        </div>
      `,
    });

    if (!response.success) {
      throw new Error("SMTP service returned an error. Check server logs or Brevo dashboard.");
    }

    return { success: true, message: "Test email sent successfully via Brevo SMTP!" };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
}

export async function getBrevoStatusAction() {
  try {
    await requireAuth();
    const apiKey = process.env.BREVO_API_KEY;
    const isConfigured = !!apiKey && apiKey !== "dummy";
    return {
      success: true,
      configured: isConfigured,
      maskedKey: isConfigured ? `${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)}` : null
    };
  } catch (error) {
    return {
      success: false,
      configured: false,
      maskedKey: null
    };
  }
}
