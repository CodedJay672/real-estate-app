"use client";

import { ColumnDef } from "@tanstack/react-table";

interface user {
  id: string;
  fullName: string;
  email: string;
  role: string;
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
];
