"use client";

import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IKImage } from "imagekitio-next";
import { listings } from "../table/listings/definition";
import config from "@/lib/config";
import { formatTime } from "@/lib/utils";
import { likeProduct } from "@/lib/actions/auth";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Likes from "../shared/Likes";

interface cardProps extends Partial<listings> {
  bathrooms: number;
  bedrooms: number;
  amenities: string;
  session: Session | null;
}

const PropertyCard = ({
  id,
  name,
  description,
  price,
  location,
  propertyType,
  bedrooms,
  bathrooms,
  size,
  listingStatus,
  imageUrl,
  amenities,
  likes,
  createdAt,
  session,
}: cardProps) => {
  const router = useRouter();
  const [likesArr, setLikesArr] = useState<string[] | undefined>(likes); // likes array
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const { toast } = useToast();

  // update likes array when likes change
  useEffect(() => {
    setLikesArr(likes);
  }, [likes]);

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
    <article className="w-full shadow-md rounded-lg overflow-hidden bg-subtle-light border border-blue-200">
      <div className="w-full min-h-48 overflow-hidden relative">
        <div className="absolute top-0 left-0 p-2 z-10">
          <span className="text-xs bg-green-600 text-subtle-light rounded-lg p-1">
            {listingStatus}
          </span>
          <span className="text-gray-700 text-xs p-1 rounded-md">
            {propertyType}
          </span>
        </div>
        <IKImage
          path={imageUrl}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt={name!}
          fill
          loading="lazy"
          className="object-cover"
        />

        <Likes
          likes={likesArr!}
          userId={session?.user?.id!}
          productId={id!}
          onClick={handleLikeProperty}
          isLiking={isLiking}
          likesCount={likes?.length}
        />
      </div>
      <Link
        href={`listings/details/${id}`}
        className="inline-block w-full px-4 py-8"
      >
        <small className="text-xs text-gray-500 mb-2 inline-block">
          {formatTime(createdAt)}
        </small>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">{name}</h2>
          <p className="text-sm text-gray-400">{location}</p>
        </div>
        <p className="text-sm text-gray-400 mt-2 line-clamp-2">{description}</p>
        <div className="flex items-center mt-4 gap-4">
          <p className="text-xl font-bold">
            {price?.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </p>
          <p className="text-sm text-gray-300">
            {Boolean(bedrooms) && `${bedrooms} BR`}
          </p>
          <p className="text-sm text-gray-300">
            {Boolean(bathrooms) && `${bathrooms} BA`}
          </p>
          <p className="text-sm text-gray-300">
            {Boolean(size) && `${size} SQM`}
          </p>
        </div>
        <div className="flex items-start flex-wrap mt-4 gap-2">
          {amenities.split(",").map((amenity, index) => (
            <span
              key={index}
              className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-lg text-center"
            >
              {amenity.trim()}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
};

export default PropertyCard;
