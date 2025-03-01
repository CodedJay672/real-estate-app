import { auth } from "@/auth";
import {
  getProductsWithWatchlists,
  getUserWatchlist,
} from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import WatchlistBanner from "../shared/WatchlistBanner";

const Watchlist = async () => {
  const session = await auth();

  if (!session?.user) redirect("/auth/sign-in");

  const watchlist = await getUserWatchlist(session?.user?.id!);

  return (
    <section className="w-full p-2">
      <h1 className="text-base font-bold">Watchlist</h1>

      <div className="mt-2 flex flex-col gap-2">
        {watchlist && watchlist?.watchList?.length > 0 ? (
          watchlist.watchList.map((watchlist) => (
            <div className="w-full flex">
              <WatchlistBanner propertyId={watchlist.propertyId} />
            </div>
          ))
        ) : (
          <div className="flex-1 w-full">
            <span className="text-center font-sm text-gray-400">
              Add products to watch
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Watchlist;
