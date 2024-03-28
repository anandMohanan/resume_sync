import { db } from "@/db";
import { Tags } from "@/db/schema/resume";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function GET() {
    try {
        const { getUser } = getKindeServerSession()
        const user = await getUser()
        const tags = await db.select({
            id: Tags.tagId,
            label: Tags.name

        }).from(Tags).where(eq(Tags.userId, user?.id!))
        console.log("tags from api", tags)
        return new Response(JSON.stringify(tags))

    } catch (e) {
        throw new Error(e)
    }
}
