"use client";

import { Heart, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { useToast } from "@/hooks/use-toast";
import { likeProduct } from "@/lib/actions/likes.actions";
import { cn, generateErrorMessage } from "@/lib/utils";
import { Button } from "../ui/button";

interface TLikesProps {
  likes: TLikesResponse[];
  productId: string;
  callbackUrl?: string;
}

const Likes = ({ likes, productId, callbackUrl }: TLikesProps) => {
  const { data: session, status } = useSession();
  const [isLiking, startLinking] = useTransition();
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  /// handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // handle session loading
  if (!isMounted || status === "loading") return null;

  const hasLiked = likes.find(like => like.userId === session?.user.id);

  const handleLikeProperty = (productId: string) => {
    if (!session) {
      const url = callbackUrl ? `/sign-in?next=${callbackUrl}` : '/sign-in';
      return router.push(url);
    }

    startLinking(async () => {
      try {
        const response = await likeProduct(session.user?.id, productId);

        if (!response.success) {
          toast({
            title: "Error",
            description: response.message,
            variant: "destructive",
          });
          return
        }

        toast({
          title: "Success!!",
          description: response.message,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: generateErrorMessage(error),
        })
      }
    })
  };



  return (
    <Button type="button" variant="ghost" size="sm"
      onClick={() => handleLikeProperty(productId)}
      className="bg-light-50 rounded-2xl cursor-pointer group hover:bg-rose-50"
    >
      {isLiking ? (
        <Loader2 size={24} className="animate-spin font-semibold" />
      ) : (
        <Heart
          className={cn("size-6 md:size-8 transition-transform transform-3d group-hover:scale-105 text-rose-600", hasLiked ? "fill-red-500" : "fill-light-50")}
        />
      )}
      {likes.length > 0 && (
        <span className="text-center text-xs text-red-500">
          {likes?.length / 1000 > 1
            ? `${likes.length / 1000}k`
            : likes.length}
        </span>
      )}
    </Button>

  );
};

export default Likes;
