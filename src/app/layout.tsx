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
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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
