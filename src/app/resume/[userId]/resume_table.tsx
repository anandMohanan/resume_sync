"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DataTable } from "./data-table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { db } from "@/db";
import { ResumeTable, ResumeTag } from "@/db/schema/resume";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/hooks";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Document, Page, pdfjs } from "react-pdf";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ResumeMobile } from "./mobile-view";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
interface ResumePageProps {
    data: {
        id: string | null;
        resume_name: string | null;
        version: string | null;
        file_url: string | null;
        comments: string | null;
    }[];
}
export const ResumeTableContent = ({ data }: ResumePageProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    console.log(isDesktop);
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
                    <DataTable data={data} />
                </Table>
            </div>
        );
    } else {
        return (
            <ResumeMobile data={data} />
        );
    }
};
