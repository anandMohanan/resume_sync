import { db } from "@/db"
import { TrackForm } from "./TrackForm"
import { TrackTable } from "@/db/schema/track"
import { eq } from "drizzle-orm"

interface TrackPageParams {
    params: {
        userId: string
    }

}

const TrackPage = async ({ params }: TrackPageParams) => {
    const data = await db.select({ id: TrackTable.TrackId,companyName: TrackTable.companyName, dataApplied: TrackTable.dateApplied, status: TrackTable.status }).from(TrackTable).where(eq(TrackTable.userId, params.userId));
    return (
        <>
            <TrackForm />
            {
                data.map((track) => {
                    return (
                        <div className="w-full sm:p-4" key={track.id}>
                            <div className="flex justify-between align-middle items-center m-auto p-5">
                                <p className="font-bold">
                                    {track.companyName}
                                </p>
                                <p className="font-bold">
                                    {track.dataApplied}
                                </p>
                                <p className="font-bold">
                                    {track.status}
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )

}



export default TrackPage
