import { Suspense } from "react";
import { Search } from "lucide-react";


import ProductList from "@/components/container/ProductList";
import PropertyCardSkeleton from "@/components/container/PropertyCardSkeleton";
import Searchbar from "@/components/shared/Searchbar";
import { getAllCategories } from "@/lib/data/category.data";


async function SearchResultsPage({ searchParams }: { searchParams: Promise<TFilterQuery> }) {
  const { baths, beds, category, price } = await searchParams;
  const categories = getAllCategories();

  return (
    <section className="w-full p-2 py-24 md:p-10 md:py-24 space-y-10">
      <Suspense>
        <Searchbar getCategories={categories} />
      </Suspense>
      {baths || beds || category || price ? (
        <div className="container mx-auto">
          <h1 className="text-xl md:text-2xl mb-4">Filter by: {
            Object.entries({ baths, beds, category, price }).map(([key, val]) => (
              val && (
                <span key={key} className="text-sm md:text-base text-green-500 px-1.5 rounded-full font-semibold bg-green-50">{key}: {val}, </span>
              ))
            )
          }</h1>
          <hr className="border-border" />

          <Suspense key={JSON.stringify({ baths, beds, category, price })} fallback={
            <div className='property-grid'>
              {new Array(12).fill(0).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          }>
            <ProductList query={{ baths, beds, category, price }} />
          </Suspense>
        </div>
      ) : (
        <div className="w-full h-screen flex-center">
          <Search className="size-52 text-light-100 mx-auto" />
          <h1 className="text-lg md:text-xl text-center font-bold">Search from over 1000+ properties</h1>
        </div>
      )}
    </section>
  )
}

export default SearchResultsPage