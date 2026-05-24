import { Suspense } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";


import AdminCategories from "@/components/admin/AdminCategories";
import CustomTabs from "@/components/admin/CustomTabs";
import Propertylistings from "@/components/admin/Propertylistings";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import AdminSearchBar from "@/components/admin/AdminSearchBar";
import AdminFilterButton from "@/components/admin/AdminFilterButton";
import { getAllAdminCategories } from "@/lib/data/category.data";

const Listings = async ({
  searchParams,
}: {
  searchParams: Promise<TFilterQuery & { tab: string }>;
}) => {
  const { tab, ...query } = await searchParams;

  const tabs: TabsType[] = [
    {
      id: crypto.randomUUID(),
      label: "products",
      value: ''
    },
    {
      id: crypto.randomUUID(),
      label: "categories",
      value: 'categories'
    }
  ]

  const categories = getAllAdminCategories();

  return (
    <section className="wrapper">
      <div className="flex justify-between gap-2">
        <div className="space-y-2">
          <div>

            <h1 className="text-xl lg:text-2xl text-primary font-bold">{!tab ? "Property Listings" : "Property Categories"}</h1>
            <p className="text-sm lg:text-base font-normal text-dark-50">
              {!tab ? "Manage your property listings all in one place" : "View and manage all categories easily."}
            </p>
          </div>
          <CustomTabs tabs={tabs} />
        </div>
        <Link
          href={!tab ? "/admin/listings/add-new" : "/admin/categories/create-new"}
          className="text-sm md:text-base text-light-50 bg-primary p-2 rounded-md flex justify-center items-center gap-1  ml-auto size-max"
        >
          <Plus size={20} className="text-subtle-light" />
          <span className="text-subtle-light font-light text-sm hidden md:inline-block">
            {!tab ? "Product" : "Category"}
          </span>
        </Link>
      </div>

      <div className="w-full rounded-xl border border-border bg-light-50">
        <div className="w-full flex-between gap-4 flex-col md:flex-row p-2 md:p-4">
          <div className="">
            <h2 className="text-sm lg:text-lg font-semibold">{!tab ? "Listings" : "Categories"}</h2>
            <p className="text-sm md:text-base text-dark-50">Manage all property {!tab ? 'listings' : "categories"} easily from one place</p>
          </div>

          <div className='flex gap-1'>
            <AdminSearchBar placeholder={!tab ? 'Search property name...' : "Search categories..."} />
            {!tab && (
              <AdminFilterButton getCategories={categories} />
            )}
          </div>
        </div>


        <Suspense key={JSON.stringify({ tab, query })} fallback={<LoadingSpinner />}>
          {!tab ? (
            <Propertylistings {...query} />
          ) : (
            <AdminCategories query={query.name ?? ""} />
          )}
        </Suspense>
      </div>

      <p className="text-sm font-light text-gray-300 mb-14 mt-2 text-center">
        --The End--
      </p>
    </section>
  );
};

export default Listings;
