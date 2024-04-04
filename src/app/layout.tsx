import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import MaxWidthWrapper from "@/components/ui/maxwidthwrapper";
import { ThemeProvider } from "@/components/ui/themeprovider";
import "@uploadthing/react/styles.css";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/footer";
import { ReactQueryClientProvider } from "./QueryProvider";
import { cn } from "@/lib/utils";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Resume Sync",
    description: "Organize resumes with version control, track applications, and join a supportive community for career insights.",
     verification: {
    google: 'Kz4X8YFeEdRYjtTEh42enOqBMhgp54UK8Hcr9o04xJ8',
    
  }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <Head>
                <meta name="google-site-verification" content="Kz4X8YFeEdRYjtTEh42enOqBMhgp54UK8Hcr9o04xJ8" />
            </Head>
            <body className={cn(inter.className, "flex flex-col min-h-screen")}>
                <ThemeProvider attribute="class">
                    <ReactQueryClientProvider>
                        <Navbar />
                        <MaxWidthWrapper>{children}</MaxWidthWrapper>
                        <Footer />
                    </ReactQueryClientProvider>
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    );
}
