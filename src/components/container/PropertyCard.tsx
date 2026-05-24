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
      <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100 group">
        <Link href={`listings/details/${props.slug}`} className="absolute inset-0 z-0">
          <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2 pointer-events-none">
            <span className="rounded-full bg-linear-to-r from-[#f5c344] to-[#b88f3a] px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#0f172a] shadow-sm">
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
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-slate-200" />
          )}
        </Link>
        <div className="absolute left-4 bottom-4 z-10">
          <Likes productId={props.id!} likes={props.likes} />
        </div>
      </div>

      <div className="flex flex-col gap-3 px-5 py-5">
        <Link href={`listings/details/${props.slug}`} aria-label={`View details for ${props.name}`} className="space-y-1 block group/link">
          <h2 className="text-base font-semibold tracking-tight text-slate-950 line-clamp-2 group-hover/link:text-amber-500 transition-colors">
            {props.name}
          </h2>
          <p className="text-sm text-slate-500 line-clamp-1">{props.location}</p>
        </Link>

        <p className="min-h-[40px] text-sm leading-relaxed text-slate-600 line-clamp-2">
          {props.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200/80 text-slate-900 mt-1">
          <p className="text-lg font-bold text-slate-900">
            {props.price?.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
              compactDisplay: "short",
              minimumFractionDigits: 0,
            })}
          </p>
          <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
            {props.bedrooms ? <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#f5c344]"></span>{props.bedrooms} Bed</span> : null}
            {props.bathrooms ? <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>{props.bathrooms} Bath</span> : null}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <a
            href={`https://wa.link/a0m76f`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg bg-[#25D366] hover:bg-[#1ebe57] py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all"
          >
            WhatsApp
          </a>
          <Link
            href={`listings/details/${props.slug}`}
            className="flex-1 rounded-lg bg-slate-950 hover:bg-slate-800 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
