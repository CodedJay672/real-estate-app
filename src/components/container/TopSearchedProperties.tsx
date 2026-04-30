import Link from "next/link";
import { SquareArrowOutUpRightIcon } from "lucide-react";

import { getTopSearchedProperties } from "@/lib/data/search.data";
import PropertyCard from "./PropertyCard";

export default async function TopSearchedProperties() {
  const topSearched = await getTopSearchedProperties(1, 4);
  if (!topSearched.success || topSearched.data?.data.length === 0) return null;

  return (
    <section className="container mx-auto py-16 md:py-20 xl:py-24 px-4">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-950 md:text-4xl">
              Top searched <span className="text-amber-400">properties</span>
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Discover what people are searching for and explore a tailored selection of the market’s most desirable homes.
            </p>
          </div>
          <Link
            href="/top-searches"
            className="inline-flex items-center gap-2 rounded-full border border-amber-300 px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-amber-100"
            aria-label="Explore top searches"
          >
            <SquareArrowOutUpRightIcon size={18} />
            Explore
          </Link>
        </div>

        <div className="property-grid py-2">
          {topSearched.data.data.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
}
