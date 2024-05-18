"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { EventCardActions } from "../(organizer)/dashboard/_components/event-card";
import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { useUser, useOrganization } from "@clerk/nextjs";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

export interface IEvent extends Doc<"events"> {
  url?: string | null;
  owner: string | null;
}

export function EventCard({ event }: { event: IEvent }) {
  const date = new Date(event.date).toDateString();

  return (
    <Card className="w-auto">
      <CardHeader className="relative mb-4 ">
        {event.url && (
          <div className="overflow-hidden h-16">
            <Image alt={event.name} fill objectFit="cover" src={event.url} />
          </div>
        )}
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 prose">
        <CardTitle className="text-lg flex justify-between items-center">
          {event.name}{" "}
          <div className="text-sm text-muted-foreground">by {event.owner}</div>
        </CardTitle>
        <p className="light:text-slate-600 text-sm">{event.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between ">
        <Button>Add Notification</Button>
        <div className="flex flex-col items-end text-sm text-muted-foreground">
          <p>{event.location}</p>
          <p>{date}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
