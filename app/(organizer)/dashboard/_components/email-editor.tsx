"use client";

import { Button } from "@/components/ui/button";
import { Save, Send } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";

export default function Editor() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { theme } = useTheme();
  const editorTheme = theme === "light" ? "modern_light" : "modern_dark";

  const emailEditorRef = React.useRef<EditorRef>(null);

  emailEditorRef.current?.editor?.setAppearance({
    theme: editorTheme,
  });

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
    });

    // TODO: Send email using amazon SES
  };

  const saveDraft = () => {
    // TODO: Save draft in db
  };

  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    unlayer.setAppearance({
      theme: editorTheme,
    });

    setIsLoading(false);
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
      <EmailEditor minHeight={"80vh"} ref={emailEditorRef} onReady={onReady} />
    </div>
  );
}
