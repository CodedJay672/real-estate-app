import { Suspense } from "react";
import { Search } from "lucide-react";


import ProductList from "@/components/container/ProductList";
import PropertyCardSkeleton from "@/components/container/PropertyCardSkeleton";
import Searchbar from "@/components/shared/Searchbar";


async function SearchResultsPage({ searchParams }: { searchParams: { query: string } }) {
  const { query } = await searchParams;


  return (
    <section className="w-full p-2 py-24 md:p-10 md:py-24 space-y-10">
      <div className="w-full max-w-3xl bg-light-100/10 rounded-full focus-within:bg-light-50 border border-border px-1 md:px-2.5 mx-auto">
        <Searchbar placeholder="quickly search through a collection of properties..." />
      </div>
      {query ? (
        <div className="container mx-auto">
          <h1 className="text-xl md:text-2xl font-bold mb-4">Search Results for "{query}"</h1>
          <hr className="border-border" />

          <Suspense key={query} fallback={
            <div className='flex gap-3 flex-wrap'>
              {new Array(12).fill(0).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          }>
            <ProductList query={query} />
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