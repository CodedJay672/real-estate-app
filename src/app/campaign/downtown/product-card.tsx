import config from "@/lib/config";
import { Image } from "@imagekit/next";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  type: string;
  src: string;
  link: string;
  location: string;
}

export default function ProductCard({ title, location, price, type, description, link, src }: ProductCardProps) {
  return (
    <div className="group relative aspect-4/5 overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/40 transition-all">
      {src ? (
        <Image
          src={src}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt={title!}
          loading="lazy"
          sizes="(max-width: 360px) 100%"
          fill
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-10" />
      )}

      <div className="absolute inset-0 bg-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
        <p className="text-yellow-500 text-[10px] uppercase tracking-widest font-bold mb-2">{type}</p>
        <h4 className="text-2xl font-bold tracking-tight mb-1 line-clamp-2 text-ellipsis">{title}</h4>
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
          {location}
        </div>
        <div className="flex justify-between items-end border-t border-white/10 pt-4">
          <div>
            <p className="text-[9px] uppercase text-gray-500 tracking-tighter">Starting From</p>
            <p className="text-xl font-black italic">{price.toLocaleString("en-GB", {
              style: "currency",
              currency: "NGN",
              currencyDisplay: "narrowSymbol",
              notation: "compact"
            })}</p>
          </div>
          <Link
            href={link}
            aria-label={`View ${title}`}
            className="bg-white text-black p-2 rounded-full md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:translate-y-4 md:group-hover:translate-y-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
          </Link>        </div>
      </div>
    </div>
  );
}