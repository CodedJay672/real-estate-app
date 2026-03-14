import { Image } from "@imagekit/next";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import config from "@/lib/config";
import Likes from "@/components/shared/Likes";
import PropertyCategory from "../shared/PropertyCategory";


const PropertyCard = (props: (listings & {
  likes: TLikesResponse[];
})) => {
  return (
    <article className="w-full shadow-md rounded-lg overflow-hidden bg-subtle-light border border-blue-200">
      <div className="w-full min-h-48 overflow-hidden relative">
        <div className="absolute top-1 left-1 z-10 bg-gray-200/75 backdrop-blur-lg rounded-xl flex-center ">
          <span className="text-sm md:text-xs inline-block bg-green-600 text-light-50 rounded-s-lg p-1.5 font-medium">
            {props.listingStatus}
          </span>
          <Suspense fallback={<Loader2 size={14} className="animate-spin" />}>
            <PropertyCategory catId={props.categoryId ?? ""} />
          </Suspense>
        </div>
        {props.imageUrl ? (
          <Image
            src={props.imageUrl}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            alt={props.name!}
            loading="lazy"
            sizes="(max-width: 360px) 100%"
            fill
            className="object-cover"
          />
        ) : (
          <div className="size-full bg-dark-50 rounded-lg" />
        )}

        <div className="absolute left-1 bottom-1">
          <Likes productId={props.id!} likes={props.likes} />
        </div>
      </div>

      <Link
        href={`listings/details/${props.id}`}
        className="flex flex-col w-full px-4 py-8 space-y-4"
      >
        <small className="text-xs text-light-200">Posted: {props.createdAt?.toLocaleDateString("en-UK", {
          dateStyle: "medium",
          hour12: true
        })}</small>
        <div className="space-y-1 mb-4">
          <h2 className="text-2xl lg:text-xl font-semibold line-clamp-2 text-ellipsis">{props.name}</h2>
          <p className="text-sm text-dark-50 line-clamp-2 text-ellipsis">{props.location}</p>
        </div>
        <div className="flex-1">
          <p className="text-base line-clamp-2 text-ellipsis">{props.description}</p>
        </div>
        <div className="flex-between items-center mt-4 gap-4">
          <p className="text-xl md:text-lg font-bold">
            {props.price?.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
              compactDisplay: "short",
              minimumFractionDigits: 0,

            })}
          </p>
          <div className="w-max p-4">
            <p className="text-sm text-gray-600 font-medium">
              {Boolean(props.bedrooms) && `${props.bedrooms} BR`}
            </p>
            <p className="text-sm text-gray-600 font-medium">
              {Boolean(props.bathrooms) && `${props.bathrooms} BA`}
            </p>
            <p className="text-base text-gray-600 font-medium">
              {Boolean(props.size) && `${props.size} SQM`}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PropertyCard;
