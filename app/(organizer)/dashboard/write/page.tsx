"use client";

import React from "react";
import { CreateDraftButton } from "../_components/draft-card";

export default function WritePage() {
  const [open, setOpen] = React.useState(false);
  const [emailTitle, setEmailTitle] = React.useState(false);

  return (
    <main className="container mx-auto pt-12">
      <div className="grid grid-cols-1 sm:grid-cols-4 w-[70%]">
        <CreateDraftButton />
      </div>
    </main>
  );
}
