"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import React from "react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  date: z.date(),
  location: z.string().min(2).max(100),
  description: z.string().min(10).max(200),
  img: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, "Required"),
});

export default function CreateButton() {
  const user = useUser();
  const organization = useOrganization();

  const { toast } = useToast();

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded)
    orgId = organization.organization?.id ?? user.user?.id;

  const [isEventDialogOpen, setIsEventDialogOpen] =
    React.useState<boolean>(false);

  const createEvent = useMutation(api.events.createEvent);
  const generateUploadUrl = useMutation(api.events.generateUploadUrl);

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

  const imgRef = form.register("img");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!orgId) return;

    const postUrl = await generateUploadUrl();

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": values.img[0]!.type },
      body: values.img[0],
    });

    const { storageId } = await result.json();

    try {
      await createEvent({
        name: values.name,
        location: values.location,
        date: new Date(values.date).toISOString(),
        description: values.description,
        imgId: storageId,
        orgId,
      });

      form.reset();
      setIsEventDialogOpen(false);

      toast({
        variant: "success",
        title: "Event Created",
        description:
          "Your event has been created, next step is to send out a notification!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Event Creation Failed",
        description:
          "Something went wrong with creating your event. Please try again. ",
      });
    }
  }

  return (
    <Dialog
      open={isEventDialogOpen}
      onOpenChange={(isOpen) => {
        setIsEventDialogOpen(isOpen);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>Add Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-8">Add a new event.</DialogTitle>
          <DialogDescription>
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
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            // disabled={(date) =>
                            //   date > new Date() ||
                            //   date < new Date("1900-01-01")
                            // }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event name</FormLabel>
                      <FormControl>
                        <Input placeholder="name of your event..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="location of your event..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Describe your event..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="flex gap-2 "
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="animate-spin h-4 w-4" />
                  )}
                  Create
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
