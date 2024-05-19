import { ModeToggle } from "@/app/mode-toggle";
import { OrganizationSwitcher, useClerk, UserButton } from "@clerk/nextjs";
import { BellRing } from "lucide-react";
import Link from "next/link";

export function Header() {
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

            <div
              className={
                "flex w-4/12 flex-1 items-center justify-end space-x-4"
              }
            >
              <div className={"hidden space-x-2 lg:flex gap-4"}>
                <OrganizationSwitcher />
                <UserButton />

                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
