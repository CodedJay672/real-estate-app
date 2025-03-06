import AdminListing from "@/components/container/AdminListing";
import Back from "@/components/shared/Back";
import Searchbar from "@/components/shared/Searchbar";
import { getAllProducts } from "@/lib/actions/auth";
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
            <div className="w-full md:w-1/2">
              <Suspense fallback={<p>Loading...</p>}>
                <Searchbar placeholder="Type product name to find." />
              </Suspense>
            </div>
          </div>
        </div>

        {/** Posting Details and Management */}
        <div className="flex flex-col space-y-8 mt-4 min-h-[50dvh] justify-center items-center">
          {response && response?.length > 0 ? (
            response.map((product) => (
              <AdminListing
                key={product.id}
                name={product.name}
                title={product.title}
                location={product.location}
                price={product.price}
                imageUrl={product.imageUrl}
                id={product.id}
              />
            ))
          ) : (
            <p className="text-center text-sm text-gray-300">
              Uploaded products will show here
            </p>
          )}
        </div>
        <p className="text-sm font-light text-gray-300 mb-14 mt-2 text-center">
          --The End--
        </p>
      </div>
    </section>
  );
};

export default Listings;
