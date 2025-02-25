"use client";

import { ColumnDef } from "@tanstack/react-table";

interface user {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: Date;
}

export const userColumn: ColumnDef<user>[] = [
  {
    accessorKey: "S/N",
    cell: (props) => <span>{props.row.index + 1}</span>,
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Joined on",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return date.toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
];
