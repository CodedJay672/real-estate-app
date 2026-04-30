import Link from "next/link";
import PropertyCard from "./PropertyCard";
import { getAllProducts } from "@/lib/data/products.data";
import { SquareArrowOutUpRightIcon } from "lucide-react";

const SpecialOffers = async () => {
  const response = await getAllProducts({});
  if (!response.success) return null;

  const listings = response.data?.data?.slice(0, 8) ?? [];

  return (
    <section className="container mx-auto py-16 md:py-20 xl:py-24 px-4">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-950 md:text-4xl">
              Top <span className="text-amber-400">properties</span> in the market
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Premium homes and investment-ready units selected for value, location and long-term growth.
            </p>
          </div>
          <Link
            href="/listings"
            aria-label="Explore all listings"
            className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-amber-100"
          >
            <SquareArrowOutUpRightIcon size={18} />
            Explore listings
          </Link>
        </div>

        {listings.length > 0 ? (
          <div className="property-grid py-2">
            {listings.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500">No featured properties are available right now.</p>
        )}
      </div>
    </section>
  );
};

export default SpecialOffers;
