
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
interface ResumePageProps {
    params: {
        userId: string
    }
}


const ResumePage = async ({ params }: ResumePageProps) => {
    const data = await db.select({
        id: ResumeTable.resumeId, resume_name: ResumeTable.resumeName,
        version: ResumeTable.version, file_url: ResumeTable.resumeUrl, 
        comments: ResumeTable.comments
    }).from(ResumeTable).where(eq(ResumeTable.userId, params.userId))
    return (
        <div className="w-full sm:p-4">
            <div className="flex justify-between align-middle items-center m-auto p-5">
                <p className="font-bold">Your Resume <span className="text-red-800"> &apos; </span>s </p>
                <Link href={"/upload/resume"} className={buttonVariants()}> Upload Resume </Link>
            </div>
            <div className="rounded-md sm:border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-medium">Resume</TableHead>
                            <TableHead className="font-medium">Version</TableHead>
                            <TableHead className="font-medium">URL</TableHead>
                        </TableRow>
                    </TableHeader>
                    <DataTable data={data} />
                </Table>
            </div>
        </div>
    )
}


export default ResumePage
