"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

import { Loader2, Plus } from "lucide-react";

import { useRouter } from "next/navigation";

enum ContactMethods {
  Email,
  TextMessage,
}

const formSchema = z.object({
  title: z.string().min(2).max(50),
  method: z.enum(["email", "text-message"]),
});

export function CreateDraftButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      method: "email",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedTitle = values.title.replace(/\s+/g, "-").replace(/&/g, "-");
    if (values.method === "email") {
      router.push("/dashboard/write/new-notification/email/" + formattedTitle);
    } else {
      router.push(
        "/dashboard/write/new-notification/text-message/?title=" +
          formattedTitle
      );
    }
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(isOpen) => {
          setIsOpen(isOpen);
          form.reset();
        }}
      >
        <DialogTrigger asChild>
          <div>
            <Card className="w-[200px] h-[200px] flex flex-col items-center justify-center cursor-pointer">
              <Plus className="w-8 h-8 mb-3" />
              <h4 className="text-sm">Create New</h4>
            </Card>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-8">
              Create a new notification.
            </DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Title of your notification"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="method"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Notification Method</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-4 items-center"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="email" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Email
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="text-message" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Text Message (SMS/MMS)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />{" "}
                  <Button
                    className="flex gap-2 "
                    type="submit"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting && (
                      <Loader2 className="animate-spin h-4 w-4" />
                    )}
                    Continue
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function DraftCard() {
  return <div>Card</div>;
}
