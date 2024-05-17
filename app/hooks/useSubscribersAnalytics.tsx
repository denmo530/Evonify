"use client";

import { useCallback, useEffect, useState } from "react";

import { getSubscribersData } from "../(organizer)/dashboard/actions/dashboard-analytics";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { IMonthData } from "@/lib/data-analytics";

const useSubscribersAnalytics = (subscribers: Doc<"subscribers">[]) => {
  const [subscribersData, setSubscribersData] = useState<IMonthData[]>([]);
  const [loading, setLoading] = useState(true);

  const SubscribersAnalytics = useCallback(async () => {
    const data = await getSubscribersData(subscribers);
    if (data) {
      setSubscribersData(data?.last7Months);
    }
    setLoading(false);
  }, [subscribers]);

  useEffect(() => {
    SubscribersAnalytics();
  }, [SubscribersAnalytics]);

  return { subscribersData, loading };
};

export default useSubscribersAnalytics;
