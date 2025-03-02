"use client";

import { useToast } from "@/hooks/use-toast";
import { getProductById, removeFromWatchlist } from "@/lib/actions/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { CgRemove, CgSpinner } from "react-icons/cg";

const WatchlistBanner = ({ propertyId }: { propertyId: string }) => {
  const [watchlistProducts, setWatchlistProducts] = useState<any[] | null>(
    null
  );
  const [isRemoving, setIsRemoving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getWatchlistProducts = async () => {
      try {
        const product = await getProductById(propertyId);

        if (!product.success) return notFound();

        setWatchlistProducts(product?.data!);
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    };

    getWatchlistProducts();
  }, []);

  const handleRemoveFromWatchlist = async (propertyId: string) => {
    setIsRemoving(true);
    try {
      const response = await removeFromWatchlist(propertyId);

      if (!response.success) {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "success",
        description: response.message,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <article className="w-full p-1 flex-between">
      <div className="flex-1 bg-gray-50 hover:bg-gray-100 group p-2 rounded-md transition-all">
        <Link href={`/listings/details/${propertyId}`}>
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-gray-800 text-base font-semibold truncate">
              {watchlistProducts?.[0].name}
            </h1>
            <p className="text-gray-400 text-sm font-thin truncate">
              {watchlistProducts?.[0].title}
            </p>
          </div>
        </Link>
      </div>
      {isRemoving ? (
        <div className="size-16 flex-center p-2 cursor-pointer">
          <CgSpinner size={24} className="animate-spin" />
        </div>
      ) : (
        <div
          className="size-16 flex-center p-2 cursor-pointer"
          onClick={() => handleRemoveFromWatchlist(propertyId)}
        >
          <CgRemove size={24} color="red" />
        </div>
      )}
    </article>
  );
};

export default WatchlistBanner;
