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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
  FormDescription,
} from "@/components/ui/form";

import { useToast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useMutation } from "convex/react";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import { generateUploadUrl } from "@/convex/events";

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

const formSchema = z.object({
  name: z.string().min(0).max(100).optional(),
  date: z.date().optional(),
  location: z.string().min(0).max(100).optional(),
  description: z.string().min(0).max(200).optional(),
  img: z.custom((val) => val instanceof FileList, "Required").optional(),
  // .refine((files: any) => files.length > 0, "Required")
});

export function EditDialog({
  open,
  setOpen,
  event,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  event: Doc<"events"> & { url: string | null };
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: undefined,
      location: "",
      description: "",
      img: undefined,
    },
  });

  const generateUploadUrl = useMutation(api.events.generateUploadUrl);
  const updateEvent = useMutation(api.events.updateEvent);

  const imgRef = form.register("img");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!event._id) return;

    // Filter out empty values
    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(
        ([key, value]) => value !== undefined && value !== ""
      )
    );

    if (
      updatedValues.img instanceof FileList &&
      updatedValues.img.length === 0
    ) {
      delete updatedValues.img;
    }

    if (Object.keys(updatedValues).length === 0) {
      return;
    }

    if (updatedValues.img && (updatedValues.img as FileList).length > 0) {
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": (values.img as FileList)[0]!.type },
        body: (values.img as FileList)[0],
      });

      const { storageId } = await result.json();
      // Add storageId to updatedValues
      updatedValues.imgId = storageId;
    }

    try {
      await updateEvent({
        eventId: event._id,
        ...updatedValues,
        imgId: updatedValues.imgId as Id<"_storage">,
      });
      toast({
        title: "Update Successful",
        description: "Event updated successfully.",
      });
      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "An error occurred.",
      });
    }

    try {
      console.log("mutation update");
      //   await updateEvent({
      //     eventId: event._id,
      //     ...updatedValues,
      //     imgId: storageId,
      //   });
      toast({
        title: "Update Successful",
        description: "Event updated successfully.",
      });
      form.reset();

      setOpen(false);
    } catch (error) {}
  }

  const date = new Date(event.date);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          form.reset();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-8">Edit Event</DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? format(field.value, "PPP")
                                : format(event.date, "PPP")}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? field.value : date}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <div className="flex gap-2 justify-center items-center px-0 w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Event name</FormLabel>
                        <FormControl>
                          <Input placeholder={event.name} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder={event.location} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder={event.description} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="img"
                  render={() => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <FormControl>
                        <Input type="file" {...imgRef} />
                      </FormControl>
                      <FormDescription className="relative overflow-hidden w-full h-24 object-contain">
                        {event.url && (
                          <Image src={event.url} alt={event.name} fill />
                        )}
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  Update
                </Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
