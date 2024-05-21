"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useToast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useMutation } from "convex/react";

export function DeleteDialog({
  open,
  setOpen,
  eventId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  eventId: Id<"events">;
}) {
  const { toast } = useToast();
  const deleteEvent = useMutation(api.events.deleteEvent);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
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
            className="bg-red-600 hover:bg-red-700 dark:text-white"
            onClick={async () => {
              await deleteEvent({ eventId: eventId });

              toast({
                variant: "default",
                title: "Event Deleted",
                description:
                  "Your event has been successfully deleted, and a notification has been sent to guests.",
              });
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
