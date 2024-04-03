import { db } from "@/db";
import { ResumeTable } from "@/db/schema/resume";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { ResumeTableContent } from "./view-controller";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { buttonVariants } from "@/components/ui/button";

interface ResumePageProps {
    params: {
        userId: string;
    };
}

const ResumePage = async ({ params }: ResumePageProps) => {
    const data = await db
        .select({
            id: ResumeTable.resumeId,
            resume_name: ResumeTable.resumeName,
            version: ResumeTable.version,
            file_url: ResumeTable.resumeUrl,
            comments: ResumeTable.comments,
        })
        .from(ResumeTable)
        .where(eq(ResumeTable.userId, params.userId))
        .orderBy(desc(ResumeTable.version));
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (user?.id !== params.userId) {
        return (
            <div className="w-full sm:p-4">
                <div className="flex justify-between align-middle items-center m-auto p-5">
                    <p className="font-bold">
                        You are not authenticated to view this page
                    </p>
                    <Link href={`/resume/${user?.id}`} className={buttonVariants()}>
                        {" "}
                        Redirect{" "}
                    </Link>
                </div>
            </div>
        );
    }
    if (data.length == 0) {
        return (
            <div className="w-full sm:p-4">
                <div className="flex justify-between align-middle items-center m-auto p-5">
                    <p className="lg:font-bold lg:block  hidden">
                        Your Resume <span className="text-red-800"> &apos; </span>s{" "}
                    </p>
                    <Link href={"/upload/resume"} className={buttonVariants()}>
                        {" "}
                        Upload Resume{" "}
                    </Link>
                </div>
                <h1 className="text-center font-bold">No Resume </h1>
            </div>
        );
    } else {
        return (
            <div className="w-full sm:p-4">
                <div className="flex justify-between align-middle items-center m-auto p-5">
                    <p className="font-bold lg:block hidden">
                        Your Resume <span className="text-red-800"> &apos; </span>s{" "}
                    </p>
                    <Link href={"/upload/resume"} className={buttonVariants()}>
                        {" "}
                        Upload Resume{" "}
                    </Link>
                </div>
                <ResumeTableContent data={data} />
            </div>
        );
    }
};

export default ResumePage;
