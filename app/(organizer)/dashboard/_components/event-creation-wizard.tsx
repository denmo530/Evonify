"use client";

import React, { useMemo } from "react";

import { Form, FormMessage } from "@/components/ui/form";

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
import StepsBodyContent from "./steps-body-content";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const DATE_REQUIRED_ERROR = "Date is required.";

export const formSchema = z.object({
  category: z
    .string({
      required_error: "Please select a category",
      invalid_type_error: "Please select a category",
    })
    .min(1),
  location: z.object({
    label: z.string(),
    value: z.string({
      required_error: "Please select a location",
      invalid_type_error: "Please select a location",
    }),
    flag: z.string(),
    region: z.string(),
    latlng: z.array(z.number()),
  }),
  // .transform((val) => {
  //   if (val === null || typeof val !== "object" || Array.isArray(val)) {
  //     return null; // Return null if the value is null, not an object, or an array
  //   }
  //   return val;
  // }),
  name: z.string().min(3).max(50),
  date: z
    .object(
      {
        from: z.date().optional(),
        to: z.date().optional(),
      },
      { required_error: DATE_REQUIRED_ERROR }
    )
    .refine((date) => {
      return !!date.from;
    }, DATE_REQUIRED_ERROR),
  time: z.object({ start: z.string(), end: z.string().optional() }),
  description: z.string().min(10).max(200),
  attendeeCount: z.number().int().optional(),
  tags: z.array(z.object({ label: z.string(), value: z.string() })).nonempty(),
  imgIds: z.array(z.custom<Id<"_storage">>()),
});

export enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  INFO_2 = 3,
  IMAGES = 4,
}

const stepValidationFields: {
  [key in STEPS]: Array<keyof z.infer<typeof formSchema>>;
} = {
  [STEPS.CATEGORY]: ["category"],
  [STEPS.LOCATION]: ["location"],
  [STEPS.INFO]: ["tags", "date", "time", "attendeeCount"],
  [STEPS.INFO_2]: ["description", "name"],
  [STEPS.IMAGES]: ["imgIds"],
};

export function EventWizard({ orgId }: { orgId: string | undefined }) {
  const [step, setStep] = React.useState(STEPS.CATEGORY);

  const createEvent = useMutation(api.events.createEvent);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      location: {
        label: "",
        value: "",
        flag: "",
        region: "",
        latlng: [51, -0.09],
      },
      name: "",
      description: "",
      date: {
        from: undefined,
        to: undefined,
      },
      attendeeCount: undefined,
      tags: [],
      imgIds: [],
      time: { start: "", end: "" },
    },
  });

  const onNext = async () => {
    const fieldsToValidate = stepValidationFields[step];
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) setStep((value) => value + 1);
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!orgId) return;

    const tagValues = values.tags.map((tag) => tag.value);

    if (values.imgIds.length < 1) return;

    await createEvent({
      name: values.name,
      location: values.location && {
        latlng: values.location.latlng,
        region: values.location.region,
      },
      date: {
        from: values.date.from?.toISOString() || "",
        to: values.date.to?.toISOString(),
      },
      description: values.description,
      imgIds: values.imgIds,
      category: values.category,
      tags: tagValues,
      time: values.time,
      attendeeCount: values.attendeeCount,
      orgId: orgId,
    });
  };

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;

    return "Back";
  }, [step]);

  return (
    <EventDialog
      secondaryActionLabel={secondaryActionLabel}
      onNext={onNext}
      onBack={onBack}
      onSubmit={onSubmit}
      form={form}
      step={step}
    />
  );
}

function EventDialog({
  secondaryActionLabel,
  onBack,
  onNext,
  onSubmit,
  form,
  step,
}: {
  secondaryActionLabel: string | undefined;
  onBack: () => void;
  onNext: () => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  form: any;
  step: number;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Event</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <StepsBodyContent form={form} step={step} />
            <DialogFooter>
              <div className="flex gap-4 w-full">
                {secondaryActionLabel && (
                  <Button variant="outline" onClick={onBack} className="w-full">
                    {secondaryActionLabel}
                  </Button>
                )}

                {step === STEPS.IMAGES ? (
                  <Button variant={"default"} type="submit" className="w-full">
                    Create
                  </Button>
                ) : (
                  <Button
                    variant={"default"}
                    onClick={onNext}
                    className="w-full"
                  >
                    Next
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
