import AdminListing from "@/components/container/AdminListing";
import Back from "@/components/shared/Back";
import Searchbar from "@/components/shared/Searchbar";
import { getAllProducts } from "@/lib/data/products.data";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { MdAdd } from "react-icons/md";

const Listings = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;


  const res = await getAllProducts(query);
  const response = res.data;

  return (
    <section className="wrapper">

      <div className="flex-between gap-2">
        <Back />
        <div>
          <h1 className="text-xl lg:text-2xl text-primary font-bold">Product listings</h1>
          <p className="text-sm lg:text-base font-normal text-dark-50">
            Manage your listed products here.
          </p>
        </div>
        <Link
          href="/admin/listings/add-new"
          className="text-sm md:text-base text-light-50 bg-primary p-2 rounded-md flex justify-center items-center gap-1  ml-auto"
        >
          <Plus size={20} className="text-subtle-light" />
          <span className="text-subtle-light font-light text-sm hidden md:inline-block">
            Product
          </span>
        </Link>
      </div>



      <div className="mt-10 w-full">
        <div className="flex justify-between items-center">

        </div>
        {/** Posting Details and Management */}
        <div className="w-full space-y-8 mt-4">
          {response && response?.length > 0 ? (
            response.map((product) => (
              <AdminListing
                key={product.id}
                name={product.name}
                title={product.title}
                location={product.location}
                price={product.price}
                imageUrl={product.imageUrl ?? ""}
                id={product.id}
                updatedAt={product.updatedAt}
              />
            ))
          ) : (
            <p className="text-center text-sm text-gray-300">
              Uploaded products will show here
            </p>
          )}
        </div>
      </div>

      <p className="text-sm font-light text-gray-300 mb-14 mt-2 text-center">
        --The End--
      </p>

    </section>
  );
};

export default Listings;
