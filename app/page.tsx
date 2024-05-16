import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { BellRing } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-10">
      <section className="flex items-center flex-col text-5xl space-y-4">
        <h1 className="max-w-lg font-bold prose-2xl">
          <span className="bg-gradient-to-r from-[#D4145A] via-[#FF5F6D] to-[#FBB03B] inline-block text-transparent bg-clip-text">
            Evonify.
          </span>
          A better way to keep up to date.
        </h1>
        <p className="text-lg  text-muted-foreground text-center prose">
          The only platform needed to market your event and keep up to date.
        </p>
      </section>
      <section>
        <SignedOut>
          <Button className="flex gap-2">
            <BellRing size={18} />
            Subscribe to mailing list.
          </Button>
        </SignedOut>
        <SignedIn>
          <Link href={"/dashboard"}>
            <Button className="flex gap-2">
              <BellRing size={18} />
              Enter Dashboard
            </Button>
          </Link>
        </SignedIn>
      </section>
    </main>
  );
}
