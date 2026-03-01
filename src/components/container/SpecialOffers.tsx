import { getAllProducts } from "@/lib/actions/auth";
import Link from "next/link";
import PropertyCard from "./PropertyCard";

const SpecialOffers = async () => {
  const response = await getAllProducts();
  if (!response.success) {
    console.log("Errror fetching liked posts");
    return null;
  }

  return (
    <section className="container mx-auto  py-16 md:py-20 xl:py-24 space-y-24">
      <div className="w-full space-y-12">
        <div className="mb-8 space-y-6">

          <h2 className="w-full text-center text-2xl md:text-4xl font-light text-dark-200">
            Top Picks For Your Dream <span className="text-accent-brown">Home</span>
          </h2>
          <p className="text-sm md:text-base text-dark-50 text-center max-w-xl mx-auto font-medium">
            Discover our carefully handpicked selection of the finest properties that match your lifestyle. These top properties are a mix of real estate excellence and peace of mind.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-8">
          {response.data && response.data.length > 0 ? (
            response.data.slice(0, 4).map((property) => (
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

      <div className="w-full space-y-12">
        <div className="flex gap-3">
          <div className="flex-1 space-y-6">
            <h2 className="w-full text-2xl md:text-4xl font-light text-dark-200">Top <span className="text-accent-brown">Properties</span> In The Market</h2>
            <p className="text-sm md:text-base text-dark-50 max-w-xl font-medium">Explore a selectiton of the finest properties available. Handpicked for their exceptional value and growth opportunity. You dream property is just a click away.</p>
          </div>
          <Link
            href="/listings"
            className="text-base h-max font-medium border border-accent-bright rounded-full transition-colors py-2  px-6 mx-auto hover:bg-accent-bright hover:text-primary "
          >
            See more
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-8">
          {response.data && response.data.length > 0 ? (
            response.data.slice(6, 14).map((property) => (
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
