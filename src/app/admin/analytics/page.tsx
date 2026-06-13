import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

export const metadata = {
  title: "Google Analytics Dashboard | Admin",
  description: "Monitor website visitors, traffic sources, and performance from Google Analytics.",
};

export default async function AdminAnalyticsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    redirect("/admin-login");
  }

  return (
    <section className="wrapper space-y-8">
      <div className="w-full lg:max-w-(--breakpoint-md) mb-6">
        <h1 className="text-xl lg:text-3xl font-extrabold text-primary flex items-center gap-2">
          📊 Google Analytics Dashboard
        </h1>
        <p className="text-sm lg:text-base font-normal text-dark-50 mt-1">
          Monitor your real-time traffic statistics, audience insights, and looker report embeds from one place.
        </p>
      </div>

      <div className="w-full">
        <AnalyticsDashboard trackingId="G-J0GW3P8MNY" />
      </div>
    </section>
  );
}
