"use client";

import config from "@/lib/config";
import Link from "next/link";
import { useState } from "react";
import { RiCloseLine, RiMore2Line } from "react-icons/ri";
import { useToast } from "@/hooks/use-toast";
import { deleteProduct } from "@/lib/actions/auth";
import CustomAlertDialog from "../shared/CustomAlertDialog";
import { Image } from "@imagekit/next";
import { Button } from "../ui/button";
import { MapPin, MoreVertical } from "lucide-react";

const AdminListing = ({
  name,
  title,
  location,
  price,
  imageUrl,
  id,
  updatedAt
}: {
  title: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
  id: string;
  updatedAt?: Date;
}) => {
  const [showActions, setShowActions] = useState(false);
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteProperty = async (id: string) => {
    try {
      const response = await deleteProduct(id);

      if (!response.success) {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: response.message,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `An error occurred: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <article className="w-full lg:max-w-(--breakpoint-md) flex relative">
      <div className="size-32 bg-light-100 rounded-xl overflow-hidden relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            alt={name}
            sizes="(min-width: 300px) 100%, 32px"
            fill
            loading="lazy"
          />
        ) : null}
      </div>
      <div className="px-2 flex-1">
        <small className="text-dark-50">#{id.split("-")[0]}</small>
        <h3 className="text-sm md:text-base font-medium text-dark-50">{name}</h3>
        <p className="tex-lg md:text-xl font-bold text-primary">
          {price.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
            compactDisplay: "short",
            minimumFractionDigits: 0,
          })}
        </p>
        <p className="text-xs md:text-sm font-thin text-dark-50 line-clamp-2 text-ellipsis flex gap-0.5">
          <MapPin size={18} />
          {location} | {title}
        </p>
        <small className="text-xs md:text-sm text-light-100">Last modified: {updatedAt?.toLocaleDateString("en-UK", {
          dateStyle: 'medium'
        })}</small>
      </div>

      <div className="hidden lg:flex flex-col space-y-2 justify-center items-center">
        <Link
          href={`listings/update/${id}`}
          className="text-sm md:text-base block text-green-500 hover:bg-green-50  p-1 px-5 rounded-md transition-all"
        >
          Edit
        </Link>
        <button
          onClick={() => setShowModal(true)}
          className="text-sm md:text-base text-red-600 hover:bg-rose-50 p-1 px-3 rounded-md transition-al cursor-pointerl"
        >
          Delete
        </button>
      </div>

      {/** Actions for mobile */}
      <Button
        type="button"
        variant="ghost"
        onClick={() => setShowActions(!showActions)}
        className="flex lg:hidden flex-col items-center justify-center p-1 hover:bg-gray-100 rounded-full"
      >
        <MoreVertical size={24} />
      </Button>
      <div
        className={`animate-in fade-in-5 absolute top-0 right-0 w-44 flex flex-col space-y-2 justify-center items-center bg-white shadow-lg p-2 rounded-md ${showActions ? "block z-20" : "hidden"
          }`}
      >
        <div
          className="w-full flex justify-end p-2 cursor-pointer"
          onClick={() => setShowActions(false)}
        >
          <RiCloseLine size={12} />
        </div>
        <Link
          href={`listings/update/${id}`}
          className="text-sm md:text-base block  text-blue-300 bg-blue-50 p-1 px-5 rounded-md transition-all"
        >
          Edit
        </Link>
        <button
          className="text-sm md:text-base font-semibold text-red-600 bg-rose-50 p-1 px-3 rounded-md transition-all"
          onClick={() => setShowModal(true)}
        >
          Delete
        </button>
      </div>

      <CustomAlertDialog
        description={`Are you sure you want to delete ${name}?`}
        open={showModal}
        onOpenChange={setShowModal}
        action={() => handleDeleteProperty(id)}
      />
    </article>
  );
};

export default AdminListing;
