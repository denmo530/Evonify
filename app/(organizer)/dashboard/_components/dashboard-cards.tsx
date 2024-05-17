import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { TrendingUp } from "lucide-react";

export interface IDashboardCard {
  title: string | undefined;
  description: string | undefined;
  amount: number | undefined;
  comparisonAmount: number | undefined;
  percentageGrowth: number | undefined;
}
import React, { useCallback } from "react";
import {
  getEventsData,
  getSubscribersData,
} from "../actions/dashboard-analytics";
import { IMonthData } from "@/lib/data-analytics";
import { Doc } from "@/convex/_generated/dataModel";

// TODO: Refactor all cards into one component and pass analytics function as props

export function SubscribersCard({
  subscribers,
}: {
  subscribers: Doc<"subscribers">[];
}) {
  const [lastMonthSubscribers, setLastMonthSubscribers] = React.useState(0);
  const [prevMonthSubscribers, setPrevMonthSubscribers] = React.useState(0);
  const [comparePercentage, setComparePercentage] = React.useState(0);

  const SubscribersAnalytics = useCallback(async () => {
    if (!subscribers) return;

    const res = await getSubscribersData(subscribers);
    if (res) {
      const lastMonthCount = res.last7Months[res.last7Months.length - 1].count;
      const prevLastMonthCount =
        res.last7Months[res.last7Months.length - 2].count;
      let compPercent = 0;

      if (prevLastMonthCount > 0) {
        compPercent = (lastMonthCount - prevLastMonthCount) * 100;
      } else {
        compPercent = 100;
      }

      setLastMonthSubscribers(lastMonthCount);
      setPrevMonthSubscribers(prevLastMonthCount);
      setComparePercentage(compPercent);
    }
  }, [subscribers]);

  React.useEffect(() => {
    SubscribersAnalytics();
  }, [SubscribersAnalytics]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Subscribers</CardTitle>
        <CardDescription>Your subscriber change</CardDescription>
      </CardHeader>
      <CardContent className="flex prose justify-between items-center">
        <div className="text-[18px]">{lastMonthSubscribers}</div>
        <div
          className={cn(
            "flex p-2 items-center rounded-full gap-2 bg-[#DCFCE6] text-green-600"
          )}
        >
          <TrendingUp className="h-6 w-6 rounded-full " />
          <span className="text-xs text-opacity-80 font-medium">
            {comparePercentage}%
          </span>
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground text-xs">
        from {prevMonthSubscribers} (last 4 weeks)
      </CardFooter>
    </Card>
  );
}

export function EventsCard({ events }: { events: Doc<"events">[] }) {
  const [lastMonthCount, setLastMonthCount] = React.useState(0);
  const [prevLastMonthCount, setPrevLastMonthCount] = React.useState(0);
  const [percentage, setPercentage] = React.useState(0);

  const eventsAnalytics = useCallback(async () => {
    if (!events) return;

    const res = await getEventsData(events);
    if (res) {
      const lastMonthCount = res.last7Months[res.last7Months.length - 1].count;
      const prevLastMonthCount =
        res.last7Months[res.last7Months.length - 2].count;
      let compPercent = 0;

      if (prevLastMonthCount > 0) {
        compPercent = (lastMonthCount - prevLastMonthCount) * 100;
      } else {
        compPercent = 100;
      }

      setLastMonthCount(lastMonthCount);
      setPrevLastMonthCount(prevLastMonthCount);
      setPercentage(compPercent);
    }
  }, [events]);

  React.useEffect(() => {
    eventsAnalytics();
  }, [eventsAnalytics]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Events</CardTitle>
        <CardDescription>Events analytics</CardDescription>
      </CardHeader>
      <CardContent className="flex prose justify-between items-center">
        <div className="text-[18px]">{lastMonthCount}</div>
        <div
          className={cn(
            "flex p-2 items-center rounded-full gap-2 bg-[#DCFCE6] text-green-600"
          )}
        >
          <TrendingUp className="h-6 w-6 rounded-full " />
          <span className="text-xs text-opacity-80 font-medium">
            {percentage}%
          </span>
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground text-xs">
        from {prevLastMonthCount} (last 4 weeks)
      </CardFooter>
    </Card>
  );
}
