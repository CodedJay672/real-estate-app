import { getLikedProducts, getUserWatchlist } from "@/lib/actions/auth";
import PropertyCard from "./PropertyCard";
import { auth } from "@/auth";
import Link from "next/link";

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
    <section className="container mx-auto  py-16 md:py-20 xl:py-24">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-blue-300">
        Special Offers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-8">
        {response && response.length > 0 ? (
          response.slice(0, 13).map((property) => (
            //@ts-ignore
            <PropertyCard
              key={property.id}
              session={session}
              watchlist={watchlist?.watchList || []}
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

      <div className="w-full flex-center mt-20 ">
        <Link
          href="/listings"
          className="text-base  font-medium border rounded-lg py-2  px-6"
        >
          See more
        </Link>
      </div>
    </section>
  );
};

export default SpecialOffers;
