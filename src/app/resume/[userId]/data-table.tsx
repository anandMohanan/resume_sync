"use client"

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";



export const DataTable = ({ data }: {
    data: {
        id: string | null,
        resume_name: string | null,
        version: string | null,
        file_url: string | null,
        comments: string | null
    }[]

}) => {
    return (
        <TableBody className="p-10">
            {data ? (
                data.map((resume) => (
                    <Collapsible key={resume.id} asChild>
                        <>
                            <TableRow className="p-10">
                                <TableCell>{resume.resume_name}</TableCell>
                                <TableCell>{resume.version}</TableCell>
                                <TableCell>
                                    <div className="flex  items-center">
                                        <Link href={resume.file_url!} className="underline text-blue-300" > <DownloadIcon className="h-4 w-4" /> </Link>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <CaretSortIcon className="h-4 w-4" />
                                                <span className="sr-only">Toggle</span>
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <CollapsibleContent asChild>
                                <>
                                    <p>{resume.comments} </p>
                                </>
                            </CollapsibleContent>
                        </>
                    </Collapsible>
                ))
            ) : null}
        </TableBody>
    );
}
