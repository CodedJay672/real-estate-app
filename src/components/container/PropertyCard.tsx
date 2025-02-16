"use client";

import { Session } from "next-auth";
import Image from "next/image";
import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IKImage } from "imagekitio-next";
import { RiHeart2Fill } from "react-icons/ri";

interface cardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  createdAt: Date;
  status: string;
  imageUrl: string;
  amenities: string;
  likes: string[];
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
  status,
  createdAt,
  imageUrl,
  amenities,
  likes,
  session,
}: cardProps) => {
  const router = useRouter();
  const [totalLikes, setTotalLikes] = useState(0);

  const handleLikeProperty = async (id: number) => {
    if (!session?.user) {
      router.push("/auth/sign-in");
    }

    //check if the user has already liked the property
    //if yes, remove the like
    //if no, add the like
  };

  return (
    <article className="w-full shadow-md rounded-lg overflow-hidden bg-subtle-light border border-blue-200">
      <div className="w-full overflow-hidden relative">
        <Image
          src={imageUrl}
          alt={name}
          width={600}
          height={400}
          className="object-cover"
        />

        <div className="absolute left-5 bottom-2 bg-blue-200 border border-blue-300 rounded-full size-10 flex justify-center items-center cursor-pointer">
          {likes.length > 0 ? (
            <RiHeart2Fill
              size={24}
              className="text-blue-300 fill-blue-300"
              onClick={() => handleLikeProperty(id)}
            />
          ) : (
            <CiHeart
              size={24}
              className="text-blue-300"
              onClick={() => handleLikeProperty(id)}
            />
          )}
        </div>
      </div>
      <Link href={`/details/${id}`} className="inline-block w-full px-4 py-8">
        <h2 className="text-sm font-semibold">{name}</h2>
        <p className="text-sm text-gray-400 mt-2 line-clamp-2">{description}</p>
        <div className="flex items-center mt-4 gap-4">
          <p className="text-xl font-bold">
            {price.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </p>
          <p className="text-sm text-gray-300">{`${bedrooms ?? "N/A"} BR | ${
            bathrooms ?? "N/A"
          } BA | ${size ?? "N/A"} Sqm`}</p>
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
