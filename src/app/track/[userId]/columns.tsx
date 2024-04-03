"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Track = {
    id: string
    companyName: string
    status: string
    dataApplied: string
}

export const columns: ColumnDef<Track>[] = [
    {
        accessorKey: "companyName",
        header: "Company Name",
    },
    {
        accessorKey: "dataApplied",
        header: "Date Applied",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({}) => {

            return (
<> </>

            )

        },
    },
]

