"use client";

import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  useClerk,
  UserButton,
} from "@clerk/nextjs";
import { BellRing } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  const clerk = useClerk();

  return (
    <header className="inset-x-0 z-30 w-full py-4  mx-auto  border-b light:bg-gray-50 transition-all duration-300 ">
      <nav className=" w-full flex items-center">
        <div className="mx-auto container px-4 lg:px-20 pt-0">
          {/* Mobile header */}
          <div className="w-full items-center flex flex-row justify-between md:hidden"></div>

          {/* Desktop header */}
          <div className="flex flex-row items-center">
            <div className={"flex w-4/12 items-center space-x-4 lg:space-x-8"}>
              <div className={"hidden items-center space-x-0.5 lg:flex"}>
                <Link
                  href={"/"}
                  className="font-bold flex items-center gap-2 text-lg"
                >
                  <BellRing className="dark:text-white h-5 w-5 " />
                  <h3>Evonify</h3>
                </Link>
              </div>
            </div>

            <div className={"flex w-4/12 justify-center"}>
              <div className="hidden md:flex space-x-8 items-center justify-center ">
                <Button
                  variant={"link"}
                  className="text-sm font-medium hover:text-neutral-900 text-neutral-500 duration-200 dark:text-neutral-400 dark:hover:text-white hover:cursor-pointer"
                >
                  Features
                </Button>
                <Button
                  variant={"link"}
                  className="text-sm font-medium hover:text-neutral-900 text-neutral-500 duration-200 dark:text-neutral-400 dark:hover:text-white hover:cursor-pointer"
                >
                  Pricing
                </Button>
                <Link
                  href="#"
                  className="text-sm font-base hover:text-neutral-900 text-neutral-500 duration-200 dark:text-neutral-400 dark:hover:text-white hover:cursor-pointer"
                >
                  Changelog
                </Link>
                <Link
                  href="#"
                  className="text-sm font-base hover:text-neutral-900 text-neutral-500 duration-200 dark:text-neutral-400 dark:hover:text-white hover:cursor-pointer"
                >
                  Roadmap
                </Link>
              </div>
            </div>

            <div
              className={
                "flex w-4/12 flex-1 items-center justify-end space-x-4"
              }
            >
              <div className={"hidden space-x-2 lg:flex gap-4"}>
                <SignedIn>
                  <OrganizationSwitcher />
                  <UserButton />
                </SignedIn>

                <SignedOut>
                  <div className="hidden md:flex items-center ">
                    <span
                      onClick={() => clerk.openSignIn()}
                      className="text-sm font-medium hover:text-neutral-900 text-neutral-500 duration-200 dark:text-neutral-400 dark:hover:text-white hover:cursor-pointer"
                    >
                      Login
                    </span>
                  </div>
                  <SignUpButton mode="modal">
                    <Button className="inline-flex items-center justify-center font-semibold h-9 text-sm transition duration-200">
                      Get Started Now
                    </Button>
                  </SignUpButton>
                </SignedOut>
                {/* <ModeToggle /> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

// <div className="w-full items-center hidden flex-row justify-between md:flex">
// <div className="flex items-center gap-2 font-bold text-xl ">
//   <Link
//     href={"/"}
//     className="font-bold flex items-center gap-2 text-lg"
//   >
//     <BellRing className="dark:text-white h-5 w-5 " />
//     <h3>Evonify</h3>
//   </Link>
// </div>

// {/* Center Links */}
// <div className="hidden md:flex space-x-8 items-center justify-center ">
//   <Button
//     variant={"link"}
//     className="text-sm font-medium hover:text-neutral-900 text-neutral-500 duration-200 dark:text-neutral-400 dark:hover:text-white hover:cursor-pointer"
//   >
//     Features
//   </Button>
//   <Button
//     variant={"link"}
//     className="text-sm font-medium hover:text-neutral-900 text-neutral-500 duration-200 dark:text-neutral-400 dark:hover:text-white hover:cursor-pointer"
//   >
//     Pricing
//   </Button>
//   <Link
//     href="#"
//     className="text-sm font-base hover:text-neutral-900 text-neutral-500 duration-200 dark:text-neutral-400 dark:hover:text-white hover:cursor-pointer"
//   >
//     Changelog
//   </Link>
//   <Link
//     href="#"
//     className="text-sm font-base hover:text-neutral-900 text-neutral-500 duration-200 dark:text-neutral-400 dark:hover:text-white hover:cursor-pointer"
//   >
//     Roadmap
//   </Link>
// </div>

// <div className="flex flex-row items-center space-x-4">
//   <SignedIn>
//     <OrganizationSwitcher />
//     <UserButton />
//   </SignedIn>

//   <SignedOut>
//     <div className="hidden md:flex ">
//       <span
//         onClick={() => clerk.openSignIn()}
//         className="text-sm font-medium hover:text-neutral-900 text-neutral-500 duration-200 dark:text-neutral-400 dark:hover:text-white hover:cursor-pointer"
//       >
//         Login
//       </span>
//     </div>
//     <SignUpButton mode="modal">
//       <Button className="inline-flex items-center justify-center font-semibold h-9 text-sm transition duration-200">
//         Get Started Now
//       </Button>
//     </SignUpButton>
//   </SignedOut>
//   {/* <ModeToggle /> */}
// </div>
// </div>
