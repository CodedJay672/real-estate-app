import { auth } from "@/auth";
import PropertyCard from "@/components/container/PropertyCard";
import Searchbar from "@/components/shared/Searchbar";
import { Button } from "@/components/ui/button";
import { getLikedProducts, getUserWatchlist } from "@/lib/actions/auth";
import { notFound } from "next/navigation";
import { MdSmsFailed } from "react-icons/md";

const ProductListings = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const session = await auth();
  const { query } = await searchParams;

  const allProducts = await getLikedProducts(query);
  const watchlist = await getUserWatchlist(session?.user?.id!);

  if (!allProducts) {
    return notFound();
  }

  return (
    <section className="wrapper">
      <div className="flex gap-4">
        <div className="hidden md:block min-h-64 w-1/4">
          <div className="sticky top-20">
            <h1 className="text-lg font-semibold">Filter searches</h1>
            <div className="mt-2">
              <h2 className="text-base font-normal">Date Posted</h2>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-full flex-between gap-4 md:gap-16">
            <Searchbar placeholder="Enter search term..." />
            <Button className="bg-blue-300">Save search</Button>
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
                //@ts-ignore
                <PropertyCard
                  watchlist={watchlist.watchList}
                  session={session}
                  {...product}
                  key={product.id}
                />
              ))
            ) : (
              <div className="col-span-full min-h-64 flex-center flex-col">
                <MdSmsFailed size={44} color="#eee" />
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
