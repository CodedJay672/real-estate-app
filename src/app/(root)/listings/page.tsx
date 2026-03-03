import ProductList from '@/components/container/ProductList';
import PropertyCardSkeleton from '@/components/container/PropertyCardSkeleton';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Searchbar from "@/components/shared/Searchbar";
import type { Metadata } from 'next';
import { Suspense } from 'react';



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
  const { query } = await searchParams;

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

        <div className="flex-1 space-y-10">
          <div className="w-full bg-light-100/10 rounded-full focus-within:bg-light-50 border border-border px-1 md:px-2.5">
            <Searchbar placeholder="quickly search through a collection of properties..." />
          </div>

          <h1 className="text-lg md:text-2xl font-semibold">{query ? `Search: ${query}` : "Explore All Products"}</h1>

          <Suspense key={query} fallback={
            <div className='property-grid'>
              {new Array(12).fill(0).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          }>
            <ProductList query={query} />
          </Suspense>

        </div>
      </div>
    </section>
  );
};

export default ProductListings;
