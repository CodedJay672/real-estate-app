"use client";

import Actions from "@/components/shared/Actions";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { Image } from "@imagekit/next";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";



const columnHelper = createColumnHelper<listings>();

export const productColumns: ColumnDef<listings>[] = [
  {
    accessorKey: "id",
    cell: (props) => <span>{props.row.index + 1}</span>,
    header: "S/N",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { name, imageUrl, updatedAt, id, title } = row.original;


      return <div className="flex gap-1">
        {imageUrl ? (

          <Image src={imageUrl} urlEndpoint={config.env.imagekit.urlEndpoint}
            alt={name} width={32} height={32} />
        ) : (
          <div className="size-8 rounded-lg bg-light-100" />
        )}
        <div className="space-y-1">

          <small>#{id.split("-")[0]}</small>
          <div>
            <h3 className="text-dark-200 font-semibold truncate">{name}</h3>
            <p className="text-dark-50">{title}</p>
            <p className="text-xs text-light-100">Last modified: {updatedAt?.toLocaleDateString("en-UK", {
              dateStyle: 'medium'
            })}
            </p>
          </div>
        </div>
      </div>
    }
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return price.toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
        compactDisplay: "short",
        minimumFractionDigits: 0,
      });
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "propertyType",
    header: "Type",
  },
  {
    accessorKey: "Size",
    cell: ({ row }) => {
      const { type, size } = row.original;
      return type === "land" ? `${size} SQM` : "N/A";
    },
  },
  {
    accessorKey: "listingStatus",
    header: "Status",
    cell: ({ row }) => {
      const { listingStatus } = row.original;

      return <span className={cn('text-sm inline-block px-2 py-0.5 rounded-full', {
        'text-green-500 bg-green-50': listingStatus === 'selling',
        'text-red-500 bg-red-50': listingStatus === 'closed',
        'text-gray-500 bg-gray-50': listingStatus === 'sold out',
        'text-blue-500 bg-blue-50': listingStatus === 'reopened',

      })}>{listingStatus}</span>
    }
  },
  {
    accessorKey: "createdAt",
    header: () => {
      return <span className="whitespace-nowrap">Created At</span>
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return date.toLocaleDateString();
    },
  },
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => Actions(row.original.id),
  }),
];
