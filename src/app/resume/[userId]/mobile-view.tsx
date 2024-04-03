"use client"

import { DeleteResumeById } from "@/actions/Resume";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { Document, Page, pdfjs } from "react-pdf";

interface ResumeMobileProps {
    data: {
        id: string | null;
        resume_name: string | null;
        version: string | null;
        file_url: string | null;
        comments: string | null;
    }[];
}



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const ResumeMobile = ({ data }: ResumeMobileProps) => {
    const { toast } = useToast();
    const { mutateAsync: deleteResume, isPending: deleteResumePending } = useMutation({
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
    return (
        <Accordion type="single" collapsible className="p-5">
            {data.length > 0 &&
                data.map((resume) => {
                    return (
                        <AccordionItem key={resume.id} value={resume.resume_name!}>
                            <AccordionTrigger> {resume.resume_name} </AccordionTrigger>
                            <AccordionContent asChild>
                                <div className="p-2">
                                    <Document file={resume.file_url} className="w-20">
                                        <Page pageNumber={1} height={400} width={400} className="w-10" />
                                    </Document>
                                    <div className="p-3">
                                        <Label className="font-bold">Version: </Label>
                                        {resume.version}
                                    </div>
                                    <div className="flex justify-between ">
                                        <Link href={resume.file_url!} className={buttonVariants()}>Download </Link>
                                        <Button onClick={() => deleteResume(resume.id!)} disabled={deleteResumePending}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                    <div className="p-3">
                                        <Label className="font-bold mb-3">Comments: </Label>
                                        <Textarea value={resume.comments!} readOnly />
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
        </Accordion>

    )

}
