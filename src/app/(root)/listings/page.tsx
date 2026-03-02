import type { Metadata } from 'next'
import PropertyCard from "@/components/container/PropertyCard";
import Searchbar from "@/components/shared/Searchbar";
import { getLikedProducts, getUserWatchlist } from "@/lib/actions/auth";
import { auth } from "@/lib/auth";
import { MailQuestion } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata(
): Promise<Metadata> {
  return {
    title: 'Listing',
    description: 'Explore our extensive collection of properties, from cozy apartments to luxurious villas. Find your perfect home or investment opportunity with us today.',
  }
}


const ProductListings = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const session = await auth();
  const { query } = await searchParams;


  let watchlist = null;
  const allProducts = await getLikedProducts(query);

  if (session?.user) {
    watchlist = await getUserWatchlist(session?.user?.id!);
  }

  if (!allProducts) {
    return notFound();
  }

  return (
    <section className="w-full py-20">
      <div className="container flex gap-4 md:gap-8 mx-auto p-2 md:p-4">
        <div className="hidden md:block h-max w-full md:w-1/4 sticky top-24 left-0">
          <div className="sticky top-20">
            <h1 className="text-lg font-semibold">Filter searches</h1>
            <div className="mt-2">
              <h2 className="text-base font-normal">Date Posted</h2>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="w-full bg-light-50">
            <Searchbar placeholder="quickly search through a collection of properties..." />

          </div>

          <div className="w-full mt-4 flex items-center gap-2 py-4">
            {query ? (
              <>
                <h1 className="text-xl font-bold">Search: {query} - </h1>
                <span className="text-sm font-thin text-gray-400">
                  {allProducts && allProducts?.length > 0
                    ? `${allProducts.length}  product(s) found`
                    : "No search results."}
                </span>
              </>
            ) : (
              <h1 className="text-base font-semibold">All Products</h1>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allProducts.length > 0 ? (
              allProducts.map((product) => (
                <PropertyCard
                  key={product.id}
                  {...product}
                />
              ))
            ) : (
              <div className="col-span-full min-h-64 flex-center flex-col">
                <MailQuestion size={44} color="#eee" />
                <span className="text-sm font-medium text-gray-300">
                  No results found.{" "}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListings;
