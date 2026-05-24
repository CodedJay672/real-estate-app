import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getTopSearchedProperties } from "@/lib/data/search.data";
import ProductCard from "@/app/campaign/downtown/product-card";

export default async function ListingsSlider() {
  const topSearched = await getTopSearchedProperties(1, 6);
  if (!topSearched.success || topSearched.data?.data.length === 0) return null;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Exclusive <span className="text-transparent bg-clip-text bg-linear-to-r from-[#f5c344] to-[#b88f3a]">Listings</span>
            </h2>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-slate-600">
              A carefully curated selection of the market’s most desirable and high-yield investment properties.
            </p>
          </div>
          <Link
            href="/listings"
            className="flex items-center gap-2 text-sm font-bold text-[#b88f3a] hover:text-[#f5c344] transition-colors whitespace-nowrap"
          >
            Explore All Listings <ChevronRight size={18} />
          </Link>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-12 pt-4 hide-scrollbar pl-4 sm:pl-8 md:pl-16 lg:pl-24">
        <div className="flex gap-6 w-max pr-8">
          {topSearched.data?.data.map((property) => (
            <div key={property.id} className="w-[320px] md:w-[380px] shrink-0">
               <ProductCard title={property.name} link={`/listing/details/${property.slug}`} description={property.description ?? ""} location={property.location} price={property.price} src={property.imageUrl ?? ""} type={property.category?.name ?? ""} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
