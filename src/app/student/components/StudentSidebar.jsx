import React from "react";
import { ChevronRight } from "lucide-react";
import logo from "../../../../public/images/android-chrome-512x512.png";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

// Updated navigation data
const navItems = [
  {
    title: "Dues",

    url: "/student/view-dues",
  },
  {
    title: "Payments",
    url: "/student/view-payments",
  },
  {
    title: "Profile",
    url: "/student/profile",
  },
];

export function StudentSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex">
          <Image src={logo} alt="image" width={50} height={40} />

          <h1 className="text-2xl font-bold px-4 py-2 text-grad">NDMS</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {navItems.map((item) => (
          <Collapsible
            key={item.title}
            // defaultOpen
            className="group/collapsible px-3 py-2 w-full "
          >
            <Link
              href={item.url}
              className="rounded-xl fit-content p-2 hover:bg-button-grad"
            >
              {item.title}
            </Link>

            {/* <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((subItem) => (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton asChild>
                          <Link href={subItem.url}>{subItem.title}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup> */}
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
