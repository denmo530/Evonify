"use client";
import React from "react";
import { Doc } from "@/convex/_generated/dataModel";
import EventCard from "./event-card";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Divide } from "lucide-react";

export interface IEvent extends Doc<"events"> {
  url: string;
}

export default function EventsCarousel({
  events,
  loadMore,
  status,
  heading,
}: {
  events: any;
  loadMore: (numItems: number) => void;
  status: string;
  heading?: string;
}) {
  const [api, setApi] = React.useState<CarouselApi>();

  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, events]);

  const handleScrollNext = () => {
    loadMore(1);
    api?.scrollNext();
  };

  return (
    <>
      <h2 className="text-2xl font-semibold ml-8">{heading}</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        setApi={setApi}
        className="mx-8 mt-6"
      >
        <CarouselContent className="-ml-1">
          {events.map((event: IEvent, index: number) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <EventCard key={event._id} event={event} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {events.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext
              disabled={
                api?.canScrollNext() === false && status === "Exhausted"
              }
              onClick={handleScrollNext}
            />
          </>
        )}
      </Carousel>
    </>
  );
}
