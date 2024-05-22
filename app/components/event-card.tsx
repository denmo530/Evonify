"use client";

import { Doc } from "@/convex/_generated/dataModel";
import Image from "next/image";

import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Share2 } from "lucide-react";

export interface IEvent extends Doc<"events"> {
  url?: string | null;
  owner: string | null;
}

export function EventCard({ event }: { event: IEvent }) {
  const router = useRouter();
  const date = new Date(event.date).toDateString();
  const formattedDate = format(new Date(event.date), "MMM d");

  return (
    <div className="col-span-1 group">
      <div className="flex flex-col gap-2 w-full">
        <div
          className="rounded-xl aspect-square w-full relative overflow-hidden cursor-pointer mb-1 "
          onClick={() => router.push(`explore/events/${event._id}`)}
        >
          {event.url && (
            <Image
              src={event.url}
              fill
              alt={event.name}
              className="object-cover h-full w-full group-hover:scale-110 transition-all duration-200"
            />
          )}
          {/* <div className="absolute top-3 right-3">
            <Share2 />
          </div> */}
        </div>
        <div className="flex justify-between items-center">
          <div className="font-medium text-base">{event.name}</div>
          <div
            className="font-light text-xs truncate text-muted-foreground hover:text-primary transition-all duration-300 cursor-pointer"
            onClick={() => router.push(`/organisaton/${event.orgId}`)}
          >
            {event.owner}
          </div>
        </div>
        <div className="font-light text-muted-foreground text-sm">
          {event.location}
        </div>
        <div className="font-light text-muted-foreground text-xs">
          {formattedDate}
        </div>
        <div></div>
      </div>
    </div>
  );

  // return (
  //   <Card className="w-auto">
  //     <CardHeader className="relative mb-4 ">
  //       {event.url && (
  //         <div className="overflow-hidden h-16">
  //           <Image alt={event.name} fill objectFit="cover" src={event.url} />
  //         </div>
  //       )}
  //       <CardDescription>{event.description}</CardDescription>
  //     </CardHeader>
  //     <CardContent className="space-y-2 prose">
  //       <CardTitle className="text-lg flex justify-between items-center">
  //         {event.name}{" "}
  //         <div className="text-sm text-muted-foreground">by {event.owner}</div>
  //       </CardTitle>
  //       <p className="light:text-slate-600 text-sm">{event.description}</p>
  //     </CardContent>
  //     <CardFooter className="flex justify-between ">
  //       <Button>Add Notification</Button>
  //       <div className="flex flex-col items-end text-sm text-muted-foreground">
  //         <p>{event.location}</p>
  //         <p>{date}</p>
  //       </div>
  //     </CardFooter>
  //   </Card>
}
