"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Image } from "@imagekit/next";
import { Bath, Bed, Edit2, Eye, Loader, MapPin, Trash2, Waypoints } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { deleteProduct } from "@/lib/actions/auth";
import { Button } from "../ui/button";
import CustomAlertDialog from "./CustomAlertDialog";
import CustomDialog from "./CustomDialog";
import config from "@/lib/config";
import { cn } from "@/lib/utils";

interface ProductActionsProps {
  data: (listings & {
    category?: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      description: string;
    } | null;
  })
}

const ProductActions = ({ data }: ProductActionsProps) => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isDeleting, startDeleting] = useTransition();

  const handleDelete = () => {
    //close the modal
    setShowModal(false);

    startDeleting(async () => {
      try {
        const res = await deleteProduct(data.id);

        if (!res.success) {
          toast({
            title: "Error",
            description: res.message,
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Success",
          description: res.message,
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    })
  };

  return (

    <div className="w-full flex gap-2 items-center">
      <Link href={{
        pathname: '/admin/listings/add-new',
        query: {
          productId: data.id
        }
      }} className="size-8 p-1 bg-light-50 hover:bg-green-50 flex-center rounded-full transition-colors">
        <Edit2 size={16} className="text-green-500" />
      </Link>

      <Button type="button" variant="ghost" size="sm"
        disabled={isDeleting}
        onClick={() => setShowDetails(true)}
        className="size-8 bg-light-50 hover:bg-blue-50 rounded-full cursor-pointer"
      >
        <Eye size={16} className="text-blue-500" />
      </Button>

      <Button type="button" variant="ghost" size="sm"
        onClick={() => setShowModal(true)}
        disabled={isDeleting}
        className="size-8 bg-light-50 hover:bg-red-50 rounded-full cursor-pointer"
      >
        {isDeleting ? (<Loader size={16} color="red" className="animate-spin" />) : (
          <Trash2
            size={16}
            className="text-red-500"
          />
        )}
      </Button>

      <CustomDialog open={showDetails} onOpenChange={setShowDetails} title="Property details" description={data.name}>
        <div className="w-full max-h-[80vh] no-scrollbar overflow-y-auto">
          {data.imageUrl ? (
            <Image urlEndpoint={config.env.imagekit.urlEndpoint}
              src={data.imageUrl}
              alt={data.name}
              width={120}
              height={60}
              className="w-full h-52 object-cover aspect-video"
            />
          ) : (
            <div className="w-full h-52 bg-light-200 " />
          )}

          <div className="space-y-2 py-3">
            <h2 className="text-lg md:text-xl text-dark-200 font-bold space-x-1">{data.price.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
              compactDisplay: "short",
              minimumFractionDigits: 0,

            })}
              <span className={cn('text-xs font-normal text-dark-50 bg-gray-100 rounded-full inline-block px-1.5', {
                'text-green-500 bg-green-50': data.listingStatus === 'selling',
                'text-blue-500 bg-blue-50': data.listingStatus === 'reopened'
              })}>{data.listingStatus}</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <p className="text-sm md:text-base text-dark-100 font-medium">{data.name}</p>
                <p className="text-sm md:text-base text-dark-50">{data.title ?? 'No title provided'}</p>
                {data.category ? <p className="text-xs text-light-200 font-semibold">Type: {data.category?.name}</p> : null}
              </div>

              <p className="text-sm flex-1 flex gap-1 align-top"><MapPin className="size-4 shrink-0" /> {data.location}</p>
            </div>

            <div className="grid grid-cols-3 gap-1 md:gap-2">
              <p className="text-sm text-dark-200 flex-center gap-1 p-1 border border-border rounded-lg">{data.bedrooms}
                <Bed className="size-4" />
              </p>
              <p className="text-sm text-dark-200 flex-center gap-1 p-1 border border-border rounded-lg">{data.bathrooms}
                <Bath className="size-4" />
              </p>
              <p className="text-sm text-dark-200 flex-center gap-1 p-1 border border-border rounded-lg">{data.size} SQM
                <Waypoints className="size-4" />
              </p>
            </div>

            <hr className="border-border" />

            <p className="text-sm md:text-base text-dark-100 line-clamp-6 text-ellipsis">{data.description}</p>


            <Button type="button" variant="outline" onClick={() => setShowDetails(false)} className="text-base text-dark-50 w-full mt-4 bg-secondary">Close details</Button>
          </div>
        </div>
      </CustomDialog>

      <CustomAlertDialog
        open={showModal}
        onOpenChange={setShowModal}
        description="Are you sure you want to delete this product?"
        action={handleDelete}
      />
    </div>
  );
};

export default ProductActions;
