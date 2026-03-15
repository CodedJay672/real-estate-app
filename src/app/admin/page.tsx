import TopSearches from "@/components/admin/TopSearches";
import StatsCard from "@/components/shared/StatsCard";
import { auth } from "@/lib/auth";
import { getAllProducts } from "@/lib/data/products.data";
import { getAllUsers } from "@/lib/data/users.data";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/admin-login");

  const response = await getAllProducts();
  const users = await getAllUsers();

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

      <div className="w-full flex lg:max-w-(--breakpoint-md) justify-between items-center gap-6">
        <StatsCard title="Total Users" value={users?.data?.length!} />
        <StatsCard title="Total Listings" value={response?.data?.data.length!} />
      </div>

      <div className="w-full flex justify-between flex-col md:flex-row gap-4">
        <div />

        <TopSearches />
      </div>
    </section>
  );
};

export default AdminPage;
