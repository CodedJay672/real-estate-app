"use client";

import { Session } from "next-auth";
import Image from "next/image";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { useRouter } from "next/navigation";

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
        <div className="absolute left-5 bottom-2 bg-blue-300 rounded-full w-12 h-12 flex justify-center items-center cursor-pointer">
          <CiHeart size={24} color="white" onClick={() => likeProperty(id)} />
        </div>
      </div>
      <div className="w-full px-4 py-8">
        <h2 className="text-base font-semibold">{name}</h2>
        <p className="text-base text-gray-400 mt-2">{description}</p>
        <div className="flex justify-between items-center mt-4 gap-4">
          <p className="text-3xl font-semibold">${price.toLocaleString()}</p>
          <p className="text-sm text-gray-400">{`${bedrooms} BR | ${bathrooms} BA | ${squareFeet} Sq Ft`}</p>
        </div>
        <div className="flex justify-between items-center mt-4 gap-4">
          <p className="text-sm text-gray-400">{`${address}, ${city}, ${state} ${zipCode}, ${country}`}</p>
          <p className="text-sm text-gray-400">{`${propertyType} | Built in ${yearBuilt}`}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-400">{`Lot Size: ${lotSize} acres`}</p>
          <p className="text-sm text-gray-400">{`Listed on ${listingDate}`}</p>
        </div>
        <div className="flex justify-between items-start mt-4 gap-2">
          <p className="text-sm text-gray-500">{`Status: ${listingStatus}`}</p>
          <div className="grid grid-cols-2 gap-2">
            {amenities.map((amenity, index) => (
              <span
                key={index}
                className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-lg text-center"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
