"use client";

import ProductActions from "@/components/shared/Actions";
import CategoryActions from "@/components/shared/CategoryActions";
import { MessagesAction } from "@/components/shared/MessagesAction";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { Image } from "@imagekit/next";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";



const columnHelper = createColumnHelper<(listings & {
  category: categoryResponse | null;
  likes: TLikesResponse[]
})>();

export const productColumns: ColumnDef<(listings & {
  category: categoryResponse | null;
  likes: TLikesResponse[]
})>[] = [
    {
      accessorKey: "id",
      cell: (props) => <span>{props.row.index + 1}</span>,
      header: "S/N",
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const { name, imageUrl, updatedAt, id, title, category } = row.original;

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
              <p className="text-xs text-dark-50">{category?.name}</p>
              <p className="text-[10px] text-light-200">Last modified: {updatedAt?.toLocaleDateString("en-UK", {
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
      accessorKey: "Size",
      cell: ({ row }) => {
        const { size } = row.original;
        return (
          <span className="whitespace-nowrap">
            {size ? `${size} SQM` : "--"}
          </span>
        )
      },
    },
    {
      accessorKey: "likes",
      header: "Likes",
      cell: ({ row }) => {
        const { likes } = row.original;

        return <>{likes.length}</>
      }
    },
    {
      accessorKey: "listingStatus",
      header: "Status",
      cell: ({ row }) => {
        const { listingStatus } = row.original;

        return <span className={cn('text-sm inline-block px-2 py-0.5 rounded-full whitespace-nowrap', {
          'text-green-500 bg-green-50': listingStatus === 'selling',
          'text-gray-500 bg-gray-50': listingStatus === 'sold out',
          'text-blue-500 bg-blue-50': listingStatus === 'reopened',

        })}>{listingStatus}</span>
      }
    },
    {
      accessorKey: "createdAt",
      header: () => {
        return <span className="whitespace-nowrap">Created on</span>
      },
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as Date;
        return date.toLocaleDateString("en-UK", {
          dateStyle: "medium"
        });
      },
    },
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => ProductActions({ data: row.original }),
    }),
  ];

const productsAction = createColumnHelper<listings>();

export const categoryProductsColumns: ColumnDef<listings>[] = [
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
            <p className="text-[10px] text-light-200">Last modified: {updatedAt?.toLocaleDateString("en-UK", {
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
    accessorKey: "Size",
    cell: ({ row }) => {
      const { size } = row.original;
      return (
        <span className="whitespace-nowrap">
          {size ? `${size} SQM` : "--"}
        </span>
      )
    },
  },
  {
    accessorKey: "listingStatus",
    header: "Status",
    cell: ({ row }) => {
      const { listingStatus } = row.original;

      return <span className={cn('text-sm inline-block px-2 py-0.5 rounded-full whitespace-nowrap', {
        'text-green-500 bg-green-50': listingStatus === 'selling',
        'text-gray-500 bg-gray-50': listingStatus === 'sold out',
        'text-blue-500 bg-blue-50': listingStatus === 'reopened',

      })}>{listingStatus}</span>
    }
  },
  {
    accessorKey: "createdAt",
    header: () => {
      return <span className="whitespace-nowrap">Created on</span>
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return date.toLocaleDateString("en-UK", {
        dateStyle: "medium"
      });
    },
  },
  productsAction.display({
    id: "actions",
    cell: ({ row }) => ProductActions({ data: row.original }),
  }),
];

const categoryHelper = createColumnHelper<categoryResponse>();
export const categoryColumns: ColumnDef<categoryResponse>[] = [
  {
    accessorKey: "id",
    cell: (props) => <span>{props.row.index + 1}</span>,
    header: "S/N",
  },
  {
    accessorKey: 'name',
    header: "Name",
    cell: ({ row }) => {
      const { id, name } = row.original;

      return (
        <div className="space-y-0.5">
          <small className="text-light-100">#{id.split("-")[0]}</small>
          <p className="truncate font-medium">{name}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const { description } = row.original;

      return <span className="line-clamp-3 text-ellipsis">{description}</span>
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created on",
    cell: ({ row }) => {
      const { createdAt } = row.original;

      return <span>{createdAt.toLocaleDateString("en-UK", {
        dateStyle: 'medium'
      })}</span>
    }
  },
  categoryHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      return CategoryActions(row.original)
    }
  })
]

const messageHelper = createColumnHelper<TMessageResponse>();
export const messageColumns: ColumnDef<TMessageResponse>[] = [
  {
    accessorKey: "id",
    cell: (props) => <span>{props.row.index + 1}</span>,
    header: "S/N",
  },
  {
    accessorKey: "senderName",
    header: 'Sender Info',
    cell: ({ row }) => {
      const { id, senderEmail, senderName } = row.original;

      return <div>
        <p className="text-sm text-light-100">#{id.split('-')[0]}</p>
        <p className="text-sm md:text-base font-semibold">{senderName}</p>
        <p className="text-sm text-light-200">{senderEmail}</p>
      </div>
    }
  },
  {
    accessorKey: 'message',
    header: "Content"
  },
  {
    accessorKey: "createdAt",
    header: 'Date',
    cell: ({ row }) => {
      const { createdAt } = row.original;

      return createdAt.toLocaleDateString("en-UK", {
        dateStyle: 'medium'
      })
    }
  },
  messageHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      return MessagesAction(row.original)
    }
  })
]