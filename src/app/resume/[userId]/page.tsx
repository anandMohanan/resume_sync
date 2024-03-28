// import { Button, buttonVariants } from "@/components/ui/button"
// import { db } from "@/db"
// import { ResumeTable, ResumeTag } from "@/db/schema/resume"
// import { eq, name } from "drizzle-orm"
// import Link from "next/link"
// import { redirect } from "next/navigation"
// import { Payment, columns } from "./columns"
// import { DataTable } from "./data-table"
//
//     if (params.userId == null) {
//         redirect("/")
//     }
//     const data = await db.select({ id: ResumeTable.resumeId, resume_name: ResumeTable.resumeName, version: ResumeTable.version, file_url: ResumeTable.resumeUrl }).from(ResumeTable).where(eq(ResumeTable.userId, params.userId))
//     // const ResumeTags = await db.select().from(ResumeTag).where(eq(ResumeTag.resumeId, UserResume[0].resumeId))
//     // console.log(ResumeTags)
//     if (data.length == 0) {
//         return (
//             <>
//                 <h1> No Resume Found </h1>
//                 <Link href={"/upload/resume"} className={buttonVariants()}> Upload Resume </Link>
//             </>
//         )
//     }
//     return (
//         <>
//             <h1>  {params.userId} </h1>
//             <Link href={"/upload/resume"} className={buttonVariants()}> Upload Resume </Link>
//             <DataTable columns={columns} data={data} />
//         </>
//     )
//
// }
//
//
// export default ResumePage


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
            <div className="flex justify-between m-auto p-5">
                <p>hello </p>
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
