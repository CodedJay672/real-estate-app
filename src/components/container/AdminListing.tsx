"use client";

import config from "@/lib/config";
import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { useState } from "react";
import { RiCloseLine, RiMore2Line } from "react-icons/ri";
import { useToast } from "@/hooks/use-toast";
import { deleteProduct } from "@/lib/actions/auth";
import CustomAlertDialog from "../shared/CustomAlertDialog";

const AdminListing = ({
  name,
  title,
  location,
  price,
  imageUrl,
  id,
}: {
  title: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
  id: string;
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
    <article className="w-full lg:max-w-screen-md flex items-center relative">
      <div className="w-32 overflow-hidden">
        <IKImage
          path={imageUrl}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt={name}
          loading="lazy"
        />
      </div>
      <div className="p-2 flex-1">
        <h3 className="text-sm md:text-base font-semibold">{name}</h3>
        <p className="text-xs md:text-sm font-thin text-gray-400">
          {location} | {title}
        </p>
        <p className="text-sm md:text-base font-bold text-blue-300">
          {price.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
          })}
        </p>
      </div>

      <div className="hidden lg:flex flex-col space-y-2 justify-center items-center">
        <Link
          href={`listings/update/${id}`}
          className="text-sm md:text-base block text-blue-300 hover:bg-blue-100 p-1 px-5 rounded-md transition-all"
        >
          Edit
        </Link>
        <button
          className="text-sm md:text-base text-red-600 hover:bg-rose-200 p-1 px-3 rounded-md transition-all"
          onClick={() => setShowModal(true)}
        >
          Delete
        </button>
      </div>

      {/** Actions for mobile */}
      <div
        className="flex lg:hidden flex-col items-center justify-center p-1 hover:bg-gray-100 rounded-full"
        onClick={() => setShowActions(!showActions)}
      >
        <RiMore2Line size={24} />
      </div>
      <div
        className={`animate-in fade-in-5 absolute top-0 right-0 w-44 flex flex-col space-y-2 justify-center items-center bg-white shadow-lg p-2 rounded-md ${
          showActions ? "block z-20" : "hidden"
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
