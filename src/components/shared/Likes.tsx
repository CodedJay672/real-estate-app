"use client";

import { useToast } from "@/hooks/use-toast";
import { likeProduct } from "@/lib/actions/auth";
import { cn, generateErrorMessage } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState, useTransition } from "react";
import { CgSpinner } from "react-icons/cg";
import { Button } from "../ui/button";

interface TLikesProps {
  getLikes: Promise<ApiResponse<{
    id: string;
    userId: string;
    productId: string | null;
    createdAt: Date;
  }[]>>;
  productId: string;
}

const Likes = ({ getLikes, productId }: TLikesProps) => {
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

  const productLikes = use(getLikes);
  if (!productLikes.success) {
    console.log(productLikes.message)
    return;
  }

  const hasLiked = productLikes.data?.find(like => like.userId === session?.user.id);

  const handleLikeProperty = (productId: string) => {
    if (!session) return router.push("/sign-in");

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

    <Button type="button" variant="ghost" size="icon"
      onClick={() => handleLikeProperty(productId)}
      className="p-0.5 bg-light-50 rounded-full cursor-pointer group hover:bg-rose-50"
    >
      {isLiking ? (
        <CgSpinner size={24} className="animate-spin font-semibold" />
      ) : (
        <Heart
          className={cn("size-6 md:size-8 transition-transform transform-3d group-hover:scale-105 text-rose-600", hasLiked ? "fill-red-500" : "fill-light-50")}
        />
      )}
      {productLikes.data && productLikes.data.length > 0 && (
        <span className="text-center text-xs text-blue-300">
          {productLikes.data?.length / 1000 > 1
            ? `${productLikes.data?.length / 1000}k`
            : productLikes.data?.length}
        </span>
      )}
    </Button>

  );
};

export default Likes;
