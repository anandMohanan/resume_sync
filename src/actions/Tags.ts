"use server";

import { db } from "@/db";
import { ResumeTag, Tags } from "@/db/schema/resume";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import useSWR from "swr";

export const createTagAction = async (tagName: string) => {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        const tags = await db
            .select()
            .from(Tags)
            .where(and(eq(Tags.name, tagName), eq(Tags.userId, user?.id!)));
        if (tags.length > 0) {
            return {
                message: "Tag Already Exists",
                status: "error",
            };
        }
        await db.insert(Tags).values({
            name: tagName,
            userId: user?.id,
        });
        revalidatePath("/upload/resume");
        return {
            message: "Tag Created",
            status: "success",
        };
    } catch (e) {
        return {
            message: `Not able to create Tag, Please try again!`,
            status: "error",
        };
    }
};

export const deleteTagsAction = async (tagId: string) => {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        const tag = await db
            .select()
            .from(Tags)
            .where(and(eq(Tags.tagId, tagId), eq(Tags.userId, user?.id!)));
        if (tag.length === 0) {
            return {
                message: `Tag not found`,
                status: "error",
            };
        }
        await db
            .delete(Tags)
            .where(and(eq(Tags.tagId, tagId), eq(Tags.userId, user?.id!)));
        await db.delete(ResumeTag).where(eq(ResumeTag.tagId, tagId));
        revalidatePath("/upload/resume");
        return {
            message: "Tag Deleted",
            status: "success",
        };
    } catch (e) {
        return {
            message: `Not able to delete Tag, Please try again!`,
            status: "error",
        };
    }
};

export const getTagsAction = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const tags = await db
        .select({
            id: Tags.tagId,
            label: Tags.name,
        })
        .from(Tags)
        .where(eq(Tags.userId, user?.id!));
    return tags;
};

export const getTagsByUserId = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const tags = await db
        .select({ tagName: Tags.name, resumeId: ResumeTag.resumeId })
        .from(Tags)
        .fullJoin(ResumeTag, eq(ResumeTag.tagId, Tags.tagId))
        .where(eq(Tags.userId, user?.id!));
    return tags;
};
