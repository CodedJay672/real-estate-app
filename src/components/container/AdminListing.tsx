"use client";

import { useState } from "react";
import { Image } from "@imagekit/next";
import { Bath, Bed, Edit2, Eye, MapPin, MoreVertical, Trash2, Waypoints } from "lucide-react";
import { useRouter } from "next/navigation";


import config from "@/lib/config";
import { useToast } from "@/hooks/use-toast";
import CustomAlertDialog from "../shared/CustomAlertDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import CustomDialog from "../shared/CustomDialog";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { deleteProduct } from "@/lib/actions/products.actions";


const AdminListing = (data: (listings & {
  category?: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
  } | null;
})) => {
  const { toast } = useToast();
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();


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
    <>
      <article className="w-full lg:max-w-(--breakpoint-md) flex relative border border-border rounded-lg p-2 z-0">
        <div className="size-20 bg-light-100 rounded-xl overflow-hidden relative">
          {data.imageUrl ? (
            <Image
              src={data.imageUrl}
              urlEndpoint={config.env.imagekit.urlEndpoint}
              alt={data.name}
              sizes="(min-width: 300px) 100%, 32px"
              fill
              loading="lazy"
              className="w-auto h-auto object-cover"
            />
          ) : null}
        </div>
        <div className="px-2 flex-1">
          <small className="text-dark-50">#{data.id.split("-")[0]}</small>
          <h3 className="text-sm md:text-base font-medium text-dark-50">{data.name}</h3>
          <p className="tex-lg md:text-xl font-bold text-primary">
            {data.price.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
              compactDisplay: "short",
              minimumFractionDigits: 0,
            })}
          </p>
          <p className="text-xs md:text-sm font-thin text-dark-50 line-clamp-2 text-ellipsis flex gap-0.5">
            <MapPin size={18} />
            {data.location} | {data.title}
          </p>
          <small className="text-xs md:text-sm text-light-100">Last modified: {data.updatedAt?.toLocaleDateString("en-UK", {
            dateStyle: 'medium'
          })}</small>
        </div>

        {/** Actions for mobile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="h-max">
            <MoreVertical size={24} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 space-y-1">
            <DropdownMenuItem onClick={() => router.push(`/admin/listings/add-new?productId=${data.id}`)} className="truncate">
              Edit info <Edit2 className="ml-auto text-green-500" />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowDetails(true)} className="truncate">
              view details <Eye className="ml-auto text-blue-500" />
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setShowModal(true)} className="text-red-500 bg-red-50">
              Delete <Trash2 className="ml-auto" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </article>

      <CustomDialog open={showDetails} onOpenChange={setShowDetails} title="Property details" description={data.name}>
        <div className="w-full max-h-[80vh] no-scrollbar overflow-y-auto">
          {data.imageUrl ? (
            <Image urlEndpoint={config.env.imagekit.urlEndpoint}
              src={data.imageUrl}
              alt={data.name}
              width={120}
              height={62}
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
          </div>

          <Button type="button" variant="outline" onClick={() => setShowDetails(false)} className="text-base text-dark-50 w-full mt-4 bg-secondary">Close details</Button>
        </div>
      </CustomDialog>

      <CustomAlertDialog
        description={`Are you sure you want to delete ${data.name}?`}
        open={showModal}
        onOpenChange={setShowModal}
        action={() => handleDeleteProperty(data.id)}
      />
    </>

  );
};

export default AdminListing;
