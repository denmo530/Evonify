"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import React from "react";
import CreateButton from "../_components/create-button";
import Image from "next/image";
import { Loader2, SlashIcon } from "lucide-react";
import { SearchBar } from "../../../components/search-bar";
import EventsCarousel from "../_components/events-carousel";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

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

function BreadCrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard/events">Events</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
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
    user.user?.fullName ??
    user.user?.primaryEmailAddress?.emailAddress;

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

  const isLoading = prevEventsLoading || activeEventsLoading;

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
          <div className="mb-4">
            <BreadCrumb />
          </div>
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

          {activeEvents?.length === 0 && prevEvents.length === 0 && (
            <Placeholder />
          )}

          <div className="mt-8 space-y-8">
            {activeEvents && activeEvents.length > 0 && (
              <div>
                <EventsCarousel
                  events={activeEvents}
                  loadMore={() => loadMoreActiveEvents(1)}
                  status={activeEventsStatus}
                  heading="Active Events"
                />
              </div>
            )}

            {prevEvents && prevEvents.length > 0 && (
              <div>
                <EventsCarousel
                  events={prevEvents}
                  loadMore={() => loadMorePrevEvents(1)}
                  status={prevEventsStatus}
                  heading="Previous Events"
                />
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}
