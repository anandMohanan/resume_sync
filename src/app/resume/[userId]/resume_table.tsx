"use client"

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { DataTable } from "./data-table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { db } from "@/db";
import { ResumeTable, ResumeTag } from "@/db/schema/resume";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/hooks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Document, Page, pdfjs } from "react-pdf";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getTagsByResumeAction } from "@/actions/Tags";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
interface ResumePageProps {
    data: {
        id: string | null,
        resume_name: string | null,
        version: string | null,
        file_url: string | null,
        comments: string | null
    }[],
}
export const ResumeTableContent = ({ data  }:
    ResumePageProps
) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    console.log(isDesktop)
    if (isDesktop) {
        return (
            <div className="rounded-md sm:border">
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-medium ml-20">Resume</TableHead>
                            <TableHead className="font-medium text-center">Version</TableHead>
                            <TableHead className="font-medium text-center">URL</TableHead>
                            <TableHead className="font-medium text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <DataTable data={data}  />
                </Table>
            </div>
        )
    } else {
        return (
            <Accordion type="single" collapsible className="p-5">
                {data.length > 0 && data.map((resume) => {
                    console.log(resume)
                    return (
                        <AccordionItem key={resume.id} value={resume.resume_name!}>
                            <AccordionTrigger> {resume.resume_name} </AccordionTrigger>
                            <AccordionContent asChild>

                                <div className="p-2">
                                    <Document file={resume.file_url} >
                                        <Page pageNumber={1} height={400} width={400} />
                                    </Document>
                                    <div>
                                        <Label>Version: </Label>
                                        {resume.version}
                                    </div>
                                    <div>
                                        <Label>File URL: </Label>
                                        <Link href={resume.file_url!} className="text-blue-500 underline"> Click here to Download </Link>
                                    </div>
                                    <div>
                                        <Label>Comments: </Label>
                                        <Input value={resume.comments!} readOnly />
                                    </div>

                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )
                })
                }
            </Accordion>
        )
    }
}


