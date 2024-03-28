"use server"

import { db } from "@/db"
import { ResumeTable, ResumeTag } from "@/db/schema/resume"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { warn } from "console"


export const InsertResume = async (name: string, version: Number, comments: string, fileKey: string, fileUrl: string, tags: string[]) => {
    try {
        const { getUser } = getKindeServerSession()
        const user = await getUser()
        const resumeData = await db.insert(ResumeTable).values({
            resumeName: name,
            version: String(version),
            resumeFilename: fileKey,
            resumeUrl: fileUrl,
            comments: comments,
            userId: user?.id
        }).returning({ resumeId: ResumeTable.resumeId })

        console.log("tags -----> ", tags)
        tags.forEach(async (tag) => {
            console.log("tag ---->", tag)
            console.log(resumeData[0].resumeId)
            await db.insert(ResumeTag).values({
                resumeId: resumeData[0].resumeId,
                tagId: tag
            })
        })
        return {
            message: "Resume Created",
            status: "success"
        }
    } catch (e) {
        return {
            message: `Not able to create Resume, Please try again!`,
            status: "error"
        }
    }
}
