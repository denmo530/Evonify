"use client";

import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Link from "next/link";
import { SlashIcon } from "lucide-react";
import EmailEditor from "@/app/(organizer)/dashboard/_components/email-editor";

export default function WriteEmailPage({
  params,
}: {
  params: { title: string };
}) {
  const title = params.title.replace(/-/g, " ");

  return (
    <>
      <main className="container mx-auto pt-12">
        <div className="mb-8">
          <BreadCrumb />
        </div>
        <div className="text-xl font-semibold">
          <span className="text-muted-foreground text-sm italic">Draft: </span>
          {title}
        </div>
        <div className="my-5">
          <EmailEditor />
        </div>
      </main>
    </>
  );
}

function BreadCrumb() {
  return (
    <Breadcrumb className="">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard/write">Drafts</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>New Email</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
