import Back from "@/components/shared/Back";
import { DataTable } from "@/components/table/DataTable";
import { productColumns } from "@/components/table/listings/definition";
import { Input } from "@/components/ui/input";
import { getAllProducts } from "@/lib/actions/auth";
import Link from "next/link";

const Listings = async () => {
  const response = await getAllProducts();

  if (!response.success) {
    return <div>{response.message}</div>;
  }

  const { data } = response;

  return (
    <section className="flex-1 p-6 overflow-hidden">
      <div className="w-full lg:max-w-screen-md">
        <h1 className="text-xl font-semibold">Product listings</h1>

        <div className="w-full flex justify-between items-center mt-10">
          <Back />
          <Link
            href="/admin/listings/add-new"
            className="bg-blue-300 text-subtle-light inline-block px-4 py-2 rounded-md"
          >
            Add Product
          </Link>
        </div>
        <div className="mt-10 w-full overflow-hidden">
          <div className="flex justify-between items-center">
            <p className="text-blue-100 font-thin text-xs">
              See details of all products here
            </p>
            <Input
              type="search"
              name="search"
              placeholder="Search products..."
              className="text-sm w-1/3 placeholder:text-sm placeholder:text-blue-50 focus:ring-0 focus:outline-0 focus:border-b-blue-300 transition-all"
            />
          </div>
          <DataTable columns={productColumns} data={data!} />
        </div>
      </div>
    </section>
  );
};

export default Listings;
