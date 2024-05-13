"use client";

import React from "react";

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
import { Button } from "@/components/ui/button";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().min(0).max(100).email("This is not a proper email."),
});

export default function SubscribePage({
  params,
}: {
  params: { orgId: string };
}) {
  const orgId = params.orgId;

  const createSubscriber = useMutation(api.subscribers.createSubscriber);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.email || !orgId) return;

    try {
      await createSubscriber({
        email: values.email,
        orgId: orgId,
      });

      form.reset();

      toast({
        variant: "success",
        title: `Subscribed successfully`,
        description: `You have subscribed to ${orgId}'s mailing list.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description:
          "Something went wrong with subscribing to mailing list, please try again later. ",
      });
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-10">
      <div className="flex items-center flex-col text-5xl space-y-4 justify-center">
        <h1 className="max-w-lg font-bold bg-gradient-to-r from-[#D4145A] via-[#FF5F6D] to-[#FBB03B] inline-block text-transparent bg-clip-text">
          {orgId} 👋
        </h1>
        <p className="text-lg  text-muted-foreground text-center prose max-w-2xl">
          Stay in the loop with our latest events! Join our mailing list to
          receive exclusive updates and invitations straight to your inbox. Be
          the first to know about upcoming events and never miss out on a great
          experience. Sign up now and be part of our vibrant community!
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-2 items-center pt-8 "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size={"sm"}
              className="flex items-center gap-2 "
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Subscribe
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
