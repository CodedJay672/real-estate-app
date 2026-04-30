import { Image } from "@imagekit/next";
import { Bath, BedDouble, MapPin, Waypoints } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import ContactForm from "@/components/forms/ContactForm";
import Back from "@/components/shared/Back";
import config from "@/lib/config";
import { getProductBySlug, getProductDetailsWithLikes } from "@/lib/data/products.data";
import PropertyDetailsActions from "@/components/container/PropertyDetailsActions";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product.success || !product.data) return notFound();

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.data.name,
    description: product.data.description,
    keywords: product.data.tags?.split(","),
    openGraph: {
      images: [product.data.imageUrl ?? "", ...previousImages],
    },
  };
}

const PropertyDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const productDetails = await getProductDetailsWithLikes(slug);
  if (!productDetails.success || !productDetails.data) return null;

  const paragraphs = (productDetails.data.description ?? "").split(/\r?\n/).filter(Boolean);

  return (
    <section className="container mx-auto py-24 px-4 md:px-10">
      <div className="grid gap-10 lg:grid-cols-[1.5fr_0.7fr]">
        <article className="space-y-8 rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950/95">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-sm">
            <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 shadow-sm">
              <Back />
            </div>

            {productDetails.data.imageUrl ? (
              <div className="w-full h-96 relative overflow-hidden">
                <Image
                  urlEndpoint={config.env.imagekit.urlEndpoint}
                  src={productDetails.data.imageUrl}
                  alt={productDetails.data.name ?? "Property image"}
                  sizes="(max-width: 300px) 30em, 100%"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-96" />
            )}

            <p className="absolute bottom-4 left-4 rounded-full bg-slate-950/80 px-4 py-2 text-sm font-semibold text-white">
              {productDetails.data.category?.name?.toUpperCase()}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-3xl font-semibold text-slate-950 sm:text-4xl">
                {productDetails.data.price.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  compactDisplay: "short",
                  maximumFractionDigits: 0,
                })}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {productDetails.data.location} • {productDetails.data.title}
              </p>
            </div>
            <PropertyDetailsActions
              productId={productDetails.data.id ?? ""}
              productLikes={productDetails.data.likes ?? []}
              productShareCount={productDetails.data.sharedCount ?? 0}
              productLink={`/listings/details/${productDetails.data.slug}`}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200/70 bg-slate-50 p-5 text-center dark:border-slate-800 dark:bg-slate-950/80">
              <h3 className="text-sm font-semibold text-slate-900">Bedrooms</h3>
              <p className="mt-3 flex items-center justify-center gap-2 text-2xl font-semibold text-slate-950">
                <BedDouble size={22} className="text-slate-500" />
                {productDetails.data.bedrooms ?? "—"}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200/70 bg-slate-50 p-5 text-center dark:border-slate-800 dark:bg-slate-950/80">
              <h3 className="text-sm font-semibold text-slate-900">Bathrooms</h3>
              <p className="mt-3 flex items-center justify-center gap-2 text-2xl font-semibold text-slate-950">
                <Bath size={22} className="text-slate-500" />
                {productDetails.data.bathrooms ?? "—"}
              </p>
            </div>
            {productDetails.data.size ? (
              <div className="rounded-3xl border border-slate-200/70 bg-slate-50 p-5 text-center dark:border-slate-800 dark:bg-slate-950/80">
                <h3 className="text-sm font-semibold text-slate-900">Area</h3>
                <p className="mt-3 flex items-center justify-center gap-2 text-2xl font-semibold text-slate-950">
                  <Waypoints size={22} className="text-slate-500" />
                  {productDetails.data.size} SQM
                </p>
              </div>
            ) : null}
          </div>

          <div className="space-y-5 text-slate-700 dark:text-slate-200">
            {paragraphs.map((text, idx) => (
              <p key={idx} className="leading-8">
                {text}
              </p>
            ))}
          </div>
        </article>

        <aside className="space-y-6 h-max rounded-[1.5rem] border border-slate-200/70 bg-slate-50 p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950/90">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Schedule a viewing</h2>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Need help with a price review or private tour? Send us your questions and we’ll respond within minutes.
            </p>
          </div>
          <ContactForm propertyName={productDetails.data.name ?? ""} />
        </aside>
      </div>
    </section>
  );
};

export default PropertyDetails;
