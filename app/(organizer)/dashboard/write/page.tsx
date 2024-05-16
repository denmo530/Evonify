"use client";

import React from "react";
import { CreateDraftButton, DraftCard } from "../_components/draft-card";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WritePage() {
  const user = useUser();
  const organization = useOrganization();

  let authorId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded)
    authorId = organization.organization?.id ?? user.user?.id;

  const drafts = useQuery(
    api.notifications.getNotificationsByAuthorId,
    authorId ? { authorId } : "skip"
  );

  const draftsWithUrl =
    drafts &&
    drafts?.map((draft) => {
      const formattedTitle = draft.title
        .replace(/\s+/g, "-")
        .replace(/&/g, "-");
      return {
        ...draft,
        url: `/dashboard/write/new-notification/email/${formattedTitle}`,
      };
    });

  const isLoading = drafts === undefined;

  return (
    <main className="container mx-auto pt-12">
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24 text-gray-600">
          <Loader2 className="h-32 w-32 animate-spin" />
          <div className="text-xl">Loading your data...</div>
        </div>
      )}

      {!isLoading && drafts?.length > 0 && (
        <div className="flex flex-col w-full sm:flex-row  items-center flex-wrap gap-4 sm:w-2/3">
          <CreateDraftButton />
          {draftsWithUrl?.map((draft) => (
            <DraftCard key={draft._id} draft={draft} />
          ))}
        </div>
      )}

      {!isLoading && drafts?.length === 0 && (
        <div>
          <CreateDraftButton />
          <div className="flex flex-col gap-8 w-full items-center">
            <Image
              alt="Image of messages."
              width={300}
              height={300}
              src="/empty.svg"
            />
            <div className="text-lg">
              No drafts found, go ahead and create a new draft!
            </div>{" "}
          </div>
        </div>
      )}
    </main>
  );
}
