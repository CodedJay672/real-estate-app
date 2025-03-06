import { getLikedProducts, getUserWatchlist } from "@/lib/actions/auth";
import PropertyCard from "./PropertyCard";
import { auth } from "@/auth";

const SpecialOffers = async ({ query }: { query: string }) => {
  const session = await auth();

  if (!session?.user) console.log("No user found");
  let watchlist = null;

  const response = await getLikedProducts(query);

  if (session?.user) {
    watchlist = await getUserWatchlist(session?.user?.id!);
  }

  if (!response) console.log("Errror fetching liked posts");

  return (
    <section className="w-full px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-blue-300">
        Special Offers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-8 md:gap-4">
        {response && response.length > 0 ? (
          response.slice(0, 9).map((property) => (
            //@ts-ignore
            <PropertyCard
              key={property.id}
              {...property}
              session={session}
              watchlist={watchlist?.watchList || []}
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
    </section>
  );
};

export default SpecialOffers;
