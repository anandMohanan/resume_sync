"use client";

import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Document, Page, pdfjs } from "react-pdf";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { DeleteResumeById } from "@/actions/Resume";
import { getTagsByUserId } from "@/actions/Tags";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Ellipsis, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface DataTableProps {
    data: {
        id: string | null;
        resume_name: string | null;
        version: string | null;
        file_url: string | null;
        comments: string | null;
    }[];
}
export const DataTable = ({ data }: DataTableProps) => {
    const { toast } = useToast();
    const { mutateAsync: deleteResume } = useMutation({
        mutationFn: async (resumeId: string) => {
            const res = await DeleteResumeById(resumeId);
            if (res.status === "success") {
                toast({
                    description: `${res.message}`,
                    variant: "default",
                });
            } else {
                toast({
                    description: `${res.message}`,
                    variant: "default",
                });
            }
        },
    });
    const { data: tags } = useQuery({
        queryKey: ["gettags"],
        queryFn: async () => {
            const res = await getTagsByUserId();
            return res;
        },
    });
    const RowContent = ({
        resumeData,
    }: {
        resumeData: {
            id: string | null;
            resume_name: string | null;
            version: string | null;
            file_url: string | null;
            comments: string | null;
        };
    }) => {
        return (
            <td colSpan={10}>
                <div className="flex justify-center">
                    <Document
                        loading={<Loader2Icon className="animate-spin text-center" />}
                        className="p-10"
                        file={resumeData.file_url}
                    >
                        <Page pageNumber={1} width={300} height={300} />
                    </Document>
                    <div className="items-center">
                        <div className="p-10">
                            <div>
                                <h1 className="bold underline mb-5"> Comments: </h1>
                                <Textarea value={resumeData.comments!} readOnly className="" />
                            </div>
                        </div>
                        <div className="p-10">
                            <h1 className="bold underline mb-5">Tags:</h1>
                            {tags &&
                                tags?.length > 0 &&
                                tags?.map((tag) => {
                                    if (tag.resumeId === resumeData.id) {
                                        return (
                                            <Badge
                                                variant={"outline"}
                                                className="text-md"
                                                key={tag.tagName}
                                            >
                                                {tag.tagName}
                                            </Badge>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                        </div>{" "}
                    </div>
                </div>
            </td>
        );
    };
    return (
        <TableBody className="p-10">
            {data
                ? data.map((resume) => (
                    <Collapsible key={resume.id} asChild>
                        <>
                            <TableRow className="">
                                <TableCell>
                                    <div className="flex  items-center">
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <CaretSortIcon className="h-4 w-4" />
                                                <span className="sr-only">Toggle</span>
                                            </Button>
                                        </CollapsibleTrigger>

                                        {resume.resume_name}
                                    </div>
                                </TableCell>
                                <TableCell className="bg-green-900 text-center">
                                    {resume.version}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Link href={resume.file_url!} className="text-blue-300">
                                        {" "}
                                        Download{" "}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild className="">
                                            <Button variant="ghost" className="">
                                                <Ellipsis />{" "}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {/*  <DropdownMenuItem className="cursor-pointer">
                          <Link href={`/resume/edit/${resume.id}`}> Edit</Link>
                        </DropdownMenuItem> */}
                                            <DropdownMenuItem
                                                className="cursor-pointer"
                                                onClick={() => deleteResume(resume.id!)}
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            <CollapsibleContent className="w-full" asChild>
                                <div>
                                    <RowContent resumeData={resume} />
                                </div>
                            </CollapsibleContent>
                        </>
                    </Collapsible>
                ))
                : null}
        </TableBody>
    );
};
