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

import { SlashIcon } from "lucide-react";
import EmailEditor from "../../../../_components/email-editor";
import { useOrganization, useUser } from "@clerk/nextjs";

export default function WriteEmailPage({
  params,
}: {
  params: { title: string };
}) {
  const user = useUser();
  const organization = useOrganization();

  const title = params.title.replace(/-/g, " ");

  let orgId: string | undefined = undefined;
  let userId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    userId = user.user?.id;
    orgId = organization.organization?.id;
  }

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
          <EmailEditor title={title} />
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
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
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
