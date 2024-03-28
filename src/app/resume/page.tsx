import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

const Page = async () => {
    const { getUser, isAuthenticated } = getKindeServerSession()
    const user = await getUser()
    const authenticated = await isAuthenticated()
    if (authenticated) {
        redirect(`/resume/${user?.id}`)
    }
}
export default Page
