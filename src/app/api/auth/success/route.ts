import { db } from "@/db"
import { UserTable } from "@/db/schema/user"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export const GET = async () => {

    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user || user == null || !user.id) {
        return new Response(null, { status: 401 })
    }
    console.log(user.id)
    const dbUser = await db.select().from(UserTable).where(eq(UserTable.userId,user.id))
    console.log(dbUser)
    if (!dbUser || dbUser.length == 0) {
        console.log("user not found")
        try {
            await db.insert(UserTable).values({
                userId: user.id,
                firstName: user.given_name,
                lastName: user.family_name,
                email: user.email
            })

        } catch (e: any) {
            return new Response(e, { status: 401 })
        }
    }
    return NextResponse.redirect(process.env.HOME_URL!)
}
