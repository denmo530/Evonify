import { Doc } from "@/convex/_generated/dataModel";
import { generateAnalytics } from "@/lib/data-analytics";

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
