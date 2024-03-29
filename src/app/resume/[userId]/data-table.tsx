"use client"

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";
import { Document, Page, pdfjs } from "react-pdf"


export const DataTable = ({ data }: {
    data: {
        id: string | null,
        resume_name: string | null,
        version: string | null,
        file_url: string | null,
        comments: string | null
    }[]

}) => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
    return (
        <TableBody className="p-10">
            {data ? (
                data.map((resume) => (
                    <Collapsible key={resume.id} asChild>
                        <>
                            <TableRow className="">
                                <TableCell>{resume.resume_name}</TableCell>
                                <TableCell>{resume.version}</TableCell>
                                <TableCell className="w-20">
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
                            <CollapsibleContent className="w-full" asChild>
                                <div>
                                    <p>{resume.comments} </p>
                                    <Document file={resume.file_url} >
                                        <Page pageNumber={1} />
                                    </Document>
                                </div>
                            </CollapsibleContent>
                        </>
                    </Collapsible>
                ))
            ) : null}
        </TableBody>
    );
}
