"use client";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdDesignServices, MdInsights } from "react-icons/md";
import { DesignTab } from "./_components/design-tab";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { IEvent } from "@/app/types";

export default function EditPage({ params }: { params: { eventId: string } }) {
  const eventId = params.eventId as Id<"events">;
  console.log(eventId);
  const event = useQuery(api.events.getEventById, { eventId });
  return (
    <main className="container mx-auto pt-12 min-h-screen h-screen overflow-hidden">
      <Tabs defaultValue="design">
        <TabsList className="gap-2">
          <TabsTrigger value="design">
            <div className="flex gap-2 items-center">
              <MdDesignServices className="w-4 h-4" />
              <span>Design</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="insights">
            <div className="flex gap-2 items-center">
              <MdInsights className="w-4 h-4" />
              <span>Insights</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <div className="flex gap-2 items-center">
              <MdDesignServices className="w-4 h-4" />
              <span>Settings</span>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="design" className="pt-8">
          {event && <DesignTab event={event as IEvent} />}
        </TabsContent>
      </Tabs>
    </main>
  );
}
