"use client";

import { useEffect, useMemo } from "react";
import { CgSpinner } from "react-icons/cg";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";

interface LikesProps {
  likes: string[];
  userId: string;
  productId: string;
  onClick: (productId: string) => void;
  isLiking: boolean;
  likesCount?: number;
}

const Likes = ({
  likes,
  userId,
  productId,
  onClick,
  isLiking,
  likesCount,
}: LikesProps) => {
  useEffect(() => {
    console.log(likes.length);
  }, []);

  return (
    <div className="absolute left-4 bottom-1 rounded-full size-10 flex justify-center items-center cursor-pointer">
      {likes && likes.length > 0 ? (
        <div className="flex items-center gap-1 bg-subtle-light/90 py-1 px-2 rounded-md">
          {isLiking ? (
            <CgSpinner size={24} className="animate-spin font-semibold" />
          ) : likes.includes(userId!) ? (
            <FcLike
              size={24}
              className="text-blue-300 fill-blue-300"
              onClick={() => onClick(productId)}
            />
          ) : (
            <CiHeart
              size={24}
              className="text-blue-300"
              onClick={() => onClick(productId)}
            />
          )}

          <span className="text-center text-xs text-blue-300">
            {likesCount}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-1 bg-subtle-light/90 py-1 px-2 rounded-md">
          <CiHeart
            size={24}
            className="text-blue-300"
            onClick={() => onClick(productId)}
          />
        </div>
      )}
    </div>
  );
};

export default Likes;
