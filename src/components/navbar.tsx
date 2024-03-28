import Link from "next/link";
import {
  Cable,
  CableIcon,
  CircleUser,
  Menu,
  Package2,
  Search,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

export const Navbar = async () => {
  const { isAuthenticated, getUser } = await getKindeServerSession();
  console.log("isAuthenticated", await isAuthenticated());
  console.log("getUser", await getUser());
  const user = await getUser();
  return (
    <div className="">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="flex md:w-full items-center justify-between ">
          <div className="hidden lg:flex gap-3 lg:flex-4">
            <Link href={"/"} className=" text-lg font-semibold md:text-base">
              <Cable className="h-6 w-6" />
              <span className="sr-only">Resume Sync</span>
            </Link>
            <div className="w-10 opacity-0 "></div>
          </div>
          <div className="hidden lg:flex m-auto   lg:gap-x-6">
            <Link
              href={`/resume/${user?.id}`}
              className="text-muted-foreground lg:ml-3 transition-colors hover:text-foreground"
            >
              Resume
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Track
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Community
            </Link>
          </div>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className=" shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Cable className="h-6 w-6" />
                <span className="sr-only">Resume Sync</span>
              </Link>
              <Link
                href="/resume"
                className="text-muted-foreground hover:text-foreground"
              >
                Resume
              </Link>
              <Link
                href="/track"
                className="text-muted-foreground hover:text-foreground"
              >
                Track
              </Link>
              <Link
                href="/community"
                className="text-muted-foreground hover:text-foreground"
              >
                Community
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full md:w-auto justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <ThemeToggle />
          {(await isAuthenticated()) ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Image
                    width={32}
                    height={32}
                    className="rounded-full"
                    src={user?.picture!}
                    alt="Avatar"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {" "}
                  <LogoutLink postLogoutRedirectURL="/"> Logout </LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <LoginLink
              postLoginRedirectURL="/api/auth/success"
              className={buttonVariants()}
            >
              Login
              <span className="sr-only">Login</span>
            </LoginLink>
          )}
          {/*
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <Button variant="secondary" size="icon" className="rounded-full">
    <CircleUser className="h-5 w-5" />
    <span className="sr-only">Toggle user menu</span>
    </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Support</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Logout</DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
    */}
        </div>
      </header>
    </div>
  );
};

// <div className=""> <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6"> <nav className="flex items-center justify-between "> <div className="hidden lg:flex lg:flex-4">
// <Link
// href={"/"}
// className=" text-lg font-semibold md:text-base"
// >
// <Cable className="h-6 w-6" />
// <span className="sr-only">Resume Sync</span>
// </Link>
// </div>
// <div className="hidden lg:flex  lg:gap-x-6">
// <Link
// href={`/resume/${user?.id}`}
// className="text-muted-foreground lg:ml-3 transition-colors hover:text-foreground"
// >
// Resume
// </Link>
// <Link
// href="#"
// className="text-muted-foreground transition-colors hover:text-foreground"
// >
// Track
// </Link>
// <Link
// href="#"
// className="text-muted-foreground transition-colors hover:text-foreground"
// >
// Community
// </Link>
// </div>
// </nav>
// <Sheet>
// <SheetTrigger asChild>
// <Button
// variant="outline"
// size="icon"
// className="shrink-0 md:hidden"
// >
// <Menu className="h-5 w-5" />
// <span className="sr-only">Toggle navigation menu</span>
// </Button>
// </SheetTrigger>
// <SheetContent side="left">
// <nav className="grid gap-6 text-lg font-medium">
// <Link
// href="#"
// className="flex items-center gap-2 text-lg font-semibold"
// >
//
// <Cable className="h-6 w-6" />
// <span className="sr-only">Resume Sync</span>
// </Link>
// <Link
// href="/resume"
// className="text-muted-foreground hover:text-foreground"
// >
// Resume
// </Link>
// <Link
// href="/track"
// className="text-muted-foreground hover:text-foreground"
// >
// Track
// </Link>
// <Link
// href="/community"
// className="text-muted-foreground hover:text-foreground"
// >
// Community
// </Link>
// </nav>
// </SheetContent>
// </Sheet>
// <div className="flex w-full justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
// <ThemeToggle />
// {await isAuthenticated() ? (
//
//         <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//         <Button variant="secondary" size="icon" className="rounded-full">
//         <Image width={32} height={32} className="rounded-full" src={user?.picture} alt="Avatar" />
//         <span className="sr-only">Toggle user menu</span>
//         </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//         <DropdownMenuLabel>My Account</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem>Settings</DropdownMenuItem>
//         <DropdownMenuItem>Support</DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem> <LogoutLink postLogoutRedirectURL="/"> Logout </LogoutLink></DropdownMenuItem>
//         </DropdownMenuContent>
//         </DropdownMenu>
//         ) :
//     (
//
//      <LoginLink postLoginRedirectURL="/api/auth/success" className={buttonVariants()}  >
//      Login
//      <span className="sr-only">Login</span>
//      </LoginLink>
//     )
// }
// {/*
//     <DropdownMenu>
//     <DropdownMenuTrigger asChild>
//     <Button variant="secondary" size="icon" className="rounded-full">
//     <CircleUser className="h-5 w-5" />
//     <span className="sr-only">Toggle user menu</span>
//     </Button>
//     </DropdownMenuTrigger>
//     <DropdownMenuContent align="end">
//     <DropdownMenuLabel>My Account</DropdownMenuLabel>
//     <DropdownMenuSeparator />
//     <DropdownMenuItem>Settings</DropdownMenuItem>
//     <DropdownMenuItem>Support</DropdownMenuItem>
//     <DropdownMenuSeparator />
//     <DropdownMenuItem>Logout</DropdownMenuItem>
//     </DropdownMenuContent>
//     </DropdownMenu>
//     */}
// </div>
// </header>
// </div >
