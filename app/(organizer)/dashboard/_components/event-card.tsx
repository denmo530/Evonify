"use client";
import React from "react";

import { Doc, Id } from "@/convex/_generated/dataModel";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Edit, MoreVertical, Share2, TrashIcon } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { DeleteDialog } from "./event-delete-dialog";
import { EditDialog } from "./event-edit-dialog";
import { ShareButton } from "./share-button";
import { format } from "date-fns";

export function EventCardActions({
  event,
}: {
  event: Doc<"events"> & { url: string | null };
}) {
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);

  const { toast } = useToast();

  const isDisabled = event.date.to
    ? new Date(event.date.to) < new Date()
    : new Date(event.date.from) < new Date();

  return (
    <>
      <DeleteDialog
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        eventId={event._id}
      />
      <EditDialog event={event} open={isEditOpen} setOpen={setIsEditOpen} />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex gap-2  items-center cursor-pointer"
            onClick={() => setIsEditOpen(true)}
            disabled={isDisabled}
          >
            <Edit className="h-4 w-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex gap-2 text-red-600 items-center cursor-pointer"
            onClick={() => setIsDeleteOpen(true)}
          >
            <TrashIcon className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default function EventCard({
  event,
}: {
  event: Doc<"events"> & { urls: Id<"_storage">[] };
}) {
  const date = `${format(new Date(event.date.from), "MMM d")}  ${event.date.to ? format(new Date(event.date?.to), "- MMM d") : ""}`;

  const isDisabled = event.date.to
    ? new Date(event.date.to) < new Date()
    : new Date(event.date.from) < new Date();

  return (
    <Card className={`${isDisabled && "opacity-40"}`}>
      <CardHeader className="relative mb-4 ">
        {event.urls && (
          <div className="overflow-hidden h-16 object-contain">
            <Image alt={event.name} fill src={event.urls[0]} />
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-2 prose relative">
        <div className="absolute top-2 right-2 flex gap-2 items-center">
          {/* <ShareButton event={event} />
          <EventCardActions event={event} /> */}
        </div>
        <CardTitle className="text-lg">{event.name}</CardTitle>
        <div className="text-sm">
          <CardDescription className="truncate">
            {event.description}
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Send Notification</Button>
        <div className="text-xs flex  items-end flex-col text-muted-foreground leading-relaxed ">
          <p>{event.location.region}</p>
          <p>{date}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
