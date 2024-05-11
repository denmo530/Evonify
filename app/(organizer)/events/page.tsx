"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import React from "react";
import CreateButton from "./create-button";
import EventCard from "./event-card";

export default function Events() {
  const user = useUser();
  const organization = useOrganization();

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded)
    orgId = organization.organization?.id ?? user.user?.id;

  const events = useQuery(api.events.getEvents, orgId ? { orgId } : "skip");

  return (
    <main className="container mx-auto pt-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Your Events</h1>
        <CreateButton />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {events?.map((event) => <EventCard key={event._id} event={event} />)}
      </div>
    </main>
  );
}
