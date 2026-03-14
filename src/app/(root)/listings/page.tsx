import type { Metadata } from 'next';
import { Suspense } from 'react';


import GroupFilter from '@/components/container/GroupFilter';
import { getAllCategories } from '@/lib/data/category.data';
import ProductList from '@/components/container/ProductList';
import PropertyCardSkeleton from '@/components/container/PropertyCardSkeleton';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import MobileFilter from '@/components/shared/MobileFilter';



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
  searchParams: Promise<TFilterQuery>;
}) => {
  const query = await searchParams;
  const categories = getAllCategories();

  return (
    <section className="w-full py-20">
      <div className="container flex gap-4 md:gap-8 mx-auto p-2 md:p-4">
        <div className="hidden md:block h-max w-full md:w-1/4 sticky top-10 left-0 space-y-10">
          <div>
            <h1 className="text-lg font-semibold">Filter searches</h1>
            <p className='text-sm text-dark-50'>Find properties faster with filters.</p>
          </div>
          <div className="p-2 bg-light-100/10 rounded-xl border border-border">
            <Suspense fallback={<LoadingSpinner />}>
              <GroupFilter getCategories={categories} />
            </Suspense>
          </div>

        </div>

        <div className="flex-1 space-y-4">
          <div className='flex-between gap-2'>
            <div>
              <h1 className="text-lg md:text-2xl font-semibold">Explore All Products</h1>
              <p className='text-sm text-dark-50 md:hidden'>Find properties faster with filters</p>
            </div>

            <div className='flex md:hidden bg-light-100/30 border border-border rounded-lg p-2'>
              <MobileFilter categories={categories} />
            </div>
          </div>

          <Suspense key={JSON.stringify(query)} fallback={
            <div className='property-grid'>
              {new Array(12).fill(0).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          }>
            <ProductList
              query={{
                ...query,
                postedOn: query.postedOn ? new Date(query.postedOn as any) : null,
              }}
              defaultPageSize={query.pageSize ?? 25}
            />
          </Suspense>

        </div>
      </div>
    </section>
  );
};

export default ProductListings;
