import React from "react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { BellRing } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="flex items-center flex-col text-5xl space-y-4 mb-32">
      <h1 className="max-w-lg text-center font-bold prose-2xl text-pretty leading-12 ">
        Create, Share and Engage with{" "}
        <span className="bg-gradient-to-r from-[#D4145A] via-[#FF5F6D] to-[#FBB03B] inline-block text-transparent bg-clip-text">
          Evonify.
        </span>{" "}
      </h1>
      <p className="text-lg max-w-xl text-muted-foreground text-center prose text-pretty leading-relaxed">
        One plattform to rule them all. Create events, share them with your
        audience and monitor their engagement. All in one place.
      </p>
      <div className="pt-8">
        <SignedOut>
          <Button className="flex gap-2 items-center font-semibold">
            <BellRing className="w-5 h-5 font-semibold" />
            Join Evonify
          </Button>
        </SignedOut>
        <SignedIn>
          <Link href={"/dashboard"}>
            <Button className="flex gap-2">
              <BellRing className="w-4 h-4" />
              Enter Dashboard
            </Button>
          </Link>
        </SignedIn>
      </div>
    </section>
  );
}
