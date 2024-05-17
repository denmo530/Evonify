"use client";
import React from "react";

import { AreaChart, List, ListItem } from "@tremor/react";
import useSubscribersAnalytics from "@/app/hooks/useSubscribersAnalytics";
import { Card } from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export function SubscribersChart({
  subscribers,
}: {
  subscribers: Doc<"subscribers">[];
}) {
  const { loading, subscribersData } = useSubscribersAnalytics(subscribers);

  // Transform the data to match the structure expected by the AreaChart
  const data = subscribersData.map((item) => ({
    date: item.month,
    Subscribers: item?.count,
  }));

  const summary = [
    {
      name: "Total subscribers",
      value: subscribers.length,
    },
    {
      name: "Avg growth",
      value: Math.round(
        subscribersData.reduce((acc, item) => acc + item?.count, 0) /
          subscribersData.length
      ), // Average of counts
    },
    {
      name: "Last month",
      value: subscribersData[subscribersData.length - 1]?.count,
    },
    {
      name: "Max growth",
      value: Math.max(...subscribersData.map((item) => item?.count)), // Maximum count
    },
    {
      name: "Min growth",
      value: Math.min(...subscribersData.map((item) => item?.count)), // Minimum count
    },
  ];

  const valueFormatter = (number: any) =>
    `${Intl.NumberFormat("us").format(number).toString()}`;

  const statusColor = {
    Subscribers: "bg-special",
  };

  return (
    <>
      {!loading && (
        <Card className="sm:max-w-full p-5">
          <h3 className="font-semibold text-lg">Subscriber metrics</h3>
          <AreaChart
            data={data}
            index="date"
            categories={["Subscribers"]}
            colors={["special"]}
            valueFormatter={valueFormatter}
            showLegend={false}
            showYAxis={false}
            showGradient={false}
            startEndOnly={true}
            className="mt-6 h-32"
          />
          <List className="mt-2">
            {summary.map((item) => (
              <ListItem key={item.name}>
                <div>
                  <span
                    className={classNames(statusColor[item.name], "h-0.5 w-3")}
                    aria-hidden={true}
                  />
                  <span>{item.name}</span>
                </div>
                <span className="font-medium ">
                  {valueFormatter(item.value)}
                  {item.name === "Total growth" || "Last month"
                    ? " subscribers"
                    : ""}
                  {item.name === "Avg growth" ? "/month" : ""}
                </span>
              </ListItem>
            ))}
          </List>
        </Card>
      )}
    </>
  );
}
