import { redirect } from "next/navigation";
import { Suspense } from "react";

import Campaigns from "@/components/admin/Campaigns";
import DashboardMetrics from "@/components/admin/DashboardMetrics";
import TopSearches from "@/components/admin/TopSearches";
import MetricsLoaders from "@/components/shared/MetricsLoaders";
import { auth } from "@/lib/auth";

const AdminPage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/admin-login");


  return (
    <section className="wrapper">
      <div className="w-full lg:max-w-(--breakpoint-md) mb-4">
        <h1 className="text-xl lg:text-2xl font-semibold text-primary">
          Welcome, {session.user.name?.split(" ")[0] ?? session.user.email}
        </h1>
        <p className="text-sm lg:text-base font-normal text-dark-50">
          Here's a quick overview of your activities
        </p>
      </div>

      <Suspense fallback={<MetricsLoaders />}>
        <DashboardMetrics />
      </Suspense>

      <div className="w-full flex justify-between flex-col md:flex-row gap-4 md:gap-6 mb-24 md:mb-0">
        <Campaigns />
        <TopSearches />
      </div>
    </section>
  );
};

export default AdminPage;
