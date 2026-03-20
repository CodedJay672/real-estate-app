import type { Metadata } from 'next';

import PropertyCard from "@/components/container/PropertyCard";
import PaginationBar from "@/components/shared/paginationBar";
import { getTopSearchedProperties } from "@/lib/data/search.data";


export const metadata: Metadata = {
  title: 'Top searches',
  description: "Discover properties tailored to your preferences with advanced filtering options"
};


export default async function TopSearchesPage() {
  const topSearched = await getTopSearchedProperties();
  if (!topSearched.success || topSearched.data?.data.length === 0) return null;

  return (
    <section className='wrapper'>
      <div className="w-full max-w-xl text-center pt-20 md:pt-24 mx-auto">
        <h1 className="text-2xl text-dark-200 font-semibold">Top searched properties</h1>
        <p className="text-sm md:text-base text-dark-50 font-medium">Discover properties tailored to your preferences with advanced filtering options across location, budget, bedrooms, bathrooms, and more.</p>
      </div>

      <div className="w-full property-grid">
        {topSearched.data?.data.map(property => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>

      <div className="w-full mb-24">
        <PaginationBar defaultPageSize={topSearched.data?.pageSize ?? 25} totalRows={topSearched.data?.totalRows ?? 1} />
      </div>
    </section>
  )
}
