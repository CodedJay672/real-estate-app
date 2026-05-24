"use client";

import { useToast } from "@/hooks/use-toast";
import { addToWatchlist } from "@/lib/actions/auth";
import React, { useState } from "react";
import { CgBookmark, CgSpinner } from "react-icons/cg";
import { MdBookmark } from "react-icons/md";

const AddToWishlist = ({
  userId,
  productId,
  watchlist,
}: {
  userId: string;
  productId: string;
  watchlist: {
    id: string;
    userId: string;
    propertyId: string;
  }[];
}) => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const hasAddedToWatchlist = watchlist.find(
    (item) => item.propertyId === productId
  );

  const addProductToWishlist = async (userId: string, productId: string) => {
    setIsAdding(true);
    try {
      const response = await addToWatchlist(productId, userId);

      if (!response.success) {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: response.message,
      });
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <div className="size-full">
      {isAdding ? (
        <CgSpinner size={24} className="animate-spin" />
      ) : hasAddedToWatchlist ? (
        <MdBookmark
          size={16}
          className="fill-blue-300"
          onClick={() => addProductToWishlist(userId, productId)}
        />
      ) : (
        <CgBookmark
          size={20}
          onClick={() => addProductToWishlist(userId, productId)}
        />
      )}
    </div>
  );
};

export default AddToWishlist;
