"use client";

import { Button } from "@/components/ui/button";
import { Save, Send } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";

export default function Editor({ title }: { title: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  const { theme } = useTheme();
  const editorTheme = theme === "light" ? "modern_light" : "modern_dark";

  const emailEditorRef = React.useRef<EditorRef>(null);

  emailEditorRef.current?.editor?.setAppearance({
    theme: editorTheme,
  });

  const createNotification = useMutation(api.notifications.createNotification);

  const user = useUser();
  const organization = useOrganization();

  let authorId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded)
    authorId = organization.organization?.id ?? user.user?.id;

  const { toast } = useToast();

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    // TODO: Send email using amazon SES
  };

  const saveDraft = async () => {
    if (!authorId) return;

    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml(async (data) => {
      const { design } = data;

      console.log(design);

      try {
        await createNotification({
          title: title,
          content: JSON.stringify(design),
          authorId: authorId,
        });

        toast({
          title: "Draft saved",
          description: "Your draft has been saved successfully",
          variant: "default",
        });

        setTimeout(() => {
          router.push("/dashboard/write");
        }, 1000);
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: "There was an error saving your draft",
          variant: "destructive",
        });
      }
    });
  };

  const notification = useQuery(
    api.notifications.getNotificationsByAuthorIdAndTitle,
    authorId ? { authorId: authorId, title: title } : "skip"
  );

  React.useEffect(() => {
    if (notification || notification === null) {
      setIsLoading(false);
    }
  }, [notification]);

  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    unlayer.setAppearance({
      theme: editorTheme,
    });

    if (notification) unlayer.loadDesign(JSON.parse(notification?.content));
  };

  return (
    <div className="flex flex-col w-full justify-between gap-3 relative ">
      <div className=" flex justify-end gap-2 items-center ">
        <Button
          className="flex gap-1"
          size={"sm"}
          onClick={saveDraft}
          disabled={isLoading}
        >
          <Save className="w-4 h-4 mr-1" /> Save Draft
        </Button>
        <Button
          className="flex gap-1"
          size={"sm"}
          onClick={exportHtml}
          disabled={isLoading}
        >
          <Send className="w-4 h-4 mr-1" />
          Send
        </Button>
      </div>
      {!isLoading && (
        <EmailEditor
          minHeight={"80vh"}
          ref={emailEditorRef}
          onReady={onReady}
        />
      )}
    </div>
  );
}
