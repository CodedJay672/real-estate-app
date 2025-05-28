"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { IKImage } from "imagekitio-next";
import { listings } from "../table/listings/definition";
import config from "@/lib/config";
import { formatTime } from "@/lib/utils";
import Likes from "../shared/Likes";
import AddToWishlist from "../shared/AddToWishlist";

interface cardProps extends Partial<listings> {
  bathrooms: number | null;
  bedrooms: number | null;
  session: Session | null;
  likes: any;
  watchlist: {
    id: string;
    propertyId: string;
    userId: string;
  }[];
}

const PropertyCard = ({
  id,
  name,
  description,
  price,
  location,
  type,
  bedrooms,
  bathrooms,
  size,
  listingStatus,
  imageUrl,
  createdAt,
  likes,
  watchlist,
  session,
}: cardProps) => {
  return (
    <article className="w-full shadow-md rounded-lg overflow-hidden bg-subtle-light border border-blue-200">
      <div className="w-full min-h-48 overflow-hidden relative">
        <div className="absolute top-1 left-1 p-1 z-10 bg-gray-200/75 backdrop-blur-lg rounded-xl flex-center ">
          <span className="text-sm lg:text-xs inline-block bg-green-600 text-subtle-light rounded-lg py-1 px-3 font-medium">
            {listingStatus}
          </span>
          <span className="text-gray-700 text-sm font-medium inline-block p-1 rounded-md capitalize ml-1 mr-2">
            {type}
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

        <div className="absolute left-4 bottom-1 rounded-full size-10 flex justify-center items-center cursor-pointer">
          <Likes likes={likes!} userId={session?.user?.id!} productId={id!} />
        </div>
        <div className="absolute right-4 bottom-1 rounded-full flex justify-center items-center cursor-pointer bg-subtle-light p-2">
          <AddToWishlist
            userId={session?.user?.id!}
            productId={id!}
            watchlist={watchlist}
          />
        </div>
      </div>
      <Link
        href={`listings/details/${id}`}
        className="flex flex-col w-full px-4 py-8 space-y-4"
      >
        <small className="text-sm text-gray-500">{formatTime(createdAt)}</small>
        <div className="space-y-1 mb-4">
          <h2 className="text-2xl lg:text-xl font-semibold">{name}</h2>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
        <div className="flex-1">
          <p className="text-base line-clamp-2">{description}</p>
        </div>
        <div className="flex-between items-center mt-4 gap-4">
          <p className="text-xl md:text-lg font-bold">
            {price?.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </p>
          <div className="w-max p-4">
            <p className="text-sm text-gray-600 font-medium">
              {Boolean(bedrooms) && `${bedrooms} BR`}
            </p>
            <p className="text-sm text-gray-600 font-medium">
              {Boolean(bathrooms) && `${bathrooms} BA`}
            </p>
            <p className="text-base text-gray-600 font-medium">
              {Boolean(size) && `${size} SQM`}
            </p>
          </div>
        </div>
        {/* <div className="flex items-start flex-wrap mt-4 gap-2">
          {amenities.split(",").map((amenity, index) => (
            <span
              key={index}
              className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-lg text-center"
            >
              {amenity.trim()}
            </span>
          ))}
        </div> */}
      </Link>
    </article>
  );
};

export default PropertyCard;
