import { Image } from "@imagekit/next";
import { Bath, BedDouble, MapPin, Waypoints } from "lucide-react";
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from "next/navigation";

import ContactForm from "@/components/forms/ContactForm";
import Back from "@/components/shared/Back";
import config from "@/lib/config";
import { getProductBySlug, getProductDetailsWithLikes } from "@/lib/data/products.data";
import PropertyDetailsActions from "@/components/container/PropertyDetailsActions";


type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = await params

  // fetch data
  const product = await getProductBySlug(slug);
  if (!product.success || !product.data) return notFound();

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.data.name,
    description: product.data.tags,
    openGraph: {
      images: [product.data.imageUrl ?? "", ...previousImages],
    },
  }
}

const PropertyDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  //fetch the property by id
  const productDetails = await getProductDetailsWithLikes(slug);
  if (!productDetails.success) return null;

  // format product description
  const para = (productDetails.data?.description ?? "").split(/\r?\n/).filter(Boolean);

  return (
    <section className="container mx-auto py-28 px-4 md:px-10 flex flex-col md:flex-row gap-20 md:gap-10">
      <div className="flex-1 space-y-6">

        <div className="w-full h-96 overflow-hidden bg-light-100 rounded-xl relative">
          <div className="bg-light-50 rounded-full absolute top-2 left-2 flex-center z-1">
            <Back />
          </div>

          {productDetails.data?.imageUrl && (
            <Image
              urlEndpoint={config.env.imagekit.urlEndpoint}
              src={productDetails.data?.imageUrl!}
              alt={productDetails.data?.name ?? ""}
              sizes="(max-width: 300px) 30em, 100%"
              fill
              priority
              className="object-cover"
            />
          )}

          <p className="text-base md:text-lg text-light-50 font-bold capitalize absolute bottom-2 left-2 px-3 py-1 bg-dark-200/20 rounded-full">
            {productDetails.data?.category?.name.toUpperCase()}
          </p>
        </div>

        <div className="w-full flex-between">
          <p className="text-3xl lg:text-5xl font-semibold">
            {productDetails.data?.price.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
              compactDisplay: "short",
              maximumFractionDigits: 0
            })}
          </p>
          <PropertyDetailsActions productId={productDetails.data?.id ?? ''} productLikes={productDetails.data?.likes ?? []} productShareCount={productDetails.data?.sharedCount ?? 0} productShareLink={`${config.env.prodEndpoint}listings/details/${productDetails.data?.id}`} />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-base md:text-lg font-bold">
            {productDetails.data?.name}
          </h1>
          <p className="text-base md:text-lg text-dark-200 flex items-center gap-1">
            <MapPin className="size-4 md:size-5" />
            {productDetails.data?.location} |{" "}
            <span className="text-sm md:text-base text-dark-50">
              {productDetails.data?.title}
            </span>
          </p>
        </div>

        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-44 border border-border rounded-lg p-3 flex justify-between flex-col gap-5">
              <h3 className="text-sm md:text-xs text-dark-200 font-semibold">Bedrooms</h3>
              <p className="text-nowrap text-base flex items-center gap-1">
                <BedDouble size={24} className="text-gray-500" />
                {productDetails.data?.bedrooms}
              </p>
            </div>

            <div className="w-44 border border-border rounded-lg p-3 flex justify-between flex-col gap-5">
              <h3 className="text-sm md:text-xs text-dark-200 font-semibold">Bathrooms</h3>
              <p className="text-nowrap text-base flex items-center gap-1">
                <Bath size={24} className="text-gray-500" />
                {productDetails.data?.bathrooms}
              </p>
            </div>

            {productDetails.data?.size ? (
              <div className="w-44 border border-border rounded-lg p-3 flex justify-between flex-col gap-5">
                <h3 className="text-sm md:text-xs text-dark-200 font-semibold">Area SQFT</h3>
                <p className="text-nowrap text-base flex items-center gap-1">
                  <Waypoints size={24} className="text-gray-500" />
                  {productDetails.data?.size} SQM
                </p>
              </div>
            ) : null}
          </div>

          {para.map((text: string, idx: number) => (
            <p key={idx} className="text-base  text-dark-200">
              {text}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/4 h-max rounded-lg border border-border p-4 bg-light-100/10 md:sticky top-24 right-0">
        <div className="space-y-1.5 mb-4">
          <h2 className="text-lg lg:text-xl font-semibold">
            Find Out More!!
          </h2>
          <p className="text-sm text-seconday-light-50">For enquiries and questions, please provide your detials and leave your questions. We will get back to you in approximately 2 minutes</p>
        </div>
        <ContactForm propertyName={productDetails.data?.name ?? ""} />
      </div>
    </section >
  );
};

export default PropertyDetails;
