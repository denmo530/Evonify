"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import React from "react";
import OverviewCards from "./_components/overview-cards";
import { Button } from "@/components/ui/button";
import { BadgeHelp, Copy, HeartHandshake, PenBox } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SubscribersChart } from "./_components/subscribers-chart";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function DashboardPage() {
  const [copied, setCopied] = React.useState(false);

  const user = useUser();
  const organization = useOrganization();

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded)
    orgId = organization.organization?.id ?? user.user?.id;

  const orgName =
    organization.organization?.name ??
    user.user?.username ??
    user.user?.primaryEmailAddress?.emailAddress;

  const displayName = user.user?.fullName ?? user.user?.username;

  const subscribers = useQuery(
    api.subscribers.getSubscribers,
    orgId ? { orgId } : "skip"
  );

  const { toast } = useToast();

  function handleCopyLink() {
    const smallText = document.querySelector(".copy-text") as HTMLElement;
    if (smallText) {
      const textToCopy = smallText.innerHTML;
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        toast({
          variant: "default",
          title: "Copied ✌️",
        });
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      });
    }
  }

  return (
    <main className="container mx-auto pt-12">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold">
            Hello{" "}
            <span className="bg-gradient-to-r from-[#D4145A] via-[#FF5F6D] to-[#FBB03B] inline-block text-transparent bg-clip-text">
              {displayName} 👋
            </span>
          </h1>
          <div className="text-muted-foreground text-sm">
            Organization{" "}
            <span className="text-special">{orgName?.toLocaleUpperCase()}</span>
          </div>
        </div>
      </div>
      <section>
        <p className="text-sm text-muted-foreground mb-2">
          Here&apos;s how your events are doing.
        </p>
        <div className="w-full flex flex-col sm:flex-row">
          <div className="w-full md:w-[65%] min-h-88vh space-y-8">
            {orgId && subscribers && (
              <>
                <OverviewCards orgId={orgId ?? ""} />
                <SubscribersChart subscribers={subscribers} />
              </>
            )}
          </div>
          <div className="w-full sm:w-[35%] p-5">
            <div className="w-full flex justify-end gap-2">
              <Link href={"/dashboard/drafts"}>
                <Button variant={"secondary"}>
                  <PenBox className="w-4 h-4 mr-1" />
                  Start Writing
                </Button>
              </Link>
            </div>
            <div>
              <h5 className="text-xl font-medium">Resources</h5>
              <div className="w-full border rounded p-5 my-3 space-y-8">
                <div>
                  <h4 className="font-medium">Subscribe Page</h4>
                  <div
                    className={cn(
                      "w-full px-2 my-1 h-[38px] bg-transparent border rounded-lg relative flex items-center cursor-pointer  hover:underline",
                      copied ? "bg-special bg-opacity-70" : "bg-transparent"
                    )}
                    onClick={handleCopyLink}
                  >
                    <span
                      className={
                        "w-[70%] text-xs overflow-hidden overflow-ellipsis whitespace-nowrap copy-text "
                      }
                    >
                      {
                        // TODO: Switch url to real: https://evonify/subscribe/{orgId}
                      }
                      http://localhost:3000/subscribe/{orgId}
                    </span>
                    <div className="absolute rounded-r-lg right-0 flex items-center justify-center gap-2">
                      <Button variant={"secondary"} className="flex gap-2">
                        <Copy className="w-4 h-4" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Events Page</h4>
                  <Link
                    href={"dashboard/events"}
                    className={
                      "w-[70%] text-xs overflow-hidden overflow-ellipsis hover:drop-shadow-glow hover:underline"
                    }
                  >
                    <div className="w-full px-2 h-[38px] my-1 bg-transparent border rounded-lg relative flex items-center cursor-pointer">
                      Events
                    </div>
                  </Link>
                </div>
              </div>
              <div className="w-full border rounded p-5 my-3">
                <h5 className="font-medium">Tutorials</h5>
                <p className="text-sm opacity-[.7]">
                  Learn how to get started on our{" "}
                  <Link href={"/help"}>
                    <span className="font-medium cursor-pointer text-special hover:underline">
                      help
                    </span>{" "}
                  </Link>
                  page and utilize all our features, directly from the Evonify
                  team
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
