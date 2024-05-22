"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface CategoryInputProps {
  onClick: (value: string) => void;
  label: string;
  icon: React.ReactNode;
  selected?: boolean;
}

export function CategoryInput({
  onClick,
  label,
  icon,
  selected,
}: CategoryInputProps) {
  return (
    <div
      onClick={() => onClick(label)}
      className={cn(
        "rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-primary cursor-pointer",
        selected && "border-primary"
      )}
    >
      {icon}
      <div className="font-semibold text-sm">{label}</div>
    </div>
  );
}
