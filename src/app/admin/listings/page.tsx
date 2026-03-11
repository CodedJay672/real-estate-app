import { Suspense } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";


import AdminCategories from "@/components/admin/AdminCategories";
import CustomTabs from "@/components/admin/CustomTabs";
import Propertylistings from "@/components/admin/Propertylistings";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const Listings = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string, tab: string }>;
}) => {
  const { query, tab } = await searchParams;

  const tabs: TabsType[] = [
    {
      id: crypto.randomUUID(),
      label: "products",
      value: 'products'
    },
    {
      id: crypto.randomUUID(),
      label: "categories",
      value: 'categories'
    }
  ]

  return (
    <section className="wrapper">
      <div className="flex-between gap-2">
        <div className="space-y-2">
          <div>

            <h1 className="text-xl lg:text-2xl text-primary font-bold">{tab === "products" ? "Property Listings" : "Property Categories"}</h1>
            <p className="text-sm lg:text-base font-normal text-dark-50">
              {tab === "products" ? "Manage your property listings all in one place" : "View and manage all categories easily."}
            </p>
          </div>
          <CustomTabs tabs={tabs} />
        </div>
        <Link
          href={tab === "products" ? "/admin/listings/add-new" : "/admin/categories/create-new"}
          className="text-sm md:text-base text-light-50 bg-primary p-2 rounded-md flex justify-center items-center gap-1  ml-auto"
        >
          <Plus size={20} className="text-subtle-light" />
          <span className="text-subtle-light font-light text-sm hidden md:inline-block">
            {tab === "products" ? "Product" : "Category"}
          </span>
        </Link>
      </div>

      <div className="w-full rounded-xl border border-border">
        <div className="p-2">
          <h2 className="text-sm lg:text-lg font-semibold">{tab === "products" ? "Listings" : "Categories"}</h2>
          <p className="text-sm md:text-base text-dark-50">Manage all property {tab === "products" ? 'listings' : "categories"} easily from one place</p>
        </div>

        {tab ? (
          <Suspense key={JSON.stringify({ query, tab })} fallback={<LoadingSpinner />}>
            {tab === "products" ? (
              <Propertylistings query={query} />
            ) : (
              <AdminCategories />
            )}
          </Suspense>
        ) : (
          <LoadingSpinner />
        )}
      </div>

      <p className="text-sm font-light text-gray-300 mb-14 mt-2 text-center">
        --The End--
      </p>
    </section>
  );
};

export default Listings;
