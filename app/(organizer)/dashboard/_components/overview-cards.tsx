import { Card } from "@/components/ui/card";
import React from "react";
import DashboardCard, { IDashboardCard } from "./dashboard-card";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
export default function OverviewCards({ orgId }: { orgId: string }) {
  const subscribers = useQuery(
    api.subscribers.getSubscribers,
    orgId ? { orgId } : "skip"
  );
  const events = useQuery(api.events.getEvents, orgId ? { orgId } : "skip");

  const isLoading = subscribers === undefined;
  let currentDate = new Date();
  let fourWeeksAgoDate = new Date(currentDate);
  fourWeeksAgoDate.setDate(fourWeeksAgoDate.getDate() - 28);

  let subscribersFourWeeksAgo =
    subscribers?.filter(
      (subscriber) => new Date(subscriber._creationTime) >= fourWeeksAgoDate
    ).length ?? 0;

  let currentSubscriberCount = subscribers?.length ?? 0;

  let percentageGrowthSubs = 0;
  if (subscribersFourWeeksAgo !== 0) {
    percentageGrowthSubs =
      ((currentSubscriberCount - subscribersFourWeeksAgo) /
        subscribersFourWeeksAgo) *
      100;
  }

  let eventsFourWeeksAgo =
    events?.filter((event) => new Date(event._creationTime) >= fourWeeksAgoDate)
      .length ?? 0;

  let percentageGrowthEvents = 0;
  if (subscribersFourWeeksAgo !== 0) {
    percentageGrowthEvents =
      ((currentSubscriberCount - subscribersFourWeeksAgo) /
        subscribersFourWeeksAgo) *
      100;
  }

  const data: IDashboardCard[] = [
    {
      title: "Subscribers",
      description: "Amount of total subscribers to your events.",
      percentageGrowth: percentageGrowthSubs,
      comparisonAmount: subscribersFourWeeksAgo,
      amount: subscribers?.length,
    },
    {
      title: "Events",
      description: "Amount of total events created by you.",
      amount: events?.length,
      comparisonAmount: eventsFourWeeksAgo,
      percentageGrowth: percentageGrowthEvents,
    },
    {
      // TODO: Add real data for page visitors
      title: "Opens",
      description: "Amount of total visitors to your affiliation page.",
      amount: events?.length,
      comparisonAmount: eventsFourWeeksAgo,
      percentageGrowth: percentageGrowthEvents,
    },
  ];

  return (
    <div>
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24 text-gray-600">
          <Loader2 className="h-32 w-32 animate-spin" />
          <div className="text-xl">Loading your data...</div>
        </div>
      )}
      {!isLoading && (
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 mt-2">
          {data.map((item, i) => (
            <DashboardCard key={i} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}
