import { categories } from "@/app/(attendee)/_components/categories";
import { CategoryInput } from "./category-input";

import { z } from "zod";
import { formSchema, STEPS } from "./event-creation-wizard";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CountrySelect, CountrySelectValue } from "./country-select";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import { Counter } from "./counter";
import { TagSelectValue, TagsInput } from "./tags-input";
import { ImageUpload } from "./image-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateInput } from "./date-input";
import { TimeRangeInput } from "./time-range";
import { FormMessage } from "@/components/ui/form";
import { TextInfo } from "./text-info";

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

export function CategoryBody({ form }: { form: any }) {
  return (
    <div className="flex flex-col gap-8">
      <Header
        title="Select a category"
        description="Choose a category that best fits your event."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput form={form} label={item.label} icon={item.icon} />
          </div>
        ))}
      </div>
      <FormMessage>
        {form.formState.errors.category &&
          form.formState.errors.category.message}
      </FormMessage>
    </div>
  );
}

export function LocationBody({ form }: { form: any }) {
  const location = form.getValues().location as CountrySelectValue;
  const [locationValue, setLocationValue] = useState<
    CountrySelectValue | undefined
  >(undefined);

  const Map = React.useMemo(
    () =>
      dynamic(() => import("./Map"), {
        ssr: false,
        loading: () => <div>Loading...</div>,
      }),
    [locationValue]
  );

  return (
    <div className="flex flex-col gap-8">
      <Header
        title="Add a location"
        description="Add a location for your event."
      />
      <CountrySelect form={form} setLocationValue={setLocationValue} />
      <Map center={location?.latlng ?? undefined} />
      <FormMessage>
        {form.formState.errors.location &&
          form.formState.errors.location.message}
      </FormMessage>
    </div>
  );
}

export function InfoBody({ form }: { form: any }) {
  return (
    <div className="flex flex-col gap-8 mb-8">
      <Header
        title="Add event information"
        description="Add information about your event."
      />
      <DateInput form={form} />
      <FormMessage>
        {form.formState.errors.date && form.formState.errors.date.message}
      </FormMessage>
      <TimeRangeInput form={form} />
      <FormMessage>
        {form.formState.errors.time && form.formState.errors.time.message}
      </FormMessage>

      <hr />
      <Counter
        title={"Attendees"}
        subtitle="Does your event have a guest limit."
        form={form}
      />
      <FormMessage>
        {form.formState.errors.attendeeCount &&
          form.formState.errors.attendeeCount.message}
      </FormMessage>
      <hr />
      <TagsInput form={form} />
      <FormMessage>
        {form.formState.errors.tags && form.formState.errors.tags.message}
      </FormMessage>
    </div>
  );
}

export function TextInfoBody({ form }: { form: any }) {
  return (
    <div className="flex flex-col gap-8 mb-8">
      <Header
        title="Add event name and description"
        description="Add a descriptive name and description for your event."
      />
      <TextInfo form={form} />
    </div>
  );
}

export function ImagesBody({ form }: { form: any }) {
  return (
    <div className="flex flex-col gap-8 mb-8">
      <Header
        title="Add event images"
        description="Add images for your event."
      />
      <ImageUpload form={form} />
    </div>
  );
}

export default function StepsBodyContent({
  step,
  form,
}: {
  step: number;
  form: any;
}) {
  const Body = useMemo(() => {
    switch (step) {
      case STEPS.CATEGORY:
        return <CategoryBody form={form} />;
      case STEPS.LOCATION:
        return <LocationBody form={form} />;
      case STEPS.INFO:
        return <InfoBody form={form} />;
      case STEPS.INFO_2:
        return <TextInfoBody form={form} />;
      case STEPS.IMAGES:
        return <ImagesBody form={form} />;
      default:
        return null;
    }
  }, [step, form]);
  return Body;
}
