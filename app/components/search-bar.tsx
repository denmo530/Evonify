import React, { Dispatch, SetStateAction } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { date, z } from "zod";

import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, SearchIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
  query: z.string().min(0).max(200),
  date: z.date().optional(),
});

export function SearchBar({
  query,
  setQuery,
}: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setQuery(values.query);
  }

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-2  justify-center "
        >
          <div className="flex flex-row items-center justify-center w-full">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="w-3/5">
                  <FormControl>
                    <div className="relative flex">
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 h-4 w-4" />
                      <Input
                        className="px-3 pl-10 pr-3 py-2 h-12 text-sm rounded-s-full border-r-0"
                        placeholder="Your interests, locations"
                        type="text"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"ghost"}
                        className="h-12 px-3 py-2 text-xs text-muted-foreground font-light flex gap-2 border rounded-e-full items-center pr-3 w-full"
                      >
                        {field.value ? (
                          format(field.value, "MMMM d")
                        ) : (
                          <span>Add Date</span>
                        )}
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        {...field}
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />{" "}
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
