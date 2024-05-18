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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { MoreVertical, TrashIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

export function EventCardActions({ event }: { event: Doc<"events"> }) {
  const deleteEvent = useMutation(api.events.deleteEvent);

  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

  const { toast } = useToast();

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              event and send a notification to guests informing them of the
              event&apos;s cancellation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                await deleteEvent({ eventId: event._id });

                toast({
                  variant: "default",
                  title: "Event Deleted",
                  description:
                    "Your event has been successfully delted, and a notification has been sent to guests.",
                });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex gap-2 text-red-600 items-center cursor-pointer"
            onClick={() => setIsConfirmOpen(true)}
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
  event: Doc<"events"> & { url: string | null };
}) {
  return (
    <Card className="w-auto">
      <CardHeader className="relative mb-4 ">
        {event.url && (
          <div className="overflow-hidden h-16">
            <Image alt={event.name} fill objectFit="cover" src={event.url} />
          </div>
        )}
        {/* <CardDescription>{event.description}</CardDescription> */}
      </CardHeader>
      <CardContent className="space-y-2 prose relative">
        <div className="absolute top-2 right-2">
          <EventCardActions event={event} />
        </div>
        <CardTitle className="text-lg">{event.name}</CardTitle>
        <div className="text-sm">
          <p>{event.description}</p>
          <p>{event.date}</p>
          <p>{event.location}</p>
        </div>
      </CardContent>
      <CardFooter>
        {
          // Todo: Send notification dialog. Only for premium users
        }
        <Button>Send Notification</Button>
      </CardFooter>
    </Card>
  );
}
