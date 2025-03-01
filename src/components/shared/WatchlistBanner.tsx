import { getProductById } from "@/lib/actions/auth";
import Link from "next/link";
import { notFound } from "next/navigation";

const WatchlistBanner = async ({ propertyId }: { propertyId: string }) => {
  const product = await getProductById(propertyId);

  if (!product.success) return notFound();

  const { data } = product;

  return (
    <article className="w-full p-1 h-10">
      <Link href={`/listings/details/${propertyId}`} className="flex gap-[6px]">
        <h1 className="text-base font-semibold">{data?.[0].name}</h1>
      </Link>
    </article>
  );
};

export default WatchlistBanner;
