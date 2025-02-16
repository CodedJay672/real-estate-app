"use client";

import Actions from "@/components/shared/Actions";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

export type listings = {
  id: string;
  name: string;
  title: string;
  price: number;
  location: string;
  propertyType: string;
  size: number;
  listingStatus: string;
  likes: string[];
  createdAt: Date;
};

const columnHelper = createColumnHelper<listings>();

export const columns: ColumnDef<listings>[] = [
  {
    accessorKey: "id",
    cell: (props) => <span>{props.row.index + 1}</span>,
    header: "S/N",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return price.toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
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
    accessorKey: "likes",
    header: "Likes",
    cell: ({ row }) => {
      const likes = row.getValue("likes") as string[];
      return likes.length
        ? likes.length > 1
          ? `${likes.length} likes`
          : `${likes.length} like`
        : "No likes";
    },
  },
  {
    accessorKey: "createdAt",
    header: "Posted At",
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
