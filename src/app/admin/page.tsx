import ExportButton from "@/components/shared/ExportButton";
import StatsCard from "@/components/shared/StatsCard";
import { DataTable } from "@/components/table/DataTable";
import {
  productColumns,
} from "@/components/table/listings/definition";
import { userColumn } from "@/components/table/users/definition";
import {
  getProductsWithWatchlists,
} from "@/lib/actions/auth";
import { auth } from "@/lib/auth";
import { getAllProducts } from "@/lib/data/products.data";
import { getAllUsers } from "@/lib/data/users.data";
import { Share2 } from "lucide-react";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const session = await auth();


  const response = await getAllProducts();
  const users = await getAllUsers();
  const watchers = await getProductsWithWatchlists();


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



      <div className="w-full flex lg:max-w-(--breakpoint-md) justify-between items-center gap-6">
        <StatsCard title="Total Users" value={users?.data?.length!} />
        <StatsCard title="Total Listings" value={response?.data?.length!} />
      </div>

      <div className="w-full rounded-xl border border-border">
        <div className="w-full p-4 flex justify-between items-center">
          <div>

            <h2 className="text-sm lg:text-lg font-semibold">Listings</h2>
            <p className="text-sm md:text-base text-dark-50">Manage all property listing easily from one place</p>
          </div>
          <ExportButton data={response.data ?? []} label="listing" />
        </div>
        <DataTable columns={productColumns} data={response.data ?? []} />
      </div>
      <div className="w-full lg:max-w-(--breakpoint-md) rounded-xl p-4 shadow-md bg-subtle-light">
        <h2 className="text-sm lg:text-lg font-normal">Users</h2>
        <DataTable columns={userColumn} data={users?.data!} />
      </div>


    </section>
  );
};

export default AdminPage;
