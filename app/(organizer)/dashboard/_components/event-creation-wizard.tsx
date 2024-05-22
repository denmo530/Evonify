"use client";

import React, { useMemo } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryBody, InfoBody, LocationBody } from "./steps-body-content";

export const formSchema = z.object({
  category: z.string().min(1),
  location: z.any().nullable(),
  name: z.string().min(3).max(50),
  date: z.date(),
  description: z.string().min(10).max(200),
  attendeeCount: z.number().int(),
  tags: z.array(z.string()),
  img: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, "Required"),
});

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
}

export function EventWizard() {
  const [step, setStep] = React.useState(STEPS.CATEGORY);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      location: null,
      name: "",
      description: "",
      date: undefined,
      attendeeCount: 0,
      tags: [],
      img: undefined,
    },
  });

  const category = form.watch("category");
  const location = form.watch("location");
  const attendeeCount = form.watch("attendeeCount");
  const tags = form.watch("tags");

  const setCustomValue = (id: keyof z.infer<typeof formSchema>, value: any) => {
    form.setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onNext = () => {
    console.log("next");
    setStep((value) => value + 1);

    console.log(category);
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.IMAGES) return "Create";

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;

    return "Back";
  }, [step]);

  let name = "category";

  const bodyContent = () => {
    switch (step) {
      case STEPS.CATEGORY:
        return (
          <CategoryBody setCustomValue={setCustomValue} category={category} />
        );
      case STEPS.LOCATION:
        return (
          <LocationBody setCustomValue={setCustomValue} location={location} />
        );
      case STEPS.INFO:
        return (
          <InfoBody
            setCustomValue={setCustomValue}
            attendeeCount={attendeeCount}
            tags={tags}
          />
        );
    }
  };

  return (
    <EventDialog
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      onNext={onNext}
      onBack={onBack}
      bodyContent={bodyContent()}
    />
  );
}

function EventDialog({
  actionLabel,
  secondaryActionLabel,
  bodyContent,
  onBack,
  onNext,
}: {
  actionLabel: string;
  secondaryActionLabel: string | undefined;
  bodyContent: React.ReactNode;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Event</Button>
      </DialogTrigger>
      <DialogContent>
        {bodyContent}
        <DialogFooter>
          <div className="flex gap-4 w-full">
            {secondaryActionLabel && (
              <Button variant="outline" onClick={onBack} className="w-full">
                {secondaryActionLabel}
              </Button>
            )}
            <Button variant={"default"} onClick={onNext} className="w-full">
              {actionLabel}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
