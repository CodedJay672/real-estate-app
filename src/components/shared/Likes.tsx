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
  likes: string[];
  productId: string;
  session: Session | null;
}

const Likes = ({ likes, productId, session }: LikesProps) => {
  const router = useRouter();
  const [likesArr, setLikesArr] = useState<string[] | undefined>(likes); // likes array
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const { toast } = useToast();

  const handleLikeProperty = async (id: string) => {
    if (!session?.user) {
      router.push("/auth/sign-in");
    }

    setIsLiking(true);

    try {
      const res = await likeProduct(session?.user?.id!, id);

      if (!res.success) {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
        return false;
      }

      setLikesArr([...res?.data?.[0].likes!]);
      toast({
        title: "Success",
        description: res.message,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occured while liking property",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLiking(false);
    }
  };
  return (
    <React.Fragment>
      {likes && likes.length > 0 ? (
        <div className="flex items-center gap-1 bg-subtle-light/90 py-1 px-2 rounded-md">
          {isLiking ? (
            <CgSpinner size={24} className="animate-spin font-semibold" />
          ) : likesArr?.includes(session?.user?.id!) ? (
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

          <span className="text-center text-xs text-blue-300">
            {likesArr && likesArr?.length / 1000 > 1
              ? `${likesArr?.length / 1000}k`
              : likesArr?.length}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-1 bg-subtle-light/90 py-1 px-2 rounded-md">
          <CiHeart
            size={24}
            className="text-blue-300"
            onClick={() => handleLikeProperty(productId)}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Likes;
