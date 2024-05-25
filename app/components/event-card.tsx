"use client";

import Image from "next/image";

import { format } from "date-fns";

import { IEvent } from "../types";

interface EventCardProps {
  event: IEvent;
  organizer?: string;
}

export function EventCard({ event, organizer }: EventCardProps) {
  const formattedFrom = format(event.date.from, "MMM d");
  const formattedTo = event.date.to ? format(event.date?.to, "MMM d") : "TBD";

  return (
    <div className="col-span-1 group">
      <div className="flex flex-col gap-2 w-full">
        <div className="rounded-xl aspect-square w-full relative overflow-hidden cursor-pointer mb-1 ">
          {event.urls && (
            <Image
              src={event.urls[0]}
              fill
              alt={event.name}
              className="object-cover h-full w-full group-hover:scale-110 transition-all duration-200"
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="font-medium text-base">{event.name}</div>
          <div className="font-light text-xs truncate text-muted-foreground hover:text-primary transition-all duration-300 cursor-pointer">
            {organizer}
          </div>
        </div>
        <div className="font-light text-muted-foreground text-sm">
          {event.location.region}
        </div>
        <div className="font-light text-muted-foreground text-xs">
          {formattedFrom} - {formattedTo}
        </div>
        <div></div>
      </div>
    </div>
  );
}
