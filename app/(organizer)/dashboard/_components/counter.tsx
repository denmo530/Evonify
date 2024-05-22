"use client";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import React from "react";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

export function Counter({ title, subtitle, value, onChange }: CounterProps) {
  const onIncrement = React.useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onDecrement = React.useCallback(() => {
    if (value === 1) return;

    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex items-start justify-between ">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-muted-foreground">{subtitle}</div>
      </div>
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-lg border flex items-center justify-center cursor-pointer text-muted-foreground hover:opacity-80 transition hover:text-primary"
          onClick={onDecrement}
        >
          <Minus className="w-4 h-4" />
        </div>
        <Input
          className="font-light text-muted-foreground text-base select-none border-none m-0 w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          value={value}
          min={1}
          type="number"
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <div
          className="w-10 h-10 rounded-lg border flex items-center justify-center cursor-pointer text-muted-foreground hover:opacity-80 transition hover:text-primary"
          onClick={onIncrement}
        >
          <Plus className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
