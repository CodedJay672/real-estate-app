import Link from "next/link";
import { SquareArrowOutUpRightIcon } from "lucide-react";

import { getTopSearchedProperties } from "@/lib/data/search.data"
import PropertyCard from "./PropertyCard";

export default async function TopSearchedProperties() {
  const topSearched = await getTopSearchedProperties(1, 4);
  if (!topSearched.success || topSearched.data?.data.length === 0) return null;

  return (
    <section className="container mx-auto  py-16 space-y-16">
      <div className="w-full flex justify-between gap-3">
        <div className="mr-auto space-y-6">
          <h2 className="w-full text-2xl md:text-4xl font-light text-dark-200">
            Top Searched <span className="text-accent-brown">Properties</span>
          </h2>
          <p className="text-sm md:text-base text-dark-50 max-w-xl mx-auto font-medium">
            Discover what people are searching for. Find your next property among the most sought-after listings in your area.
          </p>
        </div>

        <Link href="/top-searches"
          className="text-sm md:text-base h-max font-medium border border-accent-bright rounded-full transition-colors py-2  px-6 hover:bg-accent-bright hover:text-primary flex items-center gap-3">
          <SquareArrowOutUpRightIcon size={18} />
          Explore</Link>
      </div>

      <div className="py-2 property-grid">
        {topSearched.data && topSearched.data.data?.length > 0 ? (
          topSearched.data.data.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))
        ) : (
          <div className="col-span-full">
            <p className="text-blue-100 text-center font-semibold">
              No products available
            </p>
          </div>
        )}
      </div>
    </section >
  )
}
