import StatsCard from "@/components/shared/StatsCard";
import { DataTable } from "@/components/table/DataTable";
import {
  productColumns,
} from "@/components/table/listings/definition";
import { userColumn } from "@/components/table/users/definition";
import {
  getAllProducts,
  getAllUsers,
  getProductsWithWatchlists,
} from "@/lib/actions/auth";
import { Share2 } from "lucide-react";

const AdminPage = async () => {
  const response = await getAllProducts();
  const users = await getAllUsers();
  const watchers = await getProductsWithWatchlists();

  return (
    <section className="wrapper">
      <div className="w-full lg:max-w-(--breakpoint-md) mb-4">
        <h1 className="text-xl lg:text-2xl font-semibold text-blue-300">
          Welcome!{" "}
        </h1>
        <p className="text-sm lg:text-base font-normal text-blue-300">
          Here's a quick overview of your activities
        </p>
      </div>

      <div className="w-full">
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex lg:max-w-(--breakpoint-md) justify-between items-center gap-6">
            <StatsCard title="Total Users" value={users?.data?.length!} />
            <StatsCard title="Total Listings" value={response?.data?.length!} />
          </div>
          <div className="w-full lg:max-w-(--breakpoint-md) rounded-xl p-4 shadow-md bg-subtle-light ">
            <div className="flex justify-between items-center">
              <h2 className="text-sm lg:text-lg font-normal">Listings</h2>
              <div
                className="cursor-pointer bg-gray-100 hover:bg-gray-200 group flex items-center p-1 rounded-md transition-all"
                title="Export data"
              >
                <Share2 className="size-4 md:size-6 text-blue-300 group-hover:font-semibold transition-all" />
                <span className="text-base font-thin hidden md:block text-gray-700 group-hover:font-semibold transition-all">
                  Export
                </span>
              </div>
            </div>
            <DataTable columns={productColumns} data={response.data ?? []} />
          </div>
          <div className="w-full lg:max-w-(--breakpoint-md) rounded-xl p-4 shadow-md bg-subtle-light">
            <h2 className="text-sm lg:text-lg font-normal">Users</h2>
            <DataTable columns={userColumn} data={users?.data!} />
          </div>
        </div>
      </div>

    </section>
  );
};

export default AdminPage;
