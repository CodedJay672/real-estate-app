import { Suspense } from "react";
import { Search } from "lucide-react";


import ProductList from "@/components/container/ProductList";
import PropertyCardSkeleton from "@/components/container/PropertyCardSkeleton";
import Searchbar from "@/components/shared/Searchbar";
import { getAllCategories } from "@/lib/data/category.data";


async function SearchResultsPage({ searchParams }: { searchParams: Promise<TFilterQuery> }) {
  const query = await searchParams;
  const categories = getAllCategories();

  return (
    <section className="w-full p-2 py-24 md:p-10 md:py-24 space-y-10">
      <Suspense>
        <Searchbar getCategories={categories} />
      </Suspense>
      <div className="container mx-auto p-2">
        <Suspense key={JSON.stringify(query)} fallback={
          <div className='property-grid'>
            {new Array(12).fill(0).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        }>
          <ProductList query={query} defaultPageSize={24} />
        </Suspense>
      </div>
    </section>
  )
}

export default SearchResultsPage