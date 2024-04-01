"use server";

import { db } from "@/db";
import { ResumeTable, ResumeTag } from "@/db/schema/resume";
import { utapi } from "@/lib/utapi";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { warn } from "console";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

export const InsertResume = async (
  name: string,
  version: Number,
  comments: string,
  fileKey: string,
  fileUrl: string,
  tags: string[],
) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const resumeData = await db
      .insert(ResumeTable)
      .values({
        resumeName: name,
        version: String(version),
        resumeFilename: fileKey,
        resumeUrl: fileUrl,
        comments: comments,
        userId: user?.id,
      })
      .returning({ resumeId: ResumeTable.resumeId });

    console.log("tags -----> ", tags);
    tags.forEach(async (tag) => {
      console.log("tag ---->", tag);
      console.log(resumeData[0].resumeId);
      await db.insert(ResumeTag).values({
        resumeId: resumeData[0].resumeId,
        tagId: tag,
      });
    });
    revalidatePath(`/resume/${user?.id}`);
    return {
      message: "Resume Created",
      status: "success",
    };
  } catch (e) {
    return {
      message: `Not able to create Resume, Please try again!`,
      status: "error",
    };
  }
};

export const DeleteResumeById = async (resumeId: string) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const resumeDetails = await db
      .select({
        fileurl: ResumeTable.resumeUrl,
        filename: ResumeTable.resumeFilename,
      })
      .from(ResumeTable)
      .where(
        and(
          eq(ResumeTable.resumeId, resumeId),
          eq(ResumeTable.userId, user?.id!),
        ),
      );
    await utapi.deleteFiles(resumeDetails[0].filename!);
    await db.delete(ResumeTag).where(eq(ResumeTag.resumeId, resumeId));
    await db
      .delete(ResumeTable)
      .where(
        and(
          eq(ResumeTable.resumeId, resumeId),
          eq(ResumeTable.userId, user?.id!),
        ),
      );
    revalidatePath(`/resume/${user?.id}`);
    return {
      message: "Resume Deleted",
      status: "success",
    };
  } catch (e) {
    console.log(e);
    return {
      message: `Not able to delete Resume, Please try again!`,
      status: "error",
    };
  }
};
