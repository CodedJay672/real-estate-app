import Link from "next/link";
import { SquareArrowOutUpRightIcon } from "lucide-react";

import { getTopSearchedProperties } from "@/lib/data/search.data"
import PropertyCard from "./PropertyCard";

export default async function TopSearchedProperties() {
  const topSearched = await getTopSearchedProperties(1, 4);
  if (!topSearched.success || topSearched.data?.data.length === 0) return null;

  return (
    <section className="container mx-auto  py-16 md:py-20 xl:py-24 space-y-24">
      <div className="w-full space-y-12 p-2.5">
        <div className="w-full space-y-6">
          <div className="flex justify-between gap-1 w-full">
            <h2 className="w-full text-2xl md:text-4xl font-light text-dark-200">
              Top Searched <span className="text-accent-brown">Properties</span>
            </h2>
            <Link href="/top-searches"
              className="text-sm md:text-base h-max font-medium border border-accent-bright rounded-full transition-colors py-2 px-6 hover:bg-accent-bright hover:text-primary flex items-center gap-3"
              aria-label="Explore top searches">
              <SquareArrowOutUpRightIcon size={18} />
              <span className="hidden md:inline">
                Explore
              </span>
            </Link>
          </div>
          <p className="text-sm md:text-base text-dark-50 max-w-xl text-center md:text-left font-medium">
            Discover what people are searching for. Find your next property among the most sought-after listings in your area.
          </p>

        </div>

        <div className="property-grid py-2">
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
      </div>
    </section >
  )
}
