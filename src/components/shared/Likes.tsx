"use client";

import { useToast } from "@/hooks/use-toast";
import { likeProduct } from "@/lib/actions/auth";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";

interface LikesProps {
  likes: any;
  productId: string;
  userId: string;
}

const Likes = ({ likes, userId, productId }: LikesProps) => {
  const [isLiking, setIsLiking] = useState(false);
  const { toast } = useToast();

  //debug
  console.log(likes);

  const router = useRouter();
  const hasLiked = likes.find((like: any) => like.userId === userId);

  const handleLikeProperty = async (productId: string) => {
    if (!userId) router.push("/auth/sign-in");

    setIsLiking(true);

    try {
      const response = await likeProduct(userId, productId);

      if (!response.success) {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success!!",
        description: response.message,
      });
    } catch (error) {
      throw new Error(`Error: ${error}`);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <React.Fragment>
      <div className="flex items-center gap-1 bg-subtle-light/90 py-1 px-2 rounded-md">
        {isLiking ? (
          <CgSpinner size={24} className="animate-spin font-semibold" />
        ) : hasLiked ? (
          <FcLike
            size={24}
            className="text-blue-300 fill-blue-300"
            onClick={() => handleLikeProperty(productId)}
          />
        ) : (
          <CiHeart
            size={24}
            className="text-blue-300"
            onClick={() => handleLikeProperty(productId)}
          />
        )}

        {likes && likes.length > 0 && (
          <span className="text-center text-xs text-blue-300">
            {likes && likes?.length / 1000 > 1
              ? `${likes?.length / 1000}k`
              : likes?.length}
          </span>
        )}
      </div>
    </React.Fragment>
  );
};

export default Likes;
