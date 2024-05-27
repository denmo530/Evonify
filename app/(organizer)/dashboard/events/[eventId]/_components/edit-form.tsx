"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../../_components/event-creation-wizard";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Location } from "./location";
import { IEvent } from "@/app/types";

export function EditForm({ event }: { event: IEvent }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      location: {
        label: "",
        value: "",
        flag: "",
        region: "",
        latlng: [51, -0.09],
      },
      name: "",
      description: "",
      date: {
        from: undefined,
        to: undefined,
      },
      attendeeCount: undefined,
      tags: [],
      imgIds: [],
      time: { start: "", end: "" },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <ScrollArea className="h-2/3 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground text-sm font-base">
                  Title
                </FormLabel>
                <FormControl>
                  <Input {...field} value={event?.name} />
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
                <FormLabel className="text-muted-foreground text-sm font-base">
                  Description
                </FormLabel>
                <FormControl>
                  <Input placeholder="Description of event" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground text-sm font-base">
                  Category
                </FormLabel>
                <FormControl>
                  <Input placeholder="Category of event" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Location form={form} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </ScrollArea>
  );
}
