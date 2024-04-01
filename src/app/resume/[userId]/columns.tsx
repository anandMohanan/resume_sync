"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  file_url: string | null;
  version: string | null;
  resume_name: string | null;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "resume_name",
    header: "Name",
  },
  {
    accessorKey: "version",
    header: "Version",
    cell: ({ row }) => {
      return <p className="text-orange-500 "> {row.original.version} </p>;
    },
  },
  {
    accessorKey: "file_url",
    header: "File URL",
    cell: ({ row }) => {
      return (
        <Link
          href={row.original.file_url!}
          className="hover:text-blue-800 text-blue-600 underline"
        >
          {" "}
          Click to open the Document{" "}
        </Link>
      );
    },
  },
];
