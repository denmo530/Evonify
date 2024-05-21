import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Doc } from "@/convex/_generated/dataModel";

import { Facebook, Instagram, Link, Share2 } from "lucide-react";

export function ShareButton({
  event,
}: {
  event: Doc<"events"> & { url: string | null };
}) {
  const isDisabled = new Date(event.date) < new Date();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Share2 className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            disabled={isDisabled}
            className="flex gap-2  items-center cursor-pointer"
          >
            <Link className="h-4 w-4" />
            Copy Link
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isDisabled}
            className="flex gap-2  items-center cursor-pointer"
          >
            <Facebook className="h-4 w-4" />
            Facebook
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isDisabled}
            className="flex gap-2  items-center cursor-pointer"
          >
            <Instagram className="h-4 w-4" />
            Instagram
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
