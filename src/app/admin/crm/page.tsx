import { redirect } from "next/navigation";
import { desc } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { messages } from "@/db/schema";
import { auth } from "@/lib/auth";
import CrmDashboard from "@/components/admin/CrmDashboard";
import BrevoSettingsForm from "@/components/admin/BrevoSettingsForm";

export const metadata = {
  title: "CRM Lead Pipeline | Admin",
  description: "Automated real estate lead-to-sale funnel management dashboard.",
};

export default async function AdminCrmPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    redirect("/admin-login");
  }

  // Fetch all leads (messages) ordered by newest first, with try-catch mock fallback
  let allLeads: any[] = [];
  try {
    allLeads = await db
      .select()
      .from(messages)
      .orderBy(desc(messages.createdAt));
  } catch (error) {
    console.error("CRM Database query failed, falling back to mock data:", error);
    // Mock data fallback to ensure CRM page never crashes if DB connection fails
    allLeads = [
      {
        id: "mock-lead-1",
        senderName: "Lauretta Asemota (Demo Lead)",
        senderEmail: "lauretta@cleanbeautifulproperties.com",
        phone: "+2348000000000",
        leadType: "buyer",
        status: "inquiry",
        propertyName: "Lekki Paradise Estate",
        message: "Hello, I am interested in viewing this property and testing the Brevo integration.",
        createdAt: new Date(),
      },
      {
        id: "mock-lead-2",
        senderName: "John Doe (Demo Lead)",
        senderEmail: "johndoe@example.com",
        phone: "+15551234567",
        leadType: "buyer",
        status: "viewing",
        propertyName: "Banana Island Mansion",
        message: "Can we schedule a private tour for this weekend?",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      }
    ];
  }

  const serializedLeads = allLeads.map((lead) => ({
    ...lead,
    createdAt: typeof lead.createdAt === "string" ? lead.createdAt : lead.createdAt.toISOString(),
  }));

  return (
    <section className="wrapper space-y-8">
      <div className="w-full lg:max-w-(--breakpoint-md) mb-6">
        <h1 className="text-xl lg:text-3xl font-extrabold text-primary flex items-center gap-2">
          🏆 Lead-to-Sale Automation CRM
        </h1>
        <p className="text-sm lg:text-base font-normal text-dark-50 mt-1">
          Monitor your customer journey from initial inquiry, viewing schedules, to closing high-ticket deals on WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_24rem] gap-8 items-start">
        <div className="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <CrmDashboard 
            initialLeads={serializedLeads} 
            isBrevoConfigured={!!process.env.BREVO_API_KEY && process.env.BREVO_API_KEY !== "dummy"} 
            googleAnalyticsId="G-J0GW3P8MNY"
          />
        </div>

        <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-primary">Brevo SMTP Settings</h2>
            <p className="text-xs text-slate-500">
              Verify your connection and send SMTP verification emails directly.
            </p>
          </div>
          <BrevoSettingsForm />
        </div>
      </div>
    </section>
  );
}
