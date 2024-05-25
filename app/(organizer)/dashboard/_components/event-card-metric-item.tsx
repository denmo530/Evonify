import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CardMetricItemProps {
  icon: React.ReactNode;
  value: string;
  description: string;
}
export function CardMetricItem({
  icon,
  value,
  description,
}: CardMetricItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex gap-1">
            {icon}
            <span className="text-xs text-muted-foreground leading-relaxed">
              {value}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
