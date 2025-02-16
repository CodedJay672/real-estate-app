import StatsCard from "@/components/shared/StatsCard";
import { DataTable } from "@/components/table/DataTable";
import {
  listings,
  productColumns,
} from "@/components/table/listings/definition";
import { userColumn } from "@/components/table/users/definition";
import { getAllProducts, getAllUsers } from "@/lib/actions/auth";

const AdminPage = async () => {
  const response = await getAllProducts();
  const users = await getAllUsers();

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
    <section className="flex-1 p-6 bg-subtle-light flex flex-col gap-4 overflow-hidden">
      <div className="w-full flex lg:max-w-screen-md justify-between items-center gap-2">
        <StatsCard title="Total Users" value={users?.data?.length!} />
        <StatsCard title="Total Listings" value={data?.length!} />
      </div>
      <div className="w-full lg:max-w-screen-md rounded-xl border p-4 shadow-xl overflow-x-scroll">
        <h2 className="text-sm lg:text-lg font-normal">Listings</h2>
        <DataTable columns={productColumns} data={data} />
      </div>
      <div className="w-full lg:max-w-screen-md rounded-xl border p-4 shadow-xl">
        <h2 className="text-sm lg:text-lg font-normal">Users</h2>
        <DataTable columns={userColumn} data={users?.data!} />
      </div>
    </section>
  );
};

export default AdminPage;
