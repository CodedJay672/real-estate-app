/**
 * Email & Automation Utility using Brevo (Sendinblue) API
 */

interface SendEmailParams {
  toEmail: string;
  toName: string;
  subject: string;
  htmlContent: string;
}

export async function sendEmail({ toEmail, toName, subject, htmlContent }: SendEmailParams) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey || apiKey === "dummy") {
    console.log(`[Email Automation Mock] Simulated email sent successfully!
    To: ${toName} <${toEmail}>
    Subject: ${subject}
    Body snippet: ${htmlContent.substring(0, 200)}...`);
    return { success: true, message: "Mock email sent (BREVO_API_KEY not set)" };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "Clean Beautiful Properties",
          email: "lauretta@cleanbeautifulproperties.com", // verified sender
        },
        to: [
          {
            email: toEmail,
            name: toName,
          },
        ],
        subject: subject,
        htmlContent: htmlContent,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("Brevo API error:", errData);
      return { success: false, error: errData };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending email via Brevo:", error);
    return { success: false, error };
  }
}

/**
 * Sends a premium lead follow-up email outlining the journey
 */
export async function sendLeadFollowUpEmail({
  clientName,
  clientEmail,
  propertyName,
  leadType,
}: {
  clientName: string;
  clientEmail: string;
  propertyName: string;
  leadType: string;
}) {
  const subject = `Your Luxury Property Journey with Clean Beautiful Properties: ${propertyName || "Exclusive Offer"}`;

  const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #0F172A; font-size: 24px; margin-top: 10px;">Clean Beautiful Properties</h1>
        <p style="color: #64748B; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Luxury Real Estate & Investments</p>
      </div>
      
      <div style="color: #334155; line-height: 1.6; font-size: 16px;">
        <p>Dear <strong>${clientName}</strong>,</p>
        <p>Thank you for inquiring about <strong>${propertyName || "our premium properties"}</strong>. We are thrilled to guide you on your journey to securing high profitable real estate investments in prime locations.</p>
        
        <p style="margin: 25px 0; padding: 15px; background-color: #F8FAFC; border-left: 4px solid #F59E0B; border-radius: 4px;">
          <strong>Your Request Type:</strong> ${leadType.toUpperCase()} <br/>
          <strong>Target Property:</strong> ${propertyName || "General Inquiry"}
        </p>

        <h3 style="color: #0F172A; font-size: 18px; margin-top: 30px;">Your Accelerated Path to Ownership</h3>
        <p>At Clean Beautiful Properties, we automate the entire lead-to-sale pipeline to keep you informed at every step:</p>
        
        <ol style="padding-left: 20px; margin: 20px 0;">
          <li style="margin-bottom: 10px;"><strong>Browsing & Inquiry (Current):</strong> Your details are registered in our CRM pipeline.</li>
          <li style="margin-bottom: 10px;"><strong>Instant WhatsApp Connection:</strong> You can chat directly with our lead agents to arrange immediate viewings.</li>
          <li style="margin-bottom: 10px;"><strong>Private Tour / Viewing:</strong> Schedule a premium virtual or in-person walk-through.</li>
          <li style="margin-bottom: 10px;"><strong>Closing the Deal:</strong> Smooth transaction handling with credible and trustworthy legal guidance.</li>
        </ol>

        <div style="text-align: center; margin: 40px 0 20px 0;">
          <a href="https://wa.me/2348000000000?text=Hi%20Lauretta,%20I%20just%20inquired%20about%20${encodeURIComponent(propertyName || "a property")}%20and%20would%20like%20to%20schedule%20a%20viewing." 
             style="background-color: #10B981; color: white; padding: 12px 30px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.4);">
             Chat Directly on WhatsApp
          </a>
        </div>

        <p style="font-size: 14px; color: #64748B; text-align: center;">Clicking above connects you instantly to our lead agent on WhatsApp for 1-on-1 assistance.</p>
      </div>

      <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 40px 0 20px 0;" />
      
      <div style="text-align: center; color: #94A3B8; font-size: 12px;">
        <p>&copy; ${new Date().getFullYear()} Clean Beautiful Properties Limited. All rights reserved.</p>
        <p>Lekki, Lagos, Nigeria | Credible & Trustworthy</p>
      </div>
    </div>
  `;

  return sendEmail({
    toEmail: clientEmail,
    toName: clientName,
    subject: subject,
    htmlContent: htmlContent,
  });
}

/**
 * Sends an instant notification to the agent
 */
export async function sendAgentNotificationEmail({
  clientName,
  clientEmail,
  clientPhone,
  propertyName,
  leadType,
  message,
}: {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  propertyName: string;
  leadType: string;
  message: string;
}) {
  const agentEmail = process.env.AGENT_NOTIFICATION_EMAIL || "lauretta@cleanbeautifulproperties.com";
  const subject = `🚨 NEW ${leadType.toUpperCase()} LEAD: ${clientName} - ${propertyName || "General"}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 8px;">
      <h2 style="color: #ef4444; border-bottom: 2px solid #ef4444; padding-bottom: 10px; margin-top: 0;">New Lead Notification</h2>
      <p>A new prospect has submitted an inquiry on the luxury real estate website.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 35%;">Client Name:</td>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${clientName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Client Email:</td>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${clientEmail}">${clientEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Client Phone:</td>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;"><a href="tel:${clientPhone}">${clientPhone || "Not provided"}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Lead Classification:</td>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;"><span style="background-color: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${leadType.toUpperCase()}</span></td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Property of Interest:</td>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;"><strong>${propertyName || "General Inquiry"}</strong></td>
        </tr>
      </table>

      <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #94a3b8; margin: 20px 0;">
        <h4 style="margin: 0 0 10px 0; color: #475569;">Prospect's Message:</h4>
        <p style="margin: 0; line-height: 1.5; color: #334155;">${message}</p>
      </div>

      <div style="text-align: center; margin-top: 30px; display: flex; justify-content: center; gap: 15px;">
        <a href="https://wa.me/${(clientPhone || "").replace(/[^0-9]/g, "") || "2348000000000"}?text=Hi%20${encodeURIComponent(clientName)},%20I%20saw%20your%20inquiry%20regarding%20${encodeURIComponent(propertyName || "a property")}%20on%20our%20website..." 
           style="background-color: #10B981; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 6px; margin-right: 10px; display: inline-block;">
           Reply on WhatsApp
        </a>
        <a href="mailto:${clientEmail}?subject=Re:%20Inquiry%20on%20${encodeURIComponent(propertyName || "Luxury Property")}" 
           style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">
           Reply via Email
        </a>
      </div>
    </div>
  `;

  return sendEmail({
    toEmail: agentEmail,
    toName: "Lauretta Asemota",
    subject: subject,
    htmlContent: htmlContent,
  });
}
