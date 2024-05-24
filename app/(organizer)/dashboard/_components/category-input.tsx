"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";

interface CategoryInputProps {
  label: string;
  icon: React.ReactNode;
  selected?: boolean;
  form: any;
}

export function CategoryInput({ label, icon, form }: CategoryInputProps) {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <>
          <FormItem>
            <FormControl>
              <div
                onClick={() => form.setValue("category", label)}
                className={cn(
                  "rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-primary cursor-pointer",
                  field.value === label && "border-primary"
                )}
              >
                {icon}
                <div className="font-semibold text-sm">{label}</div>
              </div>
            </FormControl>
          </FormItem>
        </>
      )}
    />
  );
}
