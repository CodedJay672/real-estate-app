"use client";

import { Session } from "next-auth";
import Image from "next/image";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface cardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  country: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize: number;
  yearBuilt: number;
  listingStatus: string;
  listingDate: string;
  images: string[];
  amenities: string[];
  session: Session | null;
}

const PropertyCard = ({
  id,
  name,
  description,
  price,
  address,
  city,
  state,
  zipCode,
  country,
  propertyType,
  bedrooms,
  bathrooms,
  squareFeet,
  lotSize,
  yearBuilt,
  listingStatus,
  listingDate,
  images,
  amenities,
  session,
}: cardProps) => {
  const router = useRouter();

  const likeProperty = async (id: number) => {
    if (!session?.user) {
      router.push("/auth/sign-in");
    }

    // const res = await addToLikes(id);
  };

  return (
    <article className="w-full shadow-md rounded-lg overflow-hidden bg-subtle-light border border-blue-200">
      <div className="w-full overflow-hidden relative">
        <Image
          src={images[0]}
          alt={name}
          width={800}
          height={500}
          className="object-cover"
        />
        <div className="absolute left-5 bottom-2 bg-blue-200 border border-blue-300 rounded-full size-10 flex justify-center items-center cursor-pointer">
          <CiHeart
            size={24}
            className="text-blue-300"
            onClick={() => likeProperty(id)}
          />
        </div>
      </div>
      <Link href={`/details/${id}`} className="inline-block w-full px-4 py-8">
        <h2 className="text-base font-semibold">{name}</h2>
        <p className="text-base text-gray-400 mt-2 line-clamp-2">
          {description}
        </p>
        <div className="flex justify-between items-center mt-4 gap-4">
          <p className="text-3xl font-semibold">${price.toLocaleString()}</p>
          <p className="text-sm text-gray-400">{`${bedrooms} BR | ${bathrooms} BA | ${squareFeet} Sq Ft`}</p>
        </div>
        <div className="flex items-start flex-wrap mt-4 gap-2">
          {amenities.map((amenity, index) => (
            <span
              key={index}
              className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-lg text-center"
            >
              {amenity}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
};

export default PropertyCard;
