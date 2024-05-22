"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import qs from "query-string";

interface CategoryItemProps {
  label: string;
  icon: React.ReactNode;
  selected?: boolean;
}

export function CategoryItem({ label, selected, icon }: CategoryItemProps) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = React.useCallback(() => {
    let currentQuery = {};

    if (params) currentQuery = qs.parse(params.toString());

    const updatedQuery: Record<string, string> = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) delete updatedQuery.category;

    const url = qs.stringifyUrl(
      {
        url: "/explore/events",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [params, label, router]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-2 border-b-2 hover:text-primary text-muted-foreground transition cursor-pointer my-1",
        selected ? "border-b text-primary" : "border-transparent"
      )}
      onClick={handleClick}
    >
      {icon}
      <div className="font-medium text-sm truncate">{label}</div>
    </div>
  );
}
