import AdminListing from "@/components/container/AdminListing";
import Back from "@/components/shared/Back";
import { DataTable } from "@/components/table/DataTable";
import { productColumns } from "@/components/table/listings/definition";
import { Input } from "@/components/ui/input";
import { getAllProducts } from "@/lib/actions/auth";
import Link from "next/link";
import { Md4kPlus, MdAdd } from "react-icons/md";

const Listings = async () => {
  const response = await getAllProducts();

  if (!response.success) {
    return <div>{response.message}</div>;
  }

  const { data } = response;

  return (
    <section className="flex-1 p-6 overflow-hidden">
      <div className="w-full lg:max-w-screen-md">
        <h1 className="text-xl lg:text-2xl font-bold">Product listings</h1>
        <p className="text-sm lg:text-base font-normal text-blue-300">
          Manage your listed products here.
        </p>
        <div className="w-full flex justify-between items-center mt-10">
          <Back />
          <Link
            href="/admin/listings/add-new"
            className="bg-blue-300 text-subtle-light p-2 rounded-md flex justify-center items-center gap-1"
          >
            <MdAdd size={20} className="text-subtle-light" />
            <span className="text-subtle-light font-light text-sm hidden md:inline-block">
              Product
            </span>
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
              className="text-sm w-1/3 placeholder:text-sm placeholder:text-blue-100"
            />
          </div>
        </div>

        {/** Posting Details and Management */}
        <div className="flex flex-col space-y-8 mt-4">
          {data?.length &&
            data.map((product) => (
              <AdminListing
                key={product.id}
                name={product.name}
                title={product.title}
                location={product.location}
                price={product.price}
                imageUrl={product.imageUrl}
                id={product.id}
              />
            ))}
        </div>
        <p className="text-sm font-light text-gray-300 mb-14 mt-2 text-center">
          --The End--
        </p>
      </div>
    </section>
  );
};

export default Listings;
