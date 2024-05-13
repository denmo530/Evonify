"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import React from "react";
import CreateButton from "../_components/create-button";
import EventCard from "../_components/event-card";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { SearchBar } from "../_components/search-bar";
import Link from "next/link";

function Placeholder() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-24">
      <Image
        alt="Image of messages."
        width={300}
        height={300}
        src="/no_events.svg"
      />
      <div className="text-lg">
        You have no active events, go ahead and create an event!
      </div>
      <CreateButton />
    </div>
  );
}

export default function Events() {
  const user = useUser();
  const organization = useOrganization();

  const [query, setQuery] = React.useState("");

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded)
    orgId = organization.organization?.id ?? user.user?.id;

  const events = useQuery(
    api.events.getEvents,
    orgId ? { orgId, query } : "skip"
  );

  const isLoading = events === undefined;

  const orgName =
    organization.organization?.name ??
    user.user?.username ??
    user.user?.primaryEmailAddress?.emailAddress;

  return (
    <main className="container mx-auto pt-12">
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24 text-gray-600">
          <Loader2 className="h-32 w-32 animate-spin" />
          <div className="text-xl">Loading your events...</div>
        </div>
      )}

      <div>
        <Link href={`/subscribe/${orgId}`}>Link to subscription page</Link>
      </div>

      {!isLoading && (
        <>
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold">Your Events</h1>
              <div className="text-muted-foreground text-sm px-2">
                Organization{" "}
                <span className="text-[#D4145A]">
                  {orgName?.toLocaleUpperCase()}
                </span>
              </div>
            </div>
            <CreateButton />
          </div>
          <SearchBar setQuery={setQuery} query={query} />

          {events?.length === 0 && <Placeholder />}

          <div className="grid grid-cols-3 gap-4 mt-4">
            {events?.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
