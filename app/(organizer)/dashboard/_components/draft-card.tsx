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

import { Loader2, MoreVertical, Plus, TrashIcon } from "lucide-react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";

export function DraftCard({
  draft,
}: {
  draft: Doc<"notifications"> & { url: string };
}) {
  const date = new Date(draft._creationTime).toLocaleDateString();
  return (
    <Card className="w-[200px] relative h-[200px] flex flex-col items-center justify-center cursor-pointer">
      <div className="absolute top-4 right-2 z-50">
        <CardActions notification={draft} />
      </div>
      <Link href={draft.url}>
        <div>
          <CardHeader></CardHeader>
          <CardContent>
            <CardTitle>{draft.title}</CardTitle>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            {date}
          </CardFooter>
        </div>
      </Link>
    </Card>
  );
}

function CardActions({ notification }: { notification: Doc<"notifications"> }) {
  const deleteNotification = useMutation(api.notifications.deleteNotification);

  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

  const { toast } = useToast();

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              event and send a notification to guests informing them of the
              event&apos;s cancellation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                await deleteNotification({ notificationId: notification._id });

                toast({
                  variant: "default",
                  title: "Draft deleted",
                  description: "Your draft has been successfully deleted.",
                });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex gap-2 text-red-600 items-center cursor-pointer z-50"
            onClick={() => setIsConfirmOpen(true)}
          >
            <TrashIcon className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
