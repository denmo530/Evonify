import { Doc } from "@/convex/_generated/dataModel";
import EventCard from "./event-card";

export interface IEvent extends Doc<"events"> {
  url: string;
}

export default function EventsCarousel({ events }: { events: any }) {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4 w-full">
      {events?.map((event: IEvent) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}
