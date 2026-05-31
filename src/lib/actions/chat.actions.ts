"use server";

import { generateErrorMessage } from "../utils";

const SYSTEM_PROMPT = `You are 'Clean & Beautiful AI', the elegant, credible, and trustworthy AI concierge for Clean Beautiful Properties Limited, a premier luxury real estate consulting firm led by CEO Lauretta Asemota.

Your purpose is to assist prospective buyers, renters, and sellers looking for premium luxury properties. 

Here is key information about Clean Beautiful Properties Limited:
- CEO: Lauretta Asemota
- Core philosophy: Creating paradise through a perfect blend of Nature, Technology, Luxury, and Sophistication.
- Location: Lekki, Lagos, Nigeria.
- Credibility: We guide clients on highly profitable investments to multiply their funds and hedge against inflation.

How to guide the user journey:
1. Browsing: Suggest they check our "Listings" page to find luxury properties.
2. Inquiry: Advise them to use the "Schedule a viewing" form on the property details pages to submit inquiries.
3. Viewing & Closing on WhatsApp: Explain that the final viewing scheduling, private virtual/physical tours, and secure deal closings are fast-tracked on WhatsApp. They can click the "WhatsApp" floating button or go to https://wa.me/2348000000000.

Be extremely professional, welcoming, warm, and helpful. Keep responses relatively concise and focused on high-quality real estate service.`;

export async function askPristineAI(messageHistory: { role: "user" | "model"; text: string }[]) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey || apiKey === "dummy") {
    // Elegant fallback simulation if no key is supplied yet
    const lastUserMsg = messageHistory[messageHistory.length - 1]?.text?.toLowerCase() || "";
    let reply = "Hello! I am Clean & Beautiful AI. We are thrilled to guide you on securing premium, high-yield luxury property investments. How may I assist you today?";
    
    if (lastUserMsg.includes("price") || lastUserMsg.includes("cost") || lastUserMsg.includes("buy")) {
      reply = "Our premium properties blend nature, luxury, and technology. To get pricing reviews or schedule a private tour, please fill in the Inquiry Form on the listing details page or connect with Lauretta Asemota instantly on WhatsApp at https://wa.me/2348000000000.";
    } else if (lastUserMsg.includes("rent")) {
      reply = "We offer premium rentals in choice locations. I suggest filling out the Schedule a Viewing form on the rental page so we can register your requirements in our CRM pipeline and follow up immediately!";
    } else if (lastUserMsg.includes("sell")) {
      reply = "Looking to list your property? Excellent! Please let us know your property details and target location. You can also connect directly with Lauretta Asemota on WhatsApp to get it listed across our high-net-worth investor network.";
    } else if (lastUserMsg.includes("ceo") || lastUserMsg.includes("lauretta")) {
      reply = "Our CEO, Lauretta Asemota, is a credible and trustworthy real estate consultant. She leads Clean Beautiful Properties with a mission to deliver the paradise you deserve.";
    }

    return {
      success: true,
      text: reply + " (AI Studio Preview Mode)",
    };
  }

  try {
    // Map history to Google AI Studio format
    const contents = messageHistory.map((msg) => ({
      role: msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.text }],
    }));

    // Inject system prompt inside contents or as systemInstruction parameter
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: contents,
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      console.error("Gemini API Error:", errData);
      throw new Error(errData?.error?.message || "Failed to generate AI response");
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I am here to help you. Please ask any question about our listings.";

    return {
      success: true,
      text: replyText,
    };
  } catch (error) {
    return {
      success: false,
      message: generateErrorMessage(error),
    };
  }
}
