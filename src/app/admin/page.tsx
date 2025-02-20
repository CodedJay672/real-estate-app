import StatsCard from "@/components/shared/StatsCard";
import { DataTable } from "@/components/table/DataTable";
import {
  listings,
  productColumns,
} from "@/components/table/listings/definition";
import { userColumn } from "@/components/table/users/definition";
import { getAllProducts, getAllUsers } from "@/lib/actions/auth";
import { cache } from "react";
import { MdOutlineImportExport } from "react-icons/md";

const cachedData = cache(getAllProducts);
const cachedUsers = cache(getAllUsers);

const AdminPage = async () => {
  const response = await cachedData();
  const users = await cachedUsers();

  if (!response.success || !users.success) {
    return <div>Error fetching data</div>;
  }

  const data = response?.data?.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    location: item.location,
    propertyType: item.propertyType,
    size: item.size,
    listingStatus: item.listingStatus,
    likes: item.likes,
    createdAt: item.createdAt,
  })) as listings[];

  return (
    <section className="flex-1 p-6 bg-gray-50 flex flex-col gap-4 overflow-hidden mb-20 md:mb-0">
      <div className="w-full lg:max-w-screen-md mb-4">
        <h1 className="text-xl lg:text-2xl font-semibold text-blue-300">
          Welcome!{" "}
        </h1>
        <p className="text-sm lg:text-base font-normal text-blue-300">
          Here's a quick overview of your activities
        </p>
      </div>
      <div className="w-full flex lg:max-w-screen-md justify-between items-center gap-2">
        <StatsCard title="Total Users" value={users?.data?.length!} />
        <StatsCard title="Total Listings" value={data?.length!} />
      </div>
      <div className="w-full lg:max-w-screen-md rounded-xl p-4 shadow-md bg-subtle-light overflow-x-scroll">
        <div className="flex justify-between items-center">
          <h2 className="text-sm lg:text-lg font-normal">Listings</h2>
          <div
            className="text-sm md:text-base lg:text-lg font-normal text-blue-300 cursor-pointer hover:bg-blue-50 flex items-center p-1 rounded-md"
            title="Export data"
          >
            <MdOutlineImportExport className="size-4 md:size-6 text-blue-300" />
            <span className="hidden md:block">Export</span>
          </div>
        </div>
        <DataTable columns={productColumns} data={data} />
      </div>
      <div className="w-full lg:max-w-screen-md rounded-xl p-4 shadow-md bg-subtle-light">
        <h2 className="text-sm lg:text-lg font-normal">Users</h2>
        <DataTable columns={userColumn} data={users?.data!} />
      </div>
    </section>
  );
};

export default AdminPage;
