import StatsCard from "@/components/shared/StatsCard";
import { DataTable } from "@/components/table/DataTable";
import { columns, listings } from "@/components/table/listings/definition";
import { getAllProducts } from "@/lib/actions/auth";

const AdminPage = async () => {
  const response = await getAllProducts();

  if (!response.success) {
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
        <StatsCard title="Total Users" value={2} />
        <StatsCard title="Total Listings" value={data?.length!} />
      </div>
      <div className="w-full lg:max-w-screen-md rounded-xl border p-4 shadow-xl overflow-x-scroll">
        <h2 className="text-lg font-light">Listings</h2>
        <DataTable columns={columns} data={data} />
      </div>
      <div className="w-full lg:max-w-screen-md rounded-xl border p-4 shadow-xl">
        <h2 className="text-lg font-light">Users</h2>
      </div>
    </section>
  );
};

export default AdminPage;
