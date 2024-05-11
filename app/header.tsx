import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";

export function Header() {
  return (
    <div className="border-b py-4 bg-gray-50">
      <div className=" flex items-center container mx-auto justify-between">
        <div>Evonify</div>
        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignedIn>
            <SignOutButton>
              <Button variant={"ghost"}>Sign out</Button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign in</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
