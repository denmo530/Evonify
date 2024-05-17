import { Card } from "@/components/ui/card";
import React from "react";
import { EventsCard, SubscribersCard } from "./dashboard-cards";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";

export default function OverviewCards({ orgId }: { orgId: string }) {
  const subscribers = useQuery(
    api.subscribers.getSubscribers,
    orgId ? { orgId } : "skip"
  );
  const events = useQuery(api.events.getEvents, orgId ? { orgId } : "skip");
  const isLoading = subscribers === undefined || events === undefined;

  return (
    <div>
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24 text-gray-600">
          <Loader2 className="h-32 w-32 animate-spin" />
          <div className="text-xl">Loading your data...</div>
        </div>
      )}

      <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 mt-2">
        {subscribers && <SubscribersCard subscribers={subscribers} />}
        {events && <EventsCard events={events} />}
      </div>
    </div>
  );
}
