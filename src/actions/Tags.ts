"use server"

import { db } from "@/db"
import { Tags } from "@/db/schema/resume"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import useSWR from "swr"


export const createTagAction = async (tagName: string) => {
    try {

        const { getUser } = getKindeServerSession()
        const user = await getUser()
        const tags = await db.select().from(Tags).where(and(eq(Tags.name, tagName), eq(Tags.userId, user?.id!)))
        console.log("tags from action", tags)
        if (tags.length > 0) {
            console.log("tag already exists")
            return {
                message: "Tag Already Exists",
                status: "error"
            }
        }
        console.log("inserting tag")
        await db.insert(Tags).values({
            name: tagName,
            userId: user?.id
        })
        revalidatePath("/upload/resume")
        return {
            message: "Tag Created",
            status: "success"
        }
    } catch (e) {
        console.log("assa", e)
        return {
            message: `Not able to create Tag, Please try again!`,
            status: "error"
        }
    }
}


export const deleteTagsAction = async (tagId: string) => {
    try {
        const { getUser } = getKindeServerSession()
        const user = await getUser()

        await db.delete(Tags).where(and(eq(Tags.tagId, tagId), eq(Tags.userId, user?.id!)))
        revalidatePath("/upload/resume")
        return {
            message: "Tag Deleted",
            status: "success"
        }
    } catch (e) {
        return {
            message: `Not able to delete Tag, Please try again!`,
            status: "error"
        }

    }
}

export const getTagsAction = async () => {

    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const tags = await db.select({
        id: Tags.tagId,
        label: Tags.name
    }).from(Tags).where(eq(Tags.userId, user?.id!))
    return tags

}
