"use server"

import { db } from "@/db";
import { TrackTable } from "@/db/schema/track";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
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
                userId: user?.id,
                status: "1"
            })
        revalidatePath(`/track/${user?.id}`);
        return { message: "Track Created", status: "success" };
    } catch (e) {
        return { message: `Not able to create track, Please try again!`, status: "error" };
    }

}

interface UpdateTrackStatusInterface {
    trackId: string,
    statusId: string
}
export const UpdateTrackStatus = async ({ trackId, statusId }: UpdateTrackStatusInterface) => {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        await db
            .update(TrackTable)
            .set({
                status: statusId
            })
            .where(eq(TrackTable.TrackId, trackId));
        revalidatePath(`/track/${user?.id}`);
        return { message: "Track Status Updated", status: "success" };
    } catch (e) {
        return { message: `Not able to update track status, Please try again!`, status: "error" };
    }

}
