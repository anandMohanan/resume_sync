import { FAQ } from "@/components/faq";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Button, buttonVariants } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/hooks";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight, Cable } from "lucide-react";
import Link from "next/link";
const Home = async () => {
    const { getUser, isAuthenticated } = getKindeServerSession()
    const authenticated = await isAuthenticated()
    const user = await getUser();
    return (
        <>
            <div className="lg:relative">
                <div className="absolute inset-x-0 -top-40 -z-10  transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg]
                    bg-gradient-to-tr from-[#ff80b5] z-10 to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                        }} ></div>
                </div>
                {/*                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                    <h1>hi </h1>
                </div> */}
                <div className="lg:sticky top-0 lg:h-screen flex flex-col items-center justify-center mt-12 lg:mt-0 ">
                    <h2 className="lg:text-8xl  text-2xl font-bold">Resume Sync</h2>
                    <p className=" text-center text-xl p-10">
                        Organize resumes with version control, track applications, and join a supportive community for career insights.
                    </p>
                    {
                        !authenticated && (
                            <LoginLink className={buttonVariants()}> Get started <ArrowRight className="h-4 w-4" /></LoginLink>
                        )}
                </div>
                <div className="lg:sticky top-0 lg:h-screen flex flex-col items-center justify-center bg-background ">
                    <Features />
                </div>
                <div className="lg:sticky top-0 h-screen flex flex-col items-center justify-center bg-background ">
                    <FAQ />
                </div>
                <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-background  ">
                    {
                        !authenticated ? (

                            <LoginLink className="text-3xl underline hover:decoration-wavy flex sm:items-center">Ready to take control of your professional journey? </LoginLink>
                        ) : (

                            <Link href={`/resume/${user?.id}`} className="text-3xl underline hover:decoration-wavy flex">Ready to take control of your professional journey? </Link>
                        )
                    }
                </div>
            </div >
        </>
    );
}

export default Home;
