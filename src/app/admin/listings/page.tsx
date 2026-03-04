import Propertylistings from "@/components/admin/Propertylistings";
import Back from "@/components/shared/Back";
import ExportButton from "@/components/shared/ExportButton";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const Listings = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;

  return (
    <section className="wrapper">

      <div className="flex-between gap-2">
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

      <div className="w-full rounded-xl border border-border">
        <div className="w-full p-4 flex justify-between items-center">
          <div>

            <h2 className="text-sm lg:text-lg font-semibold">Listings</h2>
            <p className="text-sm md:text-base text-dark-50">Manage all property listing easily from one place</p>
          </div>
          {/* <ExportButton data={response.data ?? []} label="listing" /> */}
        </div>

        <Suspense key={query} fallback={<LoadingSpinner />}>
          <Propertylistings query={query} />
        </Suspense>
      </div>


      <p className="text-sm font-light text-gray-300 mb-14 mt-2 text-center">
        --The End--
      </p>

    </section>
  );
};

export default Listings;
