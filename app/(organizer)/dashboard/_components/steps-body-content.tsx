import { categories } from "@/app/(attendee)/_components/categories";
import { CategoryInput } from "./category-input";

import { z } from "zod";
import { formSchema } from "./event-creation-wizard";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CountrySelect, CountrySelectValue } from "./country-select";
import dynamic from "next/dynamic";
import React from "react";
import { Counter } from "./counter";
import { TagsInput } from "./tags-input";

function Header({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
  );
}

export function CategoryBody({
  setCustomValue,
  category,
}: {
  setCustomValue: (id: keyof z.infer<typeof formSchema>, value: any) => void;
  category: string;
}) {
  return (
    <div className="flex flex-col gap-8">
      <Header
        title="Select a category"
        description="Choose a category that best fits your event."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LocationBody({
  setCustomValue,
  location,
}: {
  setCustomValue: (id: keyof z.infer<typeof formSchema>, value: any) => void;
  location: CountrySelectValue;
}) {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("./Map"), {
        ssr: false,
      }),
    [location]
  );

  return (
    <div className="flex flex-col gap-8">
      <Header
        title="Add a location"
        description="Add a location for your event."
      />
      <CountrySelect
        value={location}
        onChange={(value) => {
          setCustomValue("location", value);
        }}
      />
      <Map center={location?.latlng} />
    </div>
  );
}

export function InfoBody({
  setCustomValue,
  attendeeCount,
  tags,
}: {
  setCustomValue: (id: keyof z.infer<typeof formSchema>, value: any) => void;
  attendeeCount: number;
  tags: string[];
}) {
  return (
    <div className="flex flex-col gap-8 mb-8">
      <Header
        title="Add event information"
        description="Add information about your event."
      />
      <Counter
        title={"Attendees"}
        subtitle="Does your event have a guest limit."
        value={attendeeCount}
        onChange={(value) => setCustomValue("attendeeCount", value)}
      />
      <hr />
      <TagsInput
        value={tags}
        onChange={(value) => setCustomValue("tags", value)}
      />
    </div>
  );
}
