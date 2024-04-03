import { db } from "@/db"
import { TrackForm } from "./TrackForm"
import { TrackStatus, TrackTable } from "@/db/schema/track"
import { eq } from "drizzle-orm"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select"
import { TrackContent } from "./TrackContent"
import { DataTable } from "./data-table"
import { columns } from "./columns"

interface TrackPageParams {
    params: {
        userId: string
    }

}

const TrackPage = async ({ params }: TrackPageParams) => {
    const data = await db.select({
        id: TrackTable.TrackId, companyName: TrackTable.companyName,
        dataApplied: TrackTable.dateApplied, status: TrackStatus.status
    })
        .from(TrackTable).leftJoin(TrackStatus, eq(TrackStatus.status_id, TrackTable.status))
        .where(eq(TrackTable.userId, params.userId));

    const status = await db.select({ status_id: TrackStatus.status_id, status: TrackStatus.status }).from(TrackStatus);
    return (
        <>
            <TrackForm />
            <TrackContent data={data} status={status} />
        </>
    )

}



export default TrackPage
