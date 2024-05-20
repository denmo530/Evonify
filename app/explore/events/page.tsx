import React from "react";
import Image from "next/image";
import { SearchBar } from "@/app/components/search-bar";
import { Loader2 } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { query } from "@/convex/_generated/server";
import { revalidatePath } from "next/cache";
import { EventCard, IEvent } from "@/app/components/event-card";
import { Doc } from "@/convex/_generated/dataModel";
import { clerkClient } from "@clerk/nextjs/server";
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
        Looks like there are no events here, give it some time!
      </div>
    </div>
  );
}

export const revalidate = 3600; // 1 hour

export default async function Events() {
  const events = await fetchQuery(api.events.getEvents, {});

  const isLoading = events === undefined;

  const activeEvents = events.filter(
    (event) => new Date(event.date) > new Date()
  );

  function addOwnerToEvents(events: Doc<"events">[]): Promise<IEvent[]> {
    const modifiedEvents = events.map(async (event) => {
      if (event.orgId.includes("org_")) {
        const org = await clerkClient.organizations.getOrganization({
          organizationId: event.orgId,
        });

        return { ...event, owner: org.name };
      } else if (event.orgId.includes("user_")) {
        const user = await clerkClient.users.getUser(event.orgId);

        return { ...event, owner: user.fullName };
      }

      return { ...event, owner: "Unknown" };
    });

    return Promise.all(modifiedEvents);
  }

  const modifiedEvents = await addOwnerToEvents(activeEvents);

  return (
    <main className="container mx-auto pt-12 w-full">
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24 text-gray-600">
          <Loader2 className="h-32 w-32 animate-spin" />
          <div className="text-xl">Loading events...</div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="flex flex-col justify-between mb-8 ">
            <div className="max-w-prose space-y-4 mb-8">
              <h1 className="text-4xl font-bold">Browse Events</h1>
              <p className="text-muted-foreground">
                Welcome to the Explore Events page! Here, you can discover a
                wide range of events tailored to your interests. Whether
                you&apos;re looking for local meetups, international
                conferences, workshops, or social gatherings, you&apos;ll find
                something that piques your curiosity.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
              {modifiedEvents &&
                modifiedEvents.map((event) => {
                  return <EventCard key={event._id} event={event} />;
                })}
            </div>
          </div>
          {/* <SearchBar setQuery={setQuery} query={query} /> */}
        </>
      )}
    </main>
  );
}
