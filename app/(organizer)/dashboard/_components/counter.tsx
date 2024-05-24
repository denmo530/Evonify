"use client";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import React from "react";

interface CounterProps {
  title: string;
  subtitle: string;
  form: any;
}

export function Counter({ title, subtitle, form }: CounterProps) {
  const onIncrement = React.useCallback(
    (value: number) => {
      form.setValue("attendeeCount", value + 1);
    },
    [form]
  );

  const onDecrement = React.useCallback(
    (value: number) => {
      if (value === 1) return;

      form.setValue("attendeeCount", value - 1);
    },
    [form]
  );

  return (
    <div className="flex items-start justify-between ">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-muted-foreground">{subtitle}</div>
      </div>
      <FormField
        control={form.control}
        name="attendeeCount"
        render={({ field }) => (
          <>
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg border flex items-center justify-center cursor-pointer text-muted-foreground hover:opacity-80 transition hover:text-primary"
                    onClick={() => onDecrement(field.value)}
                  >
                    <Minus className="w-4 h-4" />
                  </div>
                  <Input
                    className="font-light text-muted-foreground text-base select-none border-none m-0 w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                    min={1}
                    placeholder={field.value ?? 0}
                    {...field}
                  />

                  <div
                    className="w-10 h-10 rounded-lg border flex items-center justify-center cursor-pointer text-muted-foreground hover:opacity-80 transition hover:text-primary"
                    onClick={() => onIncrement(field.value)}
                  >
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          </>
        )}
      />
    </div>
  );
}
