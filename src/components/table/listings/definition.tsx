"use client";

import Actions from "@/components/shared/Actions";
import config from "@/lib/config";
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


      return <div className="space-y-1">
        <small>#{id.split("-")[0]}</small>
        {imageUrl ? (

          <Image src={imageUrl} urlEndpoint={config.env.imagekit.urlEndpoint}
            alt={name} width={32} height={32} />
        ) : (
          <div className="size-8 rounded-lg bg-light-100" />
        )}
        <h3 className="truncate">{name}</h3>
        <p>{title}</p>
        <p>Last modified: {updatedAt?.toLocaleDateString("en-UK", {
          dateStyle: 'medium'
        })}</p>
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
    accessorKey: "size",
    cell: ({ row }) => {
      const size = row.getValue("size") as number;
      const type = row.getValue("propertyType") as string;
      return type === "land" ? `${size} sqm` : "N/A";
    },
  },
  {
    accessorKey: "listingStatus",
    header: "Status",
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
