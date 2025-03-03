"use client";

import { getUserWatchlist } from "@/lib/actions/auth";
import { notFound, useRouter } from "next/navigation";
import WatchlistBanner from "./WatchlistBanner";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

interface IWatchlist {
  id: string;
  fullName: string;
  email: string;
  watchList: {
    id: string;
    propertyId: string;
    userId: string;
  }[];
}

const Watchlist = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const [watchlist, setWatchlist] = useState<IWatchlist | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  if (!session?.user) router.push("/auth/sign-in");

  useEffect(() => {
    const getWatchlist = async () => {
      setIsFetching(true);

      try {
        const watchlist = await getUserWatchlist(session?.user?.id!);

        if (!watchlist) return notFound();

        setWatchlist(watchlist);
      } catch (error) {
        throw new Error(`Error: ${error}`);
      } finally {
        setIsFetching(false);
      }
    };

    getWatchlist();
  }, [session]);

  return (
    <section className="w-full p-2">
      <div className="mt-2 flex flex-col gap-2">
        {isFetching ? (
          <div className="w-full flex-center">
            <CgSpinner size={44} className="animate-spin text-blue-300" />
          </div>
        ) : watchlist && watchlist?.watchList?.length > 0 ? (
          watchlist.watchList.map((watchlist) => (
            <div className="w-full flex" key={watchlist.id}>
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
