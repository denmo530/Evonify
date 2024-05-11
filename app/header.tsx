import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import { BellRing } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <div className="border-b py-4 light:bg-gray-50 ">
      <div className=" flex items-center container mx-auto justify-between">
        <div className="flex gap-2 font-bold text-xl dark:text-white">
          <BellRing />
          <Link href={"/"}>Evonify</Link>
        </div>
        <div className="flex gap-4">
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <Button variant={"outline"}>Organizer</Button>
            <SignInButton mode="modal">
              <Button>Sign in</Button>
            </SignInButton>
          </SignedOut>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
