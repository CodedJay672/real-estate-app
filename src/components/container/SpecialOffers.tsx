import Link from "next/link";
import PropertyCard from "./PropertyCard";
import { getAllProducts } from "@/lib/data/products.data";
import { SquareArrowOutUpRightIcon } from "lucide-react";

const SpecialOffers = async () => {
  const response = await getAllProducts({});
  if (!response.success) {
    console.log("Errror fetching liked posts");
    return null;
  }

  return (
    <section className="container mx-auto  py-16 md:py-20 xl:py-24 space-y-24">
      <div className="w-full space-y-12 p-2.5">
        <div className="w-full space-y-6">
          <div className="w-full flex gap-2">
            <h2 className="w-full text-2xl md:text-4xl font-light text-dark-200">Top <span className="text-accent-brown">Properties</span> In The Market</h2>
            <Link
              href="/listings"
              aria-label="Explore listings"
              className="text-sm md:text-base h-max font-medium border border-accent-bright rounded-full transition-colors py-2 px-6 mx-auto hover:bg-accent-bright hover:text-primary flex-center gap-1"
            >
              <SquareArrowOutUpRightIcon size={18} />
              <span className="hidden md:inline">
                Explore
              </span>
            </Link>
          </div>

          <p className="text-sm md:text-base text-dark-50 max-w-xl text-center md:text-left font-medium">Explore a selection of the finest properties available. Handpicked for their exceptional value and growth opportunity. Your dream property is just a click away.</p>
        </div>

        <div className="property-grid py-2">
          {response.data && response.data.data?.length > 0 ? (
            response.data.data?.slice(6, 14).map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
              />
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
    </section>
  );
};

export default SpecialOffers;
