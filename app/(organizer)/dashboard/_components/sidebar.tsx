"use client";
import { Building, LayoutDashboard, Mail, Ticket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useOrganization } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { FaMoneyBill } from "react-icons/fa";
import { MdIntegrationInstructions, MdPhoneIphone } from "react-icons/md";
import { SidebarLink } from "./sidebar-link";

export function Sidebar() {
  const organization = useOrganization();
  const pathname = usePathname();

  const overviewLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    { href: "/dashboard/events", label: "Events", icon: <Ticket size={16} /> },
    { href: "/dashboard/drafts", label: "Drafts", icon: <Mail size={16} /> },
  ];

  const manageLinks = [
    {
      href: "#",
      label: "Integrations ",
      icon: <MdIntegrationInstructions size={16} />,
      disabled: true,
    },
    {
      href: "#",
      label: "Finances",
      icon: <FaMoneyBill size={16} />,
      disabled: true,
    },
    {
      href: "#",
      label: "Marketing",
      icon: <MdPhoneIphone size={16} />,
      disabled: true,
    },
  ];

  const resourcesLinks = [
    {
      href: `/organizations/${organization.organization?.name}`,
      label: "Organization Page",
      icon: <Building size={16} />,
    },
  ];

  return (
    <div className="pr-4">
      <div className="w-[200px] hidden h-full min-h-screen flex-col md:border-r md:flex relative transition-all">
        <div className="sticky top-0 bottom-0  md:h-[calc(100vh - 57px)] md:overflow-y-auto">
          <aside className="flex h-full flex-col w-full break-words px-4   overflow-x-hidden columns-1 ">
            <nav className="mt-4 relative pb-2 ">
              <ul className="flex flex-col space-y-4">
                <div className="space-y-1">
                  <li className="px-2 py-1 text-xs font-bold text-muted-foreground uppercase overflow-hidden transition duration-75 max-h-[20px]">
                    Overview
                  </li>

                  {overviewLinks.map((link) => (
                    <SidebarLink key={link.label} {...link} />
                  ))}
                </div>
                <div className="space-y-1">
                  <li className="px-2 py-1 text-xs font-bold text-muted-foreground uppercase overflow-hidden transition duration-75 max-h-[20px]">
                    Manage
                  </li>
                  {manageLinks.map((link) => (
                    <SidebarLink key={link.label} {...link} />
                  ))}
                </div>
                <div className="space-y-1">
                  <li className="px-2 py-1 text-xs font-bold text-muted-foreground uppercase overflow-hidden transition duration-75 max-h-[20px]">
                    Resources
                  </li>
                  {resourcesLinks.map((link) => (
                    <SidebarLink key={link.label} {...link} />
                  ))}
                </div>
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}
