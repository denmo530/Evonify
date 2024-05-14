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
import EventsCarousel from "../_components/events-carousel";

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
  const [query, setQuery] = React.useState("");

  const user = useUser();
  const organization = useOrganization();

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded)
    orgId = organization.organization?.id ?? user.user?.id;

  const orgName =
    organization.organization?.name ??
    user.user?.username ??
    user.user?.primaryEmailAddress?.emailAddress;

  const events = useQuery(
    api.events.getEvents,
    orgId ? { orgId, query } : "skip"
  );

  const activeEvents = events?.filter(
    (event) => new Date(event.date) > new Date()
  );

  const previousEvents = events?.filter(
    (event) => new Date(event.date) < new Date()
  );

  const isLoading = events === undefined;

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

          <div className="mt-8 mb-8">
            <h2 className="text-2xl font-semibold">Active Events</h2>
            <EventsCarousel events={activeEvents} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Previous Events</h2>
            <EventsCarousel events={previousEvents} />
          </div>
        </>
      )}
    </main>
  );
}
