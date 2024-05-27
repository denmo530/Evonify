// components/EventPreview.tsx
import React from "react";
import { IEvent } from "@/app/types";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EventPreviewProps {
  event: IEvent;
  previewMode: "web" | "mobile";
}

const EventPreview: React.FC<EventPreviewProps> = ({ event, previewMode }) => {
  return (
    <div
      className={`${previewMode === "mobile" ? "max-w-[390px]" : "w-full"} p-6 flex container shadow-lg border pb-64 rounded-2xl pt-10  transition-all flex-col items-center gap-6 text-center relative`}
    >
      <div className="relative aspect-square w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] object-contain  transition-all shadow-lg ">
        <Image src={"/message.svg"} alt="event image" fill />
      </div>
      <div className="flex flex-col gap-4 max-w-xl items-center">
        <h1 className="text-xl sm:text-3xl leading-[50px] transition-all font-bold tracking-tight">
          {event.name}
        </h1>
        <p className=" text-lg sm:text-xl transition-all max-w-lg tracking-tight leading-normal text-muted-foreground">
          {event.description}
        </p>
      </div>
      <div className="flex flex-wrap mb-4">
        {event.tags.map((tag) => (
          <span
            key={tag}
            className="bg-special rounded-full px-2 py-1 text-sm mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="items-start w-full flex flex-col gap-4 justify-center max-w-lg">
        <p className="text-lg font-bold">Event Information and Rules</p>
        <div className="w-full flex flex-row gap-4">
          <div className="w-12 h-12 min-w-12 rounded-lg bg-secondary flex items-center justify-center">
            <p className="text-lg font-bold tracking-tight text-start transition-all leading-normal">
              🌄
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-bold tracking-tight text-start transition-all leading-normal">
              Amazing Feature or Perk
            </p>
            <p className="text-md text-start transition-all leading-normal">
              Here&apos;s a description of everything that this feature or perk
              includes.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-row gap-4">
          <div className="w-12 h-12 min-w-12 rounded-lg bg-secondary flex items-center justify-center">
            <p className="text-lg font-bold tracking-tight text-start transition-all leading-normal">
              🌄
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-bold tracking-tight text-start transition-all leading-normal">
              Amazing Feature or Perk
            </p>
            <p className="text-md text-start transition-all leading-normal">
              Here&apos;s a description of everything that this feature or perk
              includes.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-row gap-4">
          <div className="w-12 h-12 min-w-12 rounded-lg bg-secondary flex items-center justify-center">
            <p className="text-lg font-bold tracking-tight text-start transition-all leading-normal">
              🌄
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-bold tracking-tight text-start transition-all leading-normal">
              Amazing Feature or Perk
            </p>
            <p className="text-md text-start transition-all leading-normal">
              Here&apos;s a description of everything that this feature or perk
              includes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPreview;
