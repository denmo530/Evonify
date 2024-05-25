"use client";
import React from "react";

import { UploadDropzone, UploadFileResponse } from "@xixixao/uploadstuff/react";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useToast } from "@/components/ui/use-toast";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export function ImageUpload({ form }: { form: any }) {
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.events.generateUploadUrl);

  const handleUploadComplete = React.useCallback(
    async (upload: UploadFileResponse[]) => {
      const uploadIds = upload.map(
        ({ response }) => (response as any).storageId
      );

      form.setValue("imgIds", uploadIds);
    },
    [form]
  );

  const handleUploadError = (error: unknown) => {
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "An error occurred",
      variant: "destructive",
    });
  };

  return (
    <FormField
      control={form.control}
      name="time.start"
      render={({ field }) => (
        <>
          <FormItem>
            <FormControl>
              <UploadDropzone
                uploadUrl={generateUploadUrl}
                fileTypes={{
                  "image/*": [".jpg", ".jpeg", ".png", ".gif"],
                }}
                multiple
                uploadImmediately
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                subtitle="Drag and drop your image here or click to browse."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  );
}
