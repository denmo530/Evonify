"use server";
import { fetchQuery } from "convex/nextjs";

import { Doc } from "@/convex/_generated/dataModel";
import { generateAnalytics } from "@/lib/data-analytics";
import { api } from "@/convex/_generated/api";
import { subscribe } from "diagnostics_channel";

// export async function getSubscribers(id: string) {
//   const subscribers = await fetchQuery(api.subscribers.getSubscribers, {
//     orgId: id,
//   });

//   return subscribers;
// }

export async function getSubscribersData(subscribers: Doc<"subscribers">[]) {
  try {
    const data = await generateAnalytics(subscribers);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getEventsData(events: Doc<"events">[]) {
  try {
    const data = await generateAnalytics(events);

    return data;
  } catch (error) {
    console.log(error);
  }
}
