import StatsCard from "@/components/shared/StatsCard";
import { DataTable } from "@/components/table/DataTable";
import {
  listings,
  productColumns,
} from "@/components/table/listings/definition";
import { userColumn } from "@/components/table/users/definition";
import {
  getAllProducts,
  getAllUsers,
  getProductsWithWatchlists,
} from "@/lib/actions/auth";
import { MdOutlineImportExport } from "react-icons/md";
import { RiUser2Line } from "react-icons/ri";

const AdminPage = async () => {
  const response = await getAllProducts();
  const users = await getAllUsers();
  const watchers = await getProductsWithWatchlists();

  if (!response.success || !users.success) {
    return <div>Error fetching data</div>;
  }

  const data = response?.data?.map((item) => ({
    id: item.id,
    name: item.name,
    location: item.location,
    title: item.title,
    price: item.price,
    listingStatus: item.listingStatus,
    createdAt: item.createdAt,
  })) as listings[];

  return (
    <section className="wrapper">
      <div className="w-full lg:max-w-screen-md mb-4">
        <h1 className="text-xl lg:text-2xl font-semibold text-blue-300">
          Welcome!{" "}
        </h1>
        <p className="text-sm lg:text-base font-normal text-blue-300">
          Here's a quick overview of your activities
        </p>
      </div>
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="w-full flex flex-col gap-6">
            <div className="w-full flex lg:max-w-screen-md justify-between items-center gap-6">
              <StatsCard title="Total Users" value={users?.data?.length!} />
              <StatsCard title="Total Listings" value={data?.length!} />
            </div>
            <div className="w-full lg:max-w-screen-md rounded-xl p-4 shadow-md bg-subtle-light">
              <div className="flex justify-between items-center">
                <h2 className="text-sm lg:text-lg font-normal">Listings</h2>
                <div
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 group flex items-center p-1 rounded-md transition-all"
                  title="Export data"
                >
                  <MdOutlineImportExport className="size-4 md:size-6 text-blue-300 group-hover:font-semibold transition-all" />
                  <span className="text-base font-thin hidden md:block text-gray-700 group-hover:font-semibold transition-all">
                    Export
                  </span>
                </div>
              </div>
              <DataTable columns={productColumns} data={data} />
            </div>
            <div className="w-full lg:max-w-screen-md rounded-xl p-4 shadow-md bg-subtle-light">
              <h2 className="text-sm lg:text-lg font-normal">Users</h2>
              <DataTable columns={userColumn} data={users?.data!} />
            </div>
          </div>
        </div>
        <div className="w-full p-2 max-w-screen-sm hidden md:block sticky top-0 right-0">
          <div className="bg-subtle-light p-2 rounded-md border shadow-md">
            <h1 className="text-base font-bold mb-1">Watchlists</h1>
            {watchers && watchers.length > 0 ? (
              watchers.map((watchlists) => (
                <div className="w-full flex gap-[6px] p-2" key={watchlists.id}>
                  <div className="flex-1">
                    <h1 className="text-sm font-semibold">{watchlists.name}</h1>
                    <p className="text-xs text-gray-400">
                      {watchlists.location} | {watchlists.title}
                    </p>
                  </div>
                  <div className="flex-center flex-col gap-1">
                    <RiUser2Line size={16} />
                    <p className="text-xs font-semibold text-gray-600">
                      {watchlists.watchlist?.length > 1000
                        ? `${watchlists.watchlist?.length / 1000}K`
                        : `${watchlists.watchlist?.length}`}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="">No Data</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
