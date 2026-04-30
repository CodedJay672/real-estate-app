import { Image } from "@imagekit/next";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import config from "@/lib/config";
import Likes from "@/components/shared/Likes";
import PropertyCategory from "../shared/PropertyCategory";

const PropertyCard = (props: listings & {
  likes: TLikesResponse[];
}) => {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-[0_20px_80px_-50px_rgba(15,23,42,0.18)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-950/95">
      <div className="relative h-72 overflow-hidden bg-slate-100">
        <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
          <span className="rounded-full bg-amber-400/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950">
            {props.listingStatus || "Available"}
          </span>
          <Suspense fallback={<Loader2 size={16} className="animate-spin text-white" />}>
            <PropertyCategory catId={props.categoryId ?? ""} />
          </Suspense>
        </div>

        {props.imageUrl ? (
          <Image
            src={props.imageUrl}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            alt={props.name ?? "Property image"}
            loading="lazy"
            sizes="(max-width: 780px) 100%, (max-width: 1200px) 50%, 25%"
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-slate-300" />
        )}

        <div className="absolute left-4 bottom-4 z-10">
          <Likes productId={props.id!} likes={props.likes} />
        </div>
      </div>

      <Link
        href={`listings/details/${props.slug}`}
        aria-label={`View details for ${props.name}`}
        className="flex flex-col gap-4 px-5 py-6"
      >
        <div className="space-y-2">
          <h2 className="text-base font-semibold tracking-tight text-slate-950 line-clamp-2">
            {props.name}
          </h2>
          <p className="text-sm text-slate-500 line-clamp-1">{props.location}</p>
        </div>

        <p className="min-h-12 text-sm leading-6 text-slate-600 line-clamp-2">
          {props.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/80 text-slate-900">
          <p className="text-lg font-semibold">
            {props.price?.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
              compactDisplay: "short",
              minimumFractionDigits: 0,
            })}
          </p>
          <div className="grid gap-2 text-sm text-slate-500">
            {props.bedrooms ? <span>{props.bedrooms} BR</span> : null}
            {props.bathrooms ? <span>{props.bathrooms} BA</span> : null}
            {props.size ? <span>{props.size} SQM</span> : null}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PropertyCard;
