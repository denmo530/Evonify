import { Card } from "@/components/ui/card";
import React from "react";
import DashboardCard from "./dashboard-card";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
export default function OverviewCards({ orgId }: { orgId: string }) {
  const subscribers = useQuery(
    api.subscribers.getSubscribers,
    orgId ? { orgId } : "skip"
  );

  const isLoading = subscribers === undefined;
  let currentDate = new Date();
  let fourWeeksAgoDate = new Date(currentDate);
  fourWeeksAgoDate.setDate(fourWeeksAgoDate.getDate() - 28);

  let subscribersFourWeeksAgo =
    subscribers?.filter(
      (subscriber) => new Date(subscriber._creationTime) >= fourWeeksAgoDate
    ).length ?? 0;

  let currentSubscriberCount = subscribers?.length ?? 0;

  let percentageGrowth =
    ((currentSubscriberCount - subscribersFourWeeksAgo) /
      subscribersFourWeeksAgo) *
    100;

  const subscribersData = {
    title: "Subscribers",
    description: "Amount of total subscribers to your events.",
    percentageGrowth: percentageGrowth,
    comparisonAmount: subscribersFourWeeksAgo,
    amount: subscribers?.length,
  };

  return (
    <div>
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24 text-gray-600">
          <Loader2 className="h-32 w-32 animate-spin" />
          <div className="text-xl">Loading your data...</div>
        </div>
      )}
      {!isLoading && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          <DashboardCard data={subscribersData} />
          {/* <DashboardCard />
        <DashboardCard /> */}
        </div>
      )}
    </div>
  );
}
