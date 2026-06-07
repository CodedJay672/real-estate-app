import { redirect } from "next/navigation";
import { desc } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { messages } from "@/db/schema";
import { auth } from "@/lib/auth";
import CrmDashboard from "@/components/admin/CrmDashboard";

export const metadata = {
  title: "CRM Lead Pipeline | Admin",
  description: "Automated real estate lead-to-sale funnel management dashboard.",
};

export default async function AdminCrmPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    redirect("/admin-login");
  }

  // Fetch all leads (messages) ordered by newest first
  const allLeads = await db
    .select()
    .from(messages)
    .orderBy(desc(messages.createdAt));

  return (
    <section className="wrapper">
      <div className="w-full lg:max-w-(--breakpoint-md) mb-6">
        <h1 className="text-xl lg:text-3xl font-extrabold text-primary flex items-center gap-2">
          🏆 Lead-to-Sale Automation CRM
        </h1>
        <p className="text-sm lg:text-base font-normal text-dark-50 mt-1">
          Monitor your customer journey from initial inquiry, viewing schedules, to closing high-ticket deals on WhatsApp.
        </p>
      </div>

      <div className="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <CrmDashboard 
          initialLeads={allLeads} 
          isBrevoConfigured={!!process.env.BREVO_API_KEY && process.env.BREVO_API_KEY !== "dummy"} 
          googleAnalyticsId="G-J0GW3P8MNY"
        />
      </div>
    </section>
  );
}
