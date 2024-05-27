// components/DesignTab.tsx
"use client";

import React, { useState } from "react";
import { EditForm } from "./edit-form";
import EventPreview from "./event-page-preview";
import { IEvent } from "@/app/types";
import { Button } from "@/components/ui/button";
import { MobileIcon } from "@radix-ui/react-icons";
import { Monitor } from "lucide-react";
import { TbDeviceImac } from "react-icons/tb";
import { MdPhoneIphone } from "react-icons/md";

export function DesignTab({ event }: { event: IEvent }) {
  const [previewMode, setPreviewMode] = useState<"web" | "mobile">("web");

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
      <section className="col-span-1">
        <EditForm event={event} />
      </section>

      <section className="w-full flex flex-col gap-4 rounded-lg border-b-0 shadow-none transition-all h-screen rounded-lg-b-none  col-span-2 ">
        <div className="flex flex-col gap-4 w-full justify-between">
          <h3 className="font-semibold tracking-tight text-xl leading-5">
            Preview
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div
              role="group"
              dir="ltr"
              className="flex items-center justify-center gap-1"
            >
              <Button
                variant="ghost"
                className={`${previewMode === "mobile" ? "bg-accent" : "bg-transparent"}`}
                onClick={() => setPreviewMode("mobile")}
              >
                <MdPhoneIphone size={24} />
              </Button>

              <Button
                variant="ghost"
                className={`${previewMode === "web" ? "bg-accent" : "bg-transparent"}`}
                onClick={() => setPreviewMode("web")}
              >
                <TbDeviceImac size={24} />
              </Button>
            </div>
          </div>
        </div>
        <div className=" overflow-scroll ">
          <EventPreview event={event} previewMode={previewMode} />
        </div>
      </section>
    </div>
  );
}
