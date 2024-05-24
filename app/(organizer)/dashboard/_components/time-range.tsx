import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";

interface TimeRangeInputProps {
  form: any;
}

export function TimeRangeInput({ form }: TimeRangeInputProps) {
  return (
    <div className="flex  gap-4">
      <FormField
        control={form.control}
        name="time.start"
        render={({ field }) => (
          <>
            <FormItem>
              <FormControl>
                <>
                  <FormLabel htmlFor="start-time">Start Time</FormLabel>
                  <Input
                    className="focus:outline-none focus:shadow-none focus:border-none"
                    id="start-time"
                    type="time"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </>
              </FormControl>
            </FormItem>
          </>
        )}
      />
      <FormField
        control={form.control}
        name="time.end"
        render={({ field }) => (
          <>
            <FormItem>
              <FormControl>
                <>
                  <FormLabel htmlFor="end-time">End Time</FormLabel>
                  <Input
                    className="focus:outline-none focus:shadow-none focus:border-none"
                    id="end-time"
                    type="time"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </>
              </FormControl>
            </FormItem>
          </>
        )}
      />
    </div>
  );
}
