"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import EventsCarousel from "./_components/events-carousel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import OverviewCards from "./_components/overview-cards";

export default function DashboardPage() {
  const user = useUser();
  const organization = useOrganization();

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded)
    orgId = organization.organization?.id ?? user.user?.id;

  const orgName =
    organization.organization?.name ??
    user.user?.username ??
    user.user?.primaryEmailAddress?.emailAddress;

  const displayName =
    user.user?.username ?? user.user?.primaryEmailAddress?.emailAddress;

  return (
    <main className="container mx-auto pt-12">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold">
            Hello{" "}
            <span className="bg-gradient-to-r from-[#D4145A] via-[#FF5F6D] to-[#FBB03B] inline-block text-transparent bg-clip-text">
              {displayName} 👋
            </span>
          </h1>
          <div className="text-muted-foreground text-sm">
            Organization{" "}
            <span className="text-special">{orgName?.toLocaleUpperCase()}</span>
          </div>
        </div>
      </div>
      <section>
        <p className="text-sm text-muted-foreground">
          Here&apos;s how your subsciption is doing.
        </p>
        <div className="w-full flex">
          <div className="w-full min-h-88vh pr-5">
            <OverviewCards orgId={orgId ?? ""} />
          </div>
        </div>
      </section>
    </main>
  );
}
