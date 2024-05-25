"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import React from "react";
import CreateButton from "../_components/create-button";
import Image from "next/image";
import { Loader2 } from "lucide-react";

import { EventWizard } from "../_components/event-creation-wizard";
import { IEvent } from "@/app/types";
import Link from "next/link";
import EventCard from "../_components/event-card";

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

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded)
    orgId = organization.organization?.id ?? user.user?.id;

  const {
    results: prevEvents,
    isLoading: prevEventsLoading,
    status: prevEventsStatus,
    loadMore: loadMorePrevEvents,
  } = usePaginatedQuery(
    api.events.getPrevEventsByUser,
    orgId ? { orgId } : "skip",
    { initialNumItems: 5 }
  );

  const {
    results: activeEvents,
    status: activeEventsStatus,
    isLoading: activeEventsLoading,
    loadMore: loadMoreActiveEvents,
  } = usePaginatedQuery(
    api.events.getActiveEventsByUser,
    orgId ? { orgId } : "skip",
    { initialNumItems: 5 }
  );

  const isLoading = activeEventsLoading || prevEventsLoading;

  return (
    <main className="container mx-auto pt-12">
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24 text-gray-600">
          <Loader2 className="h-32 w-32 animate-spin" />
          <div className="text-xl">Loading your events...</div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="flex justify-between items-center mb-8">
            <div className=" leading-relaxed space-y-2">
              <h1 className="text-3xl font-bold">Your Events</h1>
              <p className="text-muted-foreground text-sm">
                Here you can create new events and manage your existing ones.
              </p>
            </div>
            <EventWizard orgId={orgId} />
          </div>

          {activeEvents?.length === 0 && prevEvents.length === 0 && (
            <Placeholder />
          )}

          {activeEvents && activeEvents.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-medium">Your Active Events</h2>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
                {activeEvents.map((event) => (
                  <EventCard key={event._id} event={event as IEvent} />
                ))}
              </div>
            </div>
          )}
          {prevEvents && prevEvents.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-medium">Your Past Events</h2>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {prevEvents.map((event) => (
                  <EventCard key={event._id} event={event as IEvent} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
