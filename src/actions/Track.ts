"use server"

import { db } from "@/db";
import { TrackTable } from "@/db/schema/track";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";


interface CreateTrackInterface {
    companyName: string,
    dateApplied: string,
}
export const CreateTrackAction = async ({ companyName, dateApplied }: CreateTrackInterface) => {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        await db
            .insert(TrackTable)
            .values({
                companyName: companyName,
                dateApplied: dateApplied,
                userId: user?.id
            })
            revalidatePath(`/track/${user?.id}`);
        return { message: "Track Created", status: "success" };
    } catch (e) {
        return { message: `Not able to create track, Please try again!`, status: "error" };
    }

}
