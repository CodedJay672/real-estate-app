import Back from "@/components/shared/Back";
import SearchBar from "@/components/forms/SearchBar";
import { notFound } from "next/navigation";
import {
  MdKingBed,
  MdLocationPin,
  MdOutlineBathtub,
  MdShare,
} from "react-icons/md";
import { getProductById } from "@/lib/actions/auth";
import DisplayImage from "@/components/shared/DisplayImage";
import { RiShape2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/forms/ContactForm";
import { auth } from "@/auth";
import Likes from "@/components/shared/Likes";

const PropertyDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const session = await auth();

  if (!id) return notFound();

  //fetch the property by id
  const property = await getProductById(id);

  if (!property) return notFound();

  return (
    <section className="w-full px-2">
      <div className="w-full flex justify-between items-center py-2 gap-0 lg:gap-96">
        <div className="flex-1 flex gap-2 p-[6px] items-center">
          <Back />
          <SearchBar />
        </div>
        <div className="flex items-center gap-2 p-[6px]">
          <div className="size-8 md:size-10 rounded-full border shadow-md hover:shadow-lg cursor-pointer flex justify-center items-center transition-all">
            <MdShare className="size-4 md:size-6" />
          </div>
          <div className=" rounded-full border shadow-md hover:shadow-lg cursor-pointer flex justify-center items-center transition-all">
            <Likes
              likes={property.data?.[0].likes!}
              session={session}
              productId={id}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="mt-10 p-2 flex-1">
          <div className="w-full mb-2">
            <h1 className="text-2xl font-semibold">
              {property.data?.[0].name}
            </h1>
            <p className="text-sm text-gray-500">
              {property.data?.[0].location} |{" "}
              <span className="text-xs text-gray-400">
                {property.data?.[0].title}
              </span>
            </p>
          </div>
          <div className="w-full relative">
            <DisplayImage
              imageUrl={property?.data?.[0].imageUrl!}
              alt={property?.data?.[0].name!}
            />
          </div>
          <div className="w-full p-2 flex flex-col gap-2">
            <p className="text-sm lg:text-base font-thin border-l-4 border-green-600 px-2">
              {property.data?.[0].propertyType.toUpperCase()} for Sale!!!
            </p>
            <h2 className="text-2xl lg:text-4xl font-semibold">
              {property.data?.[0].price.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
              })}
            </h2>
            <div className="flex items-center space-x-2">
              {Boolean(property.data?.[0].size) ? (
                <p className="flex items-center gap-1 text-sm lg:text-base font-thin">
                  <span className="font-semibold">
                    {property.data?.[0].size} SQM
                  </span>
                  <RiShape2Line size={20} className="text-gray-500" />
                </p>
              ) : (
                <>
                  <p className="flex items-center gap-1 text-sm lg:text-base font-thin">
                    <span className="font-semibold">
                      {property.data?.[0].bedrooms}{" "}
                    </span>
                    <MdKingBed size={20} className="text-gray-500" />
                  </p>
                  <p className="flex gap-1 text-sm lg:text-base font-thin">
                    <span className="font-semibold">
                      {property.data?.[0].bathrooms}{" "}
                    </span>
                    <MdOutlineBathtub size={18} className="text-gray-500" />
                  </p>
                </>
              )}
            </div>
            <div className="flex items-center mb-2">
              <MdLocationPin size={20} className="text-gray-500" />
              <span className="text-sm lg:text-base font-medium">
                {property.data?.[0].location}
              </span>
            </div>
            <h1 className="text-lg lg:text-xl font-semibold">Description</h1>
            <p className="text-sm text-gray-500">
              {property.data?.[0].description}
            </p>
          </div>
          <div className="flex gap-1 mt-4 px-2">
            <Button>Contact Agent</Button>
            <Button className="bg-transparent text-blue-300 border border-blue-300 hover:bg-gray-100">
              Share property
            </Button>
          </div>
        </div>
        <div className="hidden lg:block w-1/3 p-6 border shadow-md rounded-md max-h-max">
          <h2 className="text-lg lg:text-xl font-semibold mb-2">
            Find Out More!!
          </h2>
          <ContactForm className="bg-transparent" />
          <small className="text-xs text-gray-400 italic leading-4">
            By sending this message, you agree that we can send emails, text and
            newsletters to you through the email that you submit in this form.
          </small>
        </div>
      </div>
      <footer className="w-full px-2 py-6 my-10 bg-blue-50">
        <div className="w-full lg:w-1/2 mx-auto p-6 border-none lg:border border-blue-100 rounded-lg">
          <h2 className="text-lg lg:text-xl font-semibold">Contact Realtor</h2>
          <p className="text-sm lg:text-base text-gray-500 font-light p-2">
            Are you interested in this property? Do you want to know more? Send
            us a message today and we will get back to you with all the
            information you need to make the right choce.
          </p>
          <ContactForm className="bg-blue-100" />
          <small className="text-xs text-gray-500 italic leading-4 mt-4 inline-block">
            By sending this message, you agree that we can send emails, text and
            newsletters to you through the email that you submit in this form.
          </small>
        </div>
      </footer>
    </section>
  );
};

export default PropertyDetails;
